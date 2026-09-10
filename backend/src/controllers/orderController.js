import { executeQuery } from '../db/connection.js';
import { BaseController } from './baseController.js';

export class OrderController extends BaseController {
  async createOrder(req, res) {
    try {
      const { items, shipping_address, coupon_code, payment_method = 'UPI / Card' } = req.body;
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart items required' });
      }

      const userId = req.user ? req.user.id : 'guest-usr-' + Date.now();
      let subtotal = 0;

      for (const item of items) {
        subtotal += (item.price || 0) * (item.quantity || 1);
      }

      let discountAmount = 0;
      if (coupon_code) {
        const couponRes = await executeQuery('SELECT * FROM coupons WHERE code = ? AND is_active = 1', [coupon_code.toUpperCase().trim()]);
        if (couponRes.rows.length > 0) {
          const coupon = couponRes.rows[0];
          discountAmount = (subtotal * coupon.discount_percent) / 100;
          await executeQuery('UPDATE coupons SET current_uses = current_uses + 1 WHERE id = ?', [coupon.id]);
        }
      }

      const totalAmount = Math.max(0, subtotal - discountAmount);
      const orderId = 'ord-' + Date.now();
      const orderNumber = 'AIK-' + Math.floor(100000 + Math.random() * 900000);

      await executeQuery(
        `INSERT INTO orders (
          id, order_number, user_id, total_amount, discount_amount, status, payment_status, payment_method, shipping_address_json, items_json
        ) VALUES (?, ?, ?, ?, ?, 'Processing', 'Paid', ?, ?, ?)`,
        [
          orderId,
          orderNumber,
          userId,
          totalAmount,
          discountAmount,
          payment_method,
          JSON.stringify(shipping_address || {}),
          JSON.stringify(items),
        ]
      );

      return this.handleSuccess(res, {
        order_id: orderId,
        order_number: orderNumber,
        total_amount: totalAmount,
        discount_amount: discountAmount,
        status: 'Processing',
        payment_status: 'Paid',
      }, 'Order placed successfully!', 201);
    } catch (error) {
      return this.handleError(res, error, 'CreateOrder');
    }
  }

  async getMyOrders(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const result = await executeQuery('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
      const orders = result.rows.map(ord => ({
        ...ord,
        items: ord.items_json ? JSON.parse(ord.items_json) : [],
        shipping_address: ord.shipping_address_json ? JSON.parse(ord.shipping_address_json) : {},
      }));

      return this.handleSuccess(res, orders, 'My orders list');
    } catch (error) {
      return this.handleError(res, error, 'GetMyOrders');
    }
  }

  async validateCoupon(req, res) {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ success: false, message: 'Coupon code required' });
      }

      const result = await executeQuery('SELECT * FROM coupons WHERE code = ? AND is_active = 1', [code.toUpperCase().trim()]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
      }

      const coupon = result.rows[0];
      return this.handleSuccess(res, {
        code: coupon.code,
        discount_percent: coupon.discount_percent,
      }, 'Coupon valid!');
    } catch (error) {
      return this.handleError(res, error, 'ValidateCoupon');
    }
  }
}
