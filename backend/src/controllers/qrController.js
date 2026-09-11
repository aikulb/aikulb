import QRCode from 'qrcode';
import { executeQuery } from '../db/connection.js';
import { BaseController } from './baseController.js';

export class QrController extends BaseController {

  /**
   * Universal QR Code Generation Endpoint
   * GET /api/qr/generate?text=...&format=json|dataurl|svg|png&width=300
   * POST /api/qr/generate
   */
  async generateQr(req, res) {
    try {
      const text = req.query.text || req.body?.text || req.query.url || req.body?.url || 'https://aikulb.com';
      const format = (req.query.format || req.body?.format || 'json').toLowerCase();
      const width = parseInt(req.query.width || req.body?.width || 300, 10);
      const darkColor = req.query.darkColor || req.body?.darkColor || '#0F172A';
      const lightColor = req.query.lightColor || req.body?.lightColor || '#FFFFFF';
      const margin = parseInt(req.query.margin || req.body?.margin || 2, 10);

      const qrOptions = {
        width,
        margin,
        color: {
          dark: darkColor,
          light: lightColor,
        },
        errorCorrectionLevel: 'H',
      };

      if (format === 'svg') {
        const svgString = await QRCode.toString(text, { ...qrOptions, type: 'svg' });
        res.setHeader('Content-Type', 'image/svg+xml');
        return res.send(svgString);
      }

      if (format === 'png' || format === 'image') {
        const buffer = await QRCode.toBuffer(text, { ...qrOptions, type: 'png' });
        res.setHeader('Content-Type', 'image/png');
        return res.send(buffer);
      }

      const dataUrl = await QRCode.toDataURL(text, qrOptions);
      const svgString = await QRCode.toString(text, { ...qrOptions, type: 'svg' });

      return this.handleSuccess(res, {
        targetUrl: text,
        dataUrl,
        svg: svgString,
        width,
        format: 'dataurl',
      }, 'QR Code generated successfully');
    } catch (error) {
      return this.handleError(res, error, 'GenerateQr');
    }
  }

  /**
   * Profile QR Code Generator & DB Scan Sync
   * GET /api/qr/profile/:username
   */
  async getProfileQr(req, res) {
    try {
      const { username } = req.params;
      const lowerUser = username.toLowerCase().trim();
      const format = (req.query.format || 'json').toLowerCase();

      const profileRes = await executeQuery('SELECT * FROM profiles WHERE username = ? OR id = ?', [lowerUser, lowerUser]);
      if (profileRes.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Profile not found' });
      }

      const profile = profileRes.rows[0];
      const origin = req.headers.origin || req.headers.referer || 'http://localhost:5173';
      const targetUrl = `${origin.replace(/\/$/, '')}/profile/${profile.username}`;

      const qrOptions = {
        width: parseInt(req.query.width || 320, 10),
        margin: 2,
        color: {
          dark: req.query.darkColor || '#0F172A',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'H',
      };

      if (format === 'svg') {
        const svgString = await QRCode.toString(targetUrl, { ...qrOptions, type: 'svg' });
        res.setHeader('Content-Type', 'image/svg+xml');
        return res.send(svgString);
      }

      if (format === 'png' || format === 'image') {
        const buffer = await QRCode.toBuffer(targetUrl, { ...qrOptions, type: 'png' });
        res.setHeader('Content-Type', 'image/png');
        return res.send(buffer);
      }

      const dataUrl = await QRCode.toDataURL(targetUrl, qrOptions);
      const svgString = await QRCode.toString(targetUrl, { ...qrOptions, type: 'svg' });

      // Direct VCF payload QR option
      const vcfContent = profile.vcf_data || `BEGIN:VCARD\nVERSION:3.0\nFN:${profile.full_name}\nORG:${profile.company || ''}\nTEL:${profile.phone || ''}\nEMAIL:${profile.email || ''}\nEND:VCARD`;
      const vcfDataUrl = await QRCode.toDataURL(vcfContent, qrOptions);

      return this.handleSuccess(res, {
        profileId: profile.id,
        username: profile.username,
        fullName: profile.full_name,
        targetUrl,
        dataUrl,
        svg: svgString,
        vcfDataUrl,
        qr_scans: profile.qr_scans,
      }, 'Profile QR Code generated');
    } catch (error) {
      return this.handleError(res, error, 'GetProfileQr');
    }
  }

  /**
   * Custom Card Design QR Code & DB Link
   * GET /api/qr/card/:cardId
   */
  async getCardQr(req, res) {
    try {
      const { cardId } = req.params;
      const format = (req.query.format || 'json').toLowerCase();

      // Check if custom design or product
      let targetUrl = 'https://aikulb.com';
      let cardTitle = 'AIKULB Smart Card';

      const customRes = await executeQuery('SELECT * FROM custom_card_designs WHERE id = ?', [cardId]);
      if (customRes.rows.length > 0) {
        const card = customRes.rows[0];
        cardTitle = card.card_name || 'Custom Engraved NFC Card';
        targetUrl = card.preview_url || `${req.headers.origin || 'http://localhost:5173'}/designer?id=${card.id}`;
      } else {
        const prodRes = await executeQuery('SELECT * FROM products WHERE id = ? OR slug = ?', [cardId, cardId]);
        if (prodRes.rows.length > 0) {
          const prod = prodRes.rows[0];
          cardTitle = prod.name;
          targetUrl = `${req.headers.origin || 'http://localhost:5173'}/product/${prod.slug}`;
        }
      }

      const qrOptions = {
        width: parseInt(req.query.width || 300, 10),
        margin: 2,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'H',
      };

      if (format === 'svg') {
        const svgString = await QRCode.toString(targetUrl, { ...qrOptions, type: 'svg' });
        res.setHeader('Content-Type', 'image/svg+xml');
        return res.send(svgString);
      }

      const dataUrl = await QRCode.toDataURL(targetUrl, qrOptions);

      return this.handleSuccess(res, {
        cardId,
        cardTitle,
        targetUrl,
        dataUrl,
      }, 'Card QR Code generated');
    } catch (error) {
      return this.handleError(res, error, 'GetCardQr');
    }
  }

  /**
   * Direct vCard QR Code Endpoint
   * GET /api/qr/vcard/:username
   */
  async getVCardQr(req, res) {
    try {
      const { username } = req.params;
      const profileRes = await executeQuery('SELECT * FROM profiles WHERE username = ? OR id = ?', [username, username]);
      if (profileRes.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Profile not found' });
      }

      const p = profileRes.rows[0];
      const vcfContent = p.vcf_data || `BEGIN:VCARD\nVERSION:3.0\nFN:${p.full_name}\nORG:${p.company || ''}\nTITLE:${p.title || ''}\nTEL:${p.phone || ''}\nEMAIL:${p.email || ''}\nURL:${p.website || ''}\nEND:VCARD`;

      const dataUrl = await QRCode.toDataURL(vcfContent, {
        width: 350,
        margin: 2,
        color: { dark: '#0F172A', light: '#FFFFFF' },
        errorCorrectionLevel: 'M',
      });

      return this.handleSuccess(res, {
        username: p.username,
        fullName: p.full_name,
        vcfContent,
        dataUrl,
      }, 'vCard QR Code generated');
    } catch (error) {
      return this.handleError(res, error, 'GetVCardQr');
    }
  }

  /**
   * Scan Tracker & Database Sync Endpoint
   * POST /api/qr/scan
   * GET /api/qr/scan/:code
   */
  async recordScan(req, res) {
    try {
      const identifier = req.params.code || req.body.username || req.body.profileId || req.body.identifier;
      if (!identifier) {
        return res.status(400).json({ success: false, message: 'Profile identifier or card code required' });
      }

      const lowerId = identifier.toLowerCase().trim();
      const profileRes = await executeQuery('SELECT id, username, qr_scans FROM profiles WHERE username = ? OR id = ?', [lowerId, lowerId]);

      if (profileRes.rows.length > 0) {
        const profile = profileRes.rows[0];
        await executeQuery('UPDATE profiles SET qr_scans = qr_scans + 1 WHERE id = ?', [profile.id]);
        const updatedScans = profile.qr_scans + 1;

        return this.handleSuccess(res, {
          profileId: profile.id,
          username: profile.username,
          qr_scans: updatedScans,
          redirectUrl: `/profile/${profile.username}`,
        }, 'QR Scan recorded and database updated');
      }

      return res.status(404).json({ success: false, message: 'Card or profile target not found' });
    } catch (error) {
      return this.handleError(res, error, 'RecordScan');
    }
  }
}
