import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', brand: 'AIKULB', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', apiRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
