import { executeQuery } from '../db/connection.js';
import { BaseController } from './baseController.js';

export class TeamController extends BaseController {
  async getMyTeam(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const teamRes = await executeQuery('SELECT * FROM teams WHERE owner_id = ?', [req.user.id]);
      if (teamRes.rows.length === 0) {
        return this.handleSuccess(res, null, 'No team found');
      }

      const team = teamRes.rows[0];
      const membersRes = await executeQuery(
        `SELECT tm.*, p.full_name, p.title, p.username, p.email, p.views_count, p.nfc_taps
         FROM team_members tm
         LEFT JOIN profiles p ON tm.profile_id = p.id
         WHERE tm.team_id = ?`,
        [team.id]
      );

      team.members = membersRes.rows;
      return this.handleSuccess(res, team, 'Team overview');
    } catch (error) {
      return this.handleError(res, error, 'GetMyTeam');
    }
  }

  async createTeam(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const { name = 'AIKULB Executive Team' } = req.body;
      const teamId = 'team-' + Date.now();

      await executeQuery('INSERT INTO teams (id, name, owner_id) VALUES (?, ?, ?)', [teamId, name, req.user.id]);
      return this.handleSuccess(res, { id: teamId, name }, 'Team created successfully', 201);
    } catch (error) {
      return this.handleError(res, error, 'CreateTeam');
    }
  }

  async addMember(req, res) {
    try {
      const { team_id, full_name, email, title, card_assigned } = req.body;
      if (!team_id || !full_name || !email) {
        return res.status(400).json({ success: false, message: 'Team ID, Name, and Email required' });
      }

      const userId = 'usr-' + Date.now();
      const profileId = 'prof-' + Date.now();
      const username = full_name.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 100);

      // Create employee profile
      await executeQuery(
        `INSERT INTO profiles (id, user_id, username, full_name, title, email) VALUES (?, ?, ?, ?, ?, ?)`,
        [profileId, userId, username, full_name, title || 'Team Member', email]
      );

      const memberId = 'tm-' + Date.now();
      await executeQuery(
        `INSERT INTO team_members (id, team_id, user_id, profile_id, card_assigned, status) VALUES (?, ?, ?, ?, ?, 'Active')`,
        [memberId, team_id, userId, profileId, card_assigned || 'AIKULB Black Metal']
      );

      return this.handleSuccess(res, { memberId, username, full_name }, 'Team member added successfully', 201);
    } catch (error) {
      return this.handleError(res, error, 'AddMember');
    }
  }
}
