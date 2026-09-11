import { executeQuery } from '../db/connection.js';
import { BaseController } from './baseController.js';

export class LeadController extends BaseController {
  async captureLead(req, res) {
    try {
      const { profile_id = 'support-hq', name, email, phone, company, message, source = 'NFC Profile Tap' } = req.body;
      if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and Email are required' });
      }

      const id = 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
      await executeQuery(
        `INSERT INTO leads (id, profile_id, name, email, phone, company, message, status, source)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'New', ?)`,
        [id, profile_id, name, email, phone || '', company || '', message || '', source]
      );

      return this.handleSuccess(res, { id, name, status: 'New' }, 'Lead captured successfully!', 201);
    } catch (error) {
      return this.handleError(res, error, 'CaptureLead');
    }
  }

  async getMyLeads(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      // Find profile for current user
      const profResult = await executeQuery('SELECT id FROM profiles WHERE user_id = ?', [req.user.id]);
      if (profResult.rows.length === 0) {
        return this.handleSuccess(res, [], 'No profile found, zero leads');
      }

      const profileId = profResult.rows[0].id;
      const leadsRes = await executeQuery('SELECT * FROM leads WHERE profile_id = ? ORDER BY created_at DESC', [profileId]);

      return this.handleSuccess(res, leadsRes.rows, 'Leads list');
    } catch (error) {
      return this.handleError(res, error, 'GetMyLeads');
    }
  }

  async updateLeadStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const validStatuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Closed'];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
      }

      await executeQuery('UPDATE leads SET status = ? WHERE id = ?', [status, id]);
      return this.handleSuccess(res, { id, status }, 'Lead status updated successfully');
    } catch (error) {
      return this.handleError(res, error, 'UpdateLeadStatus');
    }
  }
}
