import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { ProductController } from '../controllers/productController.js';
import { ProfileController } from '../controllers/profileController.js';
import { LeadController } from '../controllers/leadController.js';
import { OrderController } from '../controllers/orderController.js';
import { TeamController } from '../controllers/teamController.js';
import { AdminController } from '../controllers/adminController.js';
import { AiController } from '../controllers/aiController.js';
import { QrController } from '../controllers/qrController.js';
import { authenticateToken, optionalAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

const authCtrl = new AuthController();
const prodCtrl = new ProductController();
const profCtrl = new ProfileController();
const leadCtrl = new LeadController();
const orderCtrl = new OrderController();
const teamCtrl = new TeamController();
const adminCtrl = new AdminController();
const aiCtrl = new AiController();
const qrCtrl = new QrController();

// Auth Routes
router.post('/auth/register', (req, res) => authCtrl.register(req, res));
router.post('/auth/login', (req, res) => authCtrl.login(req, res));
router.get('/auth/me', authenticateToken, (req, res) => authCtrl.me(req, res));

// Products & Store Routes
router.get('/products', (req, res) => prodCtrl.getProducts(req, res));
router.get('/products/:id', (req, res) => prodCtrl.getProductById(req, res));
router.get('/categories', (req, res) => prodCtrl.getCategories(req, res));
router.post('/products/custom-design', optionalAuth, (req, res) => prodCtrl.saveCustomDesign(req, res));

// Digital Profile Routes
router.get('/profile/my', authenticateToken, (req, res) => profCtrl.getMyProfile(req, res));
router.get('/profile/:username', (req, res) => profCtrl.getPublicProfile(req, res));
router.put('/profile/update', authenticateToken, (req, res) => profCtrl.updateProfile(req, res));
router.post('/profile/track', (req, res) => profCtrl.trackInteraction(req, res));
router.get('/profile/vcf/:username', (req, res) => profCtrl.downloadVcf(req, res));

// Dedicated QR Code Generation & DB Scan Analytics Routes
router.get('/qr/generate', (req, res) => qrCtrl.generateQr(req, res));
router.post('/qr/generate', (req, res) => qrCtrl.generateQr(req, res));
router.get('/qr/profile/:username', (req, res) => qrCtrl.getProfileQr(req, res));
router.get('/qr/card/:cardId', (req, res) => qrCtrl.getCardQr(req, res));
router.get('/qr/vcard/:username', (req, res) => qrCtrl.getVCardQr(req, res));
router.post('/qr/scan', (req, res) => qrCtrl.recordScan(req, res));
router.get('/qr/scan/:code', (req, res) => qrCtrl.recordScan(req, res));

// Lead Capture & CRM Routes
router.post('/leads', (req, res) => leadCtrl.captureLead(req, res));
router.get('/leads/my', authenticateToken, (req, res) => leadCtrl.getMyLeads(req, res));
router.put('/leads/:id/status', authenticateToken, (req, res) => leadCtrl.updateLeadStatus(req, res));

// E-commerce Orders Routes
router.post('/orders', optionalAuth, (req, res) => orderCtrl.createOrder(req, res));
router.get('/orders/my', authenticateToken, (req, res) => orderCtrl.getMyOrders(req, res));
router.post('/coupons/validate', (req, res) => orderCtrl.validateCoupon(req, res));

// Business Team Management Routes
router.get('/teams/my', authenticateToken, (req, res) => teamCtrl.getMyTeam(req, res));
router.post('/teams', authenticateToken, (req, res) => teamCtrl.createTeam(req, res));
router.post('/teams/members', authenticateToken, (req, res) => teamCtrl.addMember(req, res));

// AI Assistant & Networking Analytics
router.post('/ai/bio', optionalAuth, (req, res) => aiCtrl.generateBio(req, res));
router.get('/ai/insights', authenticateToken, (req, res) => aiCtrl.getInsights(req, res));

// Admin Dashboard Routes
router.get('/admin/stats', authenticateToken, requireRole('admin'), (req, res) => adminCtrl.getDashboardStats(req, res));
router.post('/admin/products', authenticateToken, requireRole('admin'), (req, res) => adminCtrl.createProduct(req, res));
router.put('/admin/products/:id', authenticateToken, requireRole('admin'), (req, res) => adminCtrl.updateProduct(req, res));
router.delete('/admin/products/:id', authenticateToken, requireRole('admin'), (req, res) => adminCtrl.deleteProduct(req, res));
router.get('/admin/content', (req, res) => adminCtrl.getHomepageContent(req, res));
router.post('/admin/content', authenticateToken, requireRole('admin'), (req, res) => adminCtrl.updateHomepageContent(req, res));

export default router;
