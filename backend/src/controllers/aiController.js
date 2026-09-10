import { BaseController } from './baseController.js';

export class AiController extends BaseController {
  async generateBio(req, res) {
    try {
      const { name, title, company, tone = 'executive' } = req.body;
      if (!name || !title) {
        return res.status(400).json({ success: false, message: 'Name and Title are required' });
      }

      let generatedBio = '';
      if (tone === 'executive') {
        generatedBio = `Visionary leader and ${title} at ${company || 'innovative venture'}. Spearheading digital transformation, executive strategy, and scalable growth in technology ecosystems.`;
      } else if (tone === 'creator') {
        generatedBio = `Building at the intersection of AI, hardware, and digital design. ${title} driving creative innovation & community engagement.`;
      } else {
        generatedBio = `${title} specializing in high-impact solutions, client success, and modern smart networking technologies.`;
      }

      const generatedServices = [
        { name: `${title} Consulting`, desc: `Custom strategy sessions & advisory tailored for ${company || 'your industry'}.` },
        { name: 'Strategic Partnerships', desc: 'Connecting high-value networks and enterprise opportunities.' }
      ];

      return this.handleSuccess(res, {
        bio: generatedBio,
        services: generatedServices,
        suggestedTitle: title,
      }, 'AI Bio and Services generated successfully!');
    } catch (error) {
      return this.handleError(res, error, 'AiGenerateBio');
    }
  }

  async getInsights(req, res) {
    try {
      const insights = [
        { title: 'WhatsApp Engagement Spike', text: 'Your WhatsApp button receives 38% more clicks than your email button. Consider placing it as your primary CTA.', score: '+38%' },
        { title: 'High-Value Lead Detected', text: 'Sarah Jenkins from Vertex Ventures viewed your profile 3 times in 24 hours. Recommended action: Send direct follow-up.', score: 'High Intent' },
        { title: 'Optimal Tap Times', text: 'Peak interaction hours are between 2:00 PM and 5:00 PM on Tuesdays and Thursdays during networking events.', score: 'Peak Time' },
      ];

      return this.handleSuccess(res, insights, 'AI Networking Insights');
    } catch (error) {
      return this.handleError(res, error, 'AiGetInsights');
    }
  }
}
