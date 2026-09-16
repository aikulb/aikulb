import { executeQuery } from '../db/connection.js';
import { BaseController } from './baseController.js';

export class CartController extends BaseController {
  async getCart(req, res) {
    try {
      if (!req.user) {
        return this.handleSuccess(res, [], 'Guest cart');
      }

      const result = await executeQuery(
        'SELECT items_json FROM user_carts WHERE user_id = ?',
        [req.user.id]
      );

      if (result.rows.length === 0) {
        return this.handleSuccess(res, [], 'Cart is empty');
      }

      const items = result.rows[0].items_json ? JSON.parse(result.rows[0].items_json) : [];
      return this.handleSuccess(res, items, 'User cart fetched successfully');
    } catch (error) {
      return this.handleError(res, error, 'GetCart');
    }
  }

  async syncCart(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required to sync cart' });
      }

      const { items } = req.body;
      const itemsList = Array.isArray(items) ? items : [];

      await executeQuery(
        `INSERT OR REPLACE INTO user_carts (user_id, items_json, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)`,
        [req.user.id, JSON.stringify(itemsList)]
      );

      return this.handleSuccess(res, itemsList, 'Cart synced with database');
    } catch (error) {
      return this.handleError(res, error, 'SyncCart');
    }
  }

  async clearCart(req, res) {
    try {
      if (!req.user) {
        return this.handleSuccess(res, [], 'Cart cleared');
      }

      await executeQuery(
        `DELETE FROM user_carts WHERE user_id = ?`,
        [req.user.id]
      );

      return this.handleSuccess(res, [], 'Cart cleared in database');
    } catch (error) {
      return this.handleError(res, error, 'ClearCart');
    }
  }
}
