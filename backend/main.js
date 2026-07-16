import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './api/router/authRouter.js';
import productRouter from './api/router/productRouter.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from the React frontend
app.use(express.json()); // Parse JSON payloads

import dashboardRouter from './api/router/dashboardRouter.js';

// Mount routers
// All authentication routes will be accessible under /api
app.use('/api', authRouter);
app.use('/api/products', productRouter);
app.use('/api/dashboard', dashboardRouter);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running correctly' });
});

// Start the// Start server
app.listen(PORT, () => {
  console.log(`[Lapak Kliwonan] Server is running on port ${PORT}`);
});
