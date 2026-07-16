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

// GET /auth/users (protected)
authRouter.get('/auth/users', authMiddleware, authHandler.getUsers);

// DELETE /auth/users/:id (protected)
authRouter.delete('/auth/users/:id', authMiddleware, authHandler.deleteUser);

// PUT /auth/users/:id/password (protected)
authRouter.put('/auth/users/:id/password', authMiddleware, authHandler.updateUserPassword);

export default authRouter;
