import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { executeQuery } from '../db/connection.js';
import { config } from '../config/unifiedConfig.js';
import { BaseController } from './baseController.js';

export class AuthController extends BaseController {
  async register(req, res) {
    try {
      const { name, email, password, role = 'customer' } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
      }

      const existing = await executeQuery('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const userId = 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

      await executeQuery(
        'INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
        [userId, name, email.toLowerCase().trim(), passwordHash, role]
      );

      // Automatically create a default profile for the user
      const username = name.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 100);
      const profileId = 'prof-' + userId;
      await executeQuery(
        `INSERT INTO profiles (id, user_id, username, full_name, title, bio) VALUES (?, ?, ?, ?, ?, ?)`,
        [profileId, userId, username, name, 'AIKULB Member', 'Member of AIKULB smart networking community.']
      );

      const token = jwt.sign(
        { id: userId, name, email: email.toLowerCase().trim(), role, username },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      return this.handleSuccess(res, {
        user: { id: userId, name, email, role, username },
        token,
      }, 'Registration successful', 201);
    } catch (error) {
      return this.handleError(res, error, 'AuthRegister');
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }

      const result = await executeQuery('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
      if (result.rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Fetch user profile username
      const profResult = await executeQuery('SELECT username FROM profiles WHERE user_id = ?', [user.id]);
      const username = profResult.rows.length > 0 ? profResult.rows[0].username : 'user';

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role, username },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      return this.handleSuccess(res, {
        user: { id: user.id, name: user.name, email: user.email, role: user.role, username, avatar_url: user.avatar_url },
        token,
      }, 'Login successful');
    } catch (error) {
      return this.handleError(res, error, 'AuthLogin');
    }
  }

  async me(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }
      const userRes = await executeQuery('SELECT id, name, email, role, avatar_url, created_at FROM users WHERE id = ?', [req.user.id]);
      if (userRes.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const user = userRes.rows[0];
      const profResult = await executeQuery('SELECT username FROM profiles WHERE user_id = ?', [user.id]);
      user.username = profResult.rows.length > 0 ? profResult.rows[0].username : req.user.username;

      return this.handleSuccess(res, user, 'Current user data');
    } catch (error) {
      return this.handleError(res, error, 'AuthMe');
    }
  }
}
