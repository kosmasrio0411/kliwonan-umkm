import { Router } from 'express';
import authHandler from '../handler/authHandler.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const authRouter = Router();

// POST /auth/login
authRouter.post('/auth/login', authHandler.login);

// POST /auth/register (protected)
authRouter.post('/auth/register', authMiddleware, authHandler.register);

// GET /auth/owners (protected)
authRouter.get('/auth/owners', authMiddleware, authHandler.getOwners);

export default authRouter;
