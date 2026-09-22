import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { executeQuery } from '../db/connection.js';
import { config } from '../config/unifiedConfig.js';
import { BaseController } from './baseController.js';

export class ProfileController extends BaseController {
  async checkUsername(req, res) {
    try {
      const { username } = req.params;
      if (!username) {
        return res.status(400).json({ success: false, message: 'Username parameter required' });
      }
      const cleanUser = username.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '');
      const result = await executeQuery('SELECT id FROM profiles WHERE username = ?', [cleanUser]);
      const isAvailable = result.rows.length === 0;

      return this.handleSuccess(res, { username: cleanUser, available: isAvailable }, isAvailable ? 'Username available' : 'Username taken');
    } catch (error) {
      return this.handleError(res, error, 'CheckUsername');
    }
  }

  async createFullProfile(req, res) {
    try {
      const {
        full_name, email, password, username, title, company, bio,
        avatar_url, banner_url, theme = 'dark-electric',
        phone, whatsapp, website, address,
        linkedin, instagram, youtube, github,
        custom_links, services, portfolio
      } = req.body;

      if (!full_name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Full name, email, and password are required' });
      }

      const cleanEmail = email.toLowerCase().trim();
      let cleanUsername = username ? username.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '') : '';
      if (!cleanUsername) {
        cleanUsername = full_name.toLowerCase().replace(/[^a-z0-9]/g, '') || cleanEmail.split('@')[0].replace(/[^a-z0-9]/g, '');
      }

      // 1. Check user email
      const userCheck = await executeQuery('SELECT id FROM users WHERE email = ?', [cleanEmail]);
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'Email address is already registered. Please login instead.' });
      }

      // 2. Check username handle and auto-suffix if taken
      const usernameCheck = await executeQuery('SELECT id FROM profiles WHERE username = ?', [cleanUsername]);
      if (usernameCheck.rows.length > 0) {
        cleanUsername = `${cleanUsername}${Math.floor(10 + Math.random() * 90)}`;
      }

      // 3. Create User in users table
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const userId = 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

      await executeQuery(
        'INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
        [userId, full_name, cleanEmail, passwordHash, 'customer']
      );

      // 4. Generate VCF data
      const vcfData = `BEGIN:VCARD\nVERSION:3.0\nN:;${full_name};;;\nFN:${full_name}\nORG:${company || ''}\nTITLE:${title || ''}\nTEL;TYPE=CELL:${phone || ''}\nEMAIL:${cleanEmail}\nURL:${website || ''}\nADR:;;${address || ''};;;;\nEND:VCARD`;

      // 5. Create Profile in profiles table
      const profileId = 'prof-' + userId;
      const defaultAvatar = avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
      const defaultBanner = banner_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200';

      await executeQuery(
        `INSERT INTO profiles (
          id, user_id, username, full_name, title, company, bio,
          avatar_url, banner_url, theme, phone, email, whatsapp, website, address,
          linkedin, instagram, youtube, github, vcf_data,
          custom_links_json, services_json, portfolio_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          profileId, userId, cleanUsername, full_name, title || 'Digital Identity', company || '', bio || '',
          defaultAvatar, defaultBanner, theme, phone || '', cleanEmail, whatsapp || '', website || '', address || '',
          linkedin || '', instagram || '', youtube || '', github || '', vcfData,
          custom_links ? JSON.stringify(custom_links) : '[]',
          services ? JSON.stringify(services) : '[]',
          portfolio ? JSON.stringify(portfolio) : '[]'
        ]
      );

      // 6. Generate JWT Token
      const token = jwt.sign(
        { id: userId, name: full_name, email: cleanEmail, role: 'customer', username: cleanUsername },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      return this.handleSuccess(res, {
        user: { id: userId, name: full_name, email: cleanEmail, role: 'customer', username: cleanUsername, avatar_url: defaultAvatar },
        profile: { id: profileId, username: cleanUsername, full_name, title, company, theme },
        token
      }, 'Digital Profile created successfully!', 201);

    } catch (error) {
      return this.handleError(res, error, 'CreateFullProfile');
    }
  }

  async getPublicProfile(req, res) {
    try {
      const { username } = req.params;
      const lowerUser = username.toLowerCase().trim();

      const result = await executeQuery('SELECT * FROM profiles WHERE username = ? OR id = ?', [lowerUser, lowerUser]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'AI KLUB Profile not found' });
      }

      const profile = result.rows[0];
      profile.custom_links = profile.custom_links_json ? JSON.parse(profile.custom_links_json) : [];
      profile.services = profile.services_json ? JSON.parse(profile.services_json) : [];
      profile.portfolio = profile.portfolio_json ? JSON.parse(profile.portfolio_json) : [];

      // Increment profile view count silently
      await executeQuery('UPDATE profiles SET views_count = views_count + 1 WHERE id = ?', [profile.id]);
      profile.views_count += 1;

      return this.handleSuccess(res, profile, 'Profile retrieved successfully');
    } catch (error) {
      return this.handleError(res, error, 'GetPublicProfile');
    }
  }

  async getMyProfile(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      let result = await executeQuery('SELECT * FROM profiles WHERE user_id = ?', [req.user.id]);
      if (result.rows.length === 0) {
        // Fallback for admin or demo users: return default profile row
        result = await executeQuery('SELECT * FROM profiles LIMIT 1');
      }

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Profile not found' });
      }

      const profile = result.rows[0];
      profile.custom_links = profile.custom_links_json ? JSON.parse(profile.custom_links_json) : [];
      profile.services = profile.services_json ? JSON.parse(profile.services_json) : [];
      profile.portfolio = profile.portfolio_json ? JSON.parse(profile.portfolio_json) : [];

      return this.handleSuccess(res, profile, 'My profile data');
    } catch (error) {
      return this.handleError(res, error, 'GetMyProfile');
    }
  }

  async updateProfile(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const {
        full_name, title, company, bio, avatar_url, banner_url, theme,
        phone, email, whatsapp, website, address, linkedin, instagram, youtube, github,
        custom_links, services, portfolio
      } = req.body;

      const profileRes = await executeQuery('SELECT id FROM profiles WHERE user_id = ?', [req.user.id]);
      if (profileRes.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Profile not found for this user' });
      }
      const profileId = profileRes.rows[0].id;

      // Re-generate VCF data based on updated info
      const vcfData = `BEGIN:VCARD\nVERSION:3.0\nN:;${full_name || ''};;;\nFN:${full_name || ''}\nORG:${company || ''}\nTITLE:${title || ''}\nTEL;TYPE=CELL:${phone || ''}\nEMAIL:${email || ''}\nURL:${website || ''}\nADR:;;${address || ''};;;;\nEND:VCARD`;

      await executeQuery(
        `UPDATE profiles SET
          full_name = COALESCE(?, full_name),
          title = COALESCE(?, title),
          company = COALESCE(?, company),
          bio = COALESCE(?, bio),
          avatar_url = COALESCE(?, avatar_url),
          banner_url = COALESCE(?, banner_url),
          theme = COALESCE(?, theme),
          phone = COALESCE(?, phone),
          email = COALESCE(?, email),
          whatsapp = COALESCE(?, whatsapp),
          website = COALESCE(?, website),
          address = COALESCE(?, address),
          linkedin = COALESCE(?, linkedin),
          instagram = COALESCE(?, instagram),
          youtube = COALESCE(?, youtube),
          github = COALESCE(?, github),
          vcf_data = ?,
          custom_links_json = ?,
          services_json = ?,
          portfolio_json = ?
        WHERE id = ?`,
        [
          full_name, title, company, bio, avatar_url, banner_url, theme,
          phone, email, whatsapp, website, address, linkedin, instagram, youtube, github,
          vcfData,
          custom_links ? JSON.stringify(custom_links) : null,
          services ? JSON.stringify(services) : null,
          portfolio ? JSON.stringify(portfolio) : null,
          profileId
        ]
      );

      return this.handleSuccess(res, { profileId }, 'Profile updated successfully');
    } catch (error) {
      return this.handleError(res, error, 'UpdateProfile');
    }
  }

  async trackInteraction(req, res) {
    try {
      const { profileId, type } = req.body;
      if (!profileId || !type) {
        return res.status(400).json({ success: false, message: 'ProfileId and interaction type required' });
      }

      if (type === 'nfc') {
        await executeQuery('UPDATE profiles SET nfc_taps = nfc_taps + 1 WHERE id = ?', [profileId]);
      } else if (type === 'qr') {
        await executeQuery('UPDATE profiles SET qr_scans = qr_scans + 1 WHERE id = ?', [profileId]);
      } else {
        await executeQuery('UPDATE profiles SET views_count = views_count + 1 WHERE id = ?', [profileId]);
      }

      return this.handleSuccess(res, { tracked: true, type }, 'Interaction tracked');
    } catch (error) {
      return this.handleError(res, error, 'TrackInteraction');
    }
  }

  async downloadVcf(req, res) {
    try {
      const { username } = req.params;
      let p = null;
      const result = await executeQuery('SELECT full_name, company, title, phone, email, website, vcf_data FROM profiles WHERE username = ? OR id = ?', [username, username]);
      if (result.rows.length > 0) {
        p = result.rows[0];
      } else {
        const fallbackRes = await executeQuery('SELECT full_name, company, title, phone, email, website, vcf_data FROM profiles LIMIT 1', []);
        if (fallbackRes.rows.length > 0) {
          p = fallbackRes.rows[0];
        } else {
          p = { full_name: 'ai klub Member', company: 'ai klub Smart Card', title: 'Digital Identity', phone: '+919876543210', email: 'member@aiklub.com' };
        }
      }

      const vcfContent = p.vcf_data || `BEGIN:VCARD\nVERSION:3.0\nFN:${p.full_name}\nORG:${p.company || ''}\nTITLE:${p.title || ''}\nTEL:${p.phone || ''}\nEMAIL:${p.email || ''}\nURL:${p.website || ''}\nEND:VCARD`;

      res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${p.full_name ? p.full_name.replace(/[^a-z0-9]/gi, '_') : 'ai_klub'}_contact.vcf"`);
      return res.send(vcfContent);
    } catch (error) {
      return this.handleError(res, error, 'DownloadVcf');
    }
  }
}
