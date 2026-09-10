import { executeQuery } from '../db/connection.js';
import { BaseController } from './baseController.js';

export class ProductController extends BaseController {
  async getProducts(req, res) {
    try {
      const { category, material, search, featured, sort } = req.query;
      let sql = 'SELECT * FROM products WHERE 1=1';
      const args = [];

      if (category) {
        sql += ' AND category_id = (SELECT id FROM categories WHERE slug = ? OR id = ?)';
        args.push(category, category);
      }

      if (material) {
        sql += ' AND material LIKE ?';
        args.push(`%${material}%`);
      }

      if (featured === 'true') {
        sql += ' AND is_featured = 1';
      }

      if (search) {
        sql += ' AND (name LIKE ? OR description LIKE ? OR material LIKE ? OR sku LIKE ?)';
        const term = `%${search}%`;
        args.push(term, term, term, term);
      }

      if (sort === 'price_asc') {
        sql += ' ORDER BY price ASC';
      } else if (sort === 'price_desc') {
        sql += ' ORDER BY price DESC';
      } else if (sort === 'rating') {
        sql += ' ORDER BY rating DESC';
      } else {
        sql += ' ORDER BY created_at DESC';
      }

      const result = await executeQuery(sql, args);
      const products = result.rows.map(row => ({
        ...row,
        nfc_enabled: Boolean(row.nfc_enabled),
        qr_enabled: Boolean(row.qr_enabled),
        is_featured: Boolean(row.is_featured),
        images: row.images_json ? JSON.parse(row.images_json) : [row.image_url],
      }));

      return this.handleSuccess(res, products, 'Products retrieved successfully');
    } catch (error) {
      return this.handleError(res, error, 'GetProducts');
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const result = await executeQuery('SELECT * FROM products WHERE id = ? OR slug = ?', [id, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      const product = result.rows[0];
      product.nfc_enabled = Boolean(product.nfc_enabled);
      product.qr_enabled = Boolean(product.qr_enabled);
      product.is_featured = Boolean(product.is_featured);
      product.images = product.images_json ? JSON.parse(product.images_json) : [product.image_url];

      // Fetch product reviews
      const reviewsRes = await executeQuery('SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC', [product.id]);
      product.reviews = reviewsRes.rows;

      return this.handleSuccess(res, product, 'Product details');
    } catch (error) {
      return this.handleError(res, error, 'GetProductById');
    }
  }

  async getCategories(req, res) {
    try {
      const result = await executeQuery('SELECT * FROM categories ORDER BY name ASC');
      return this.handleSuccess(res, result.rows, 'Categories list');
    } catch (error) {
      return this.handleError(res, error, 'GetCategories');
    }
  }

  async saveCustomDesign(req, res) {
    try {
      const { card_name, material, color, text_line1, text_line2, logo_url, qr_position, social_icons } = req.body;
      const id = 'cust-' + Date.now();
      const userId = req.user ? req.user.id : null;

      await executeQuery(
        `INSERT INTO custom_card_designs (id, user_id, card_name, material, color, text_line1, text_line2, logo_url, qr_position, social_icons_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          userId,
          card_name || 'Custom AIKULB Card',
          material || 'Matte Black Stainless Steel',
          color || '#111827',
          text_line1 || 'John Doe',
          text_line2 || 'Founder & CEO',
          logo_url || '',
          qr_position || 'back-bottom',
          JSON.stringify(social_icons || []),
        ]
      );

      return this.handleSuccess(res, { id, card_name, material, text_line1 }, 'Custom card design saved successfully', 201);
    } catch (error) {
      return this.handleError(res, error, 'SaveCustomDesign');
    }
  }
}
