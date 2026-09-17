import { executeQuery } from '../db/connection.js';
import { BaseController } from './baseController.js';

export class AdminController extends BaseController {
  async getDashboardStats(req, res) {
    try {
      const usersCount = (await executeQuery('SELECT COUNT(*) as count FROM users')).rows[0].count;
      const productsCount = (await executeQuery('SELECT COUNT(*) as count FROM products')).rows[0].count;
      const ordersCount = (await executeQuery('SELECT COUNT(*) as count FROM orders')).rows[0].count;
      const revenue = (await executeQuery('SELECT SUM(total_amount) as total FROM orders')).rows[0].total || 0;
      const profilesCount = (await executeQuery('SELECT COUNT(*) as count FROM profiles')).rows[0].count;
      const leadsCount = (await executeQuery('SELECT COUNT(*) as count FROM leads')).rows[0].count;

      const recentOrders = (await executeQuery('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5')).rows;
      const recentUsers = (await executeQuery('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5')).rows;

      return this.handleSuccess(res, {
        stats: {
          totalUsers: usersCount,
          totalProducts: productsCount,
          totalOrders: ordersCount,
          totalRevenue: Math.round(revenue),
          totalProfiles: profilesCount,
          totalLeads: leadsCount,
        },
        recentOrders,
        recentUsers,
      }, 'Admin dashboard metrics');
    } catch (error) {
      return this.handleError(res, error, 'AdminDashboardStats');
    }
  }

  async createProduct(req, res) {
    try {
      const {
        name,
        description,
        short_description,
        price,
        original_price,
        material,
        category_id,
        sku,
        stock,
        is_featured,
        image_url,
        rating,
        nfc_enabled,
        qr_enabled
      } = req.body;

      if (!name || !price || !material) {
        return res.status(400).json({ success: false, message: 'Name, Price, and Material are required' });
      }

      const id = 'prod-' + Date.now();
      const cleanSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000);
      const pPrice = Number(price);
      const pOrigPrice = original_price ? Number(original_price) : pPrice;
      const calcDiscount = pOrigPrice > pPrice ? Math.round(((pOrigPrice - pPrice) / pOrigPrice) * 100) : 0;
      const pRating = rating ? Number(rating) : 5.0;
      const pStock = stock !== undefined ? Number(stock) : 100;
      const imgUrl = image_url || '/assets/products/metal_black.svg';
      const imagesJson = JSON.stringify([imgUrl]);

      await executeQuery(
        `INSERT INTO products (
          id, name, slug, description, short_description, price, original_price, discount, rating, material, nfc_enabled, qr_enabled, category_id, sku, stock, is_featured, image_url, images_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          name,
          cleanSlug,
          description || `${name} - Premium NFC Smart Card crafted from ${material}.`,
          short_description || description || `Premium ${material} NFC card.`,
          pPrice,
          pOrigPrice,
          calcDiscount,
          pRating,
          material,
          nfc_enabled !== undefined ? (nfc_enabled ? 1 : 0) : 1,
          qr_enabled !== undefined ? (qr_enabled ? 1 : 0) : 1,
          category_id || 'cat-metal',
          sku || 'AIK-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
          pStock,
          is_featured ? 1 : 0,
          imgUrl,
          imagesJson
        ]
      );

      return this.handleSuccess(res, { id, name, slug: cleanSlug }, 'Product created successfully', 201);
    } catch (error) {
      return this.handleError(res, error, 'AdminCreateProduct');
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        price,
        original_price,
        description,
        short_description,
        material,
        stock,
        is_featured,
        image_url,
        category_id,
        rating,
        nfc_enabled,
        qr_enabled
      } = req.body;

      let calcDiscount = undefined;
      if (price !== undefined || original_price !== undefined) {
        const currentProdRes = await executeQuery('SELECT price, original_price FROM products WHERE id = ?', [id]);
        if (currentProdRes.rows.length > 0) {
          const cur = currentProdRes.rows[0];
          const newP = price !== undefined ? Number(price) : cur.price;
          const newOrig = original_price !== undefined ? Number(original_price) : cur.original_price;
          calcDiscount = newOrig > newP ? Math.round(((newOrig - newP) / newOrig) * 100) : 0;
        }
      }

      await executeQuery(
        `UPDATE products SET
          name = COALESCE(?, name),
          price = COALESCE(?, price),
          original_price = COALESCE(?, original_price),
          discount = COALESCE(?, discount),
          description = COALESCE(?, description),
          short_description = COALESCE(?, short_description),
          material = COALESCE(?, material),
          stock = COALESCE(?, stock),
          is_featured = COALESCE(?, is_featured),
          image_url = COALESCE(?, image_url),
          category_id = COALESCE(?, category_id),
          rating = COALESCE(?, rating),
          nfc_enabled = COALESCE(?, nfc_enabled),
          qr_enabled = COALESCE(?, qr_enabled)
        WHERE id = ?`,
        [
          name !== undefined ? name : null,
          price !== undefined ? Number(price) : null,
          original_price !== undefined ? Number(original_price) : null,
          calcDiscount !== undefined ? calcDiscount : null,
          description !== undefined ? description : null,
          short_description !== undefined ? short_description : null,
          material !== undefined ? material : null,
          stock !== undefined ? Number(stock) : null,
          is_featured !== undefined ? (is_featured ? 1 : 0) : null,
          image_url !== undefined ? image_url : null,
          category_id !== undefined ? category_id : null,
          rating !== undefined ? Number(rating) : null,
          nfc_enabled !== undefined ? (nfc_enabled ? 1 : 0) : null,
          qr_enabled !== undefined ? (qr_enabled ? 1 : 0) : null,
          id
        ]
      );

      return this.handleSuccess(res, { id }, 'Product updated successfully');
    } catch (error) {
      return this.handleError(res, error, 'AdminUpdateProduct');
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await executeQuery('DELETE FROM products WHERE id = ?', [id]);
      return this.handleSuccess(res, { id }, 'Product deleted successfully');
    } catch (error) {
      return this.handleError(res, error, 'AdminDeleteProduct');
    }
  }

  async getHomepageContent(req, res) {
    try {
      const result = await executeQuery('SELECT * FROM homepage_content');
      const contentMap = {};
      for (const row of result.rows) {
        contentMap[row.key] = JSON.parse(row.value_json);
      }
      return this.handleSuccess(res, contentMap, 'Homepage editable content');
    } catch (error) {
      return this.handleError(res, error, 'AdminGetHomepageContent');
    }
  }

  async updateHomepageContent(req, res) {
    try {
      const { key, value } = req.body;
      if (!key || !value) {
        return res.status(400).json({ success: false, message: 'Key and Value required' });
      }

      await executeQuery(
        'INSERT OR REPLACE INTO homepage_content (key, value_json, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
        [key, JSON.stringify(value)]
      );

      return this.handleSuccess(res, { key, value }, 'Homepage content updated successfully');
    } catch (error) {
      return this.handleError(res, error, 'AdminUpdateHomepageContent');
    }
  }
}
