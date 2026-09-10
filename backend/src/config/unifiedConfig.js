import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  db: {
    url: process.env.TURSO_DATABASE_URL || 'file:aikulb.db',
    authToken: process.env.TURSO_AUTH_TOKEN || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'aikulb_super_secret_jwt_key_2026_premium_nfc_identity',
    expiresIn: '7d',
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  payments: {
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_aikulb_key',
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret',
  }
};
