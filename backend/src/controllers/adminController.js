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
      const { name, description, short_description, price, original_price, material, category_id, sku, is_featured, image_url } = req.body;
      if (!name || !price || !material) {
        return res.status(400).json({ success: false, message: 'Name, Price, and Material are required' });
      }

      const id = 'prod-' + Date.now();
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      await executeQuery(
        `INSERT INTO products (id, name, slug, description, short_description, price, original_price, material, category_id, sku, is_featured, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, slug, description || '', short_description || '', price, original_price || price, material, category_id || 'cat-metal', sku || 'SKU-' + Date.now(), is_featured ? 1 : 0, image_url || '/assets/products/metal_black.svg']
      );

      return this.handleSuccess(res, { id, name, slug }, 'Product created successfully', 201);
    } catch (error) {
      return this.handleError(res, error, 'AdminCreateProduct');
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, price, original_price, description, material, stock, is_featured } = req.body;

      await executeQuery(
        `UPDATE products SET
          name = COALESCE(?, name),
          price = COALESCE(?, price),
          original_price = COALESCE(?, original_price),
          description = COALESCE(?, description),
          material = COALESCE(?, material),
          stock = COALESCE(?, stock),
          is_featured = COALESCE(?, is_featured)
        WHERE id = ?`,
        [name, price, original_price, description, material, stock, is_featured, id]
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
