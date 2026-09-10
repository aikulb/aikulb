import { executeQuery } from '../db/connection.js';
import { BaseController } from './baseController.js';

export class ProfileController extends BaseController {
  async getPublicProfile(req, res) {
    try {
      const { username } = req.params;
      const lowerUser = username.toLowerCase().trim();

      const result = await executeQuery('SELECT * FROM profiles WHERE username = ? OR id = ?', [lowerUser, lowerUser]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'AIKULB Profile not found' });
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

      const result = await executeQuery('SELECT * FROM profiles WHERE user_id = ?', [req.user.id]);
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
        phone, email, whatsapp, website, linkedin, instagram, youtube, github,
        custom_links, services, portfolio
      } = req.body;

      const profileRes = await executeQuery('SELECT id FROM profiles WHERE user_id = ?', [req.user.id]);
      if (profileRes.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Profile not found for this user' });
      }
      const profileId = profileRes.rows[0].id;

      // Re-generate VCF data based on updated info
      const vcfData = `BEGIN:VCARD\nVERSION:3.0\nN:;${full_name || ''};;;\nFN:${full_name || ''}\nORG:${company || ''}\nTITLE:${title || ''}\nTEL;TYPE=CELL:${phone || ''}\nEMAIL:${email || ''}\nURL:${website || ''}\nEND:VCARD`;

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
          phone, email, whatsapp, website, linkedin, instagram, youtube, github,
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
      const result = await executeQuery('SELECT full_name, company, title, phone, email, website, vcf_data FROM profiles WHERE username = ? OR id = ?', [username, username]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Profile not found' });
      }

      const p = result.rows[0];
      const vcfContent = p.vcf_data || `BEGIN:VCARD\nVERSION:3.0\nFN:${p.full_name}\nORG:${p.company || ''}\nTITLE:${p.title || ''}\nTEL:${p.phone || ''}\nEMAIL:${p.email || ''}\nURL:${p.website || ''}\nEND:VCARD`;

      res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${p.full_name ? p.full_name.replace(/[^a-z0-9]/gi, '_') : 'aikulb'}_contact.vcf"`);
      return res.send(vcfContent);
    } catch (error) {
      return this.handleError(res, error, 'DownloadVcf');
    }
  }
}
