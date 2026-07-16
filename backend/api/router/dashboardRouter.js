import { Router } from 'express';
import dashboardHandler from '../handler/dashboardHandler.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const dashboardRouter = Router();

// GET /api/dashboard/overview
dashboardRouter.get('/overview', authMiddleware, dashboardHandler.getOverview);

export default dashboardRouter;
