import express from 'express';
import { getProducts, getManageProducts, createProduct, updateProduct, deleteProduct } from '../handler/productHandler.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const productRouter = express.Router();

// Public route
productRouter.get('/', getProducts);

// Protected routes (require Supabase Auth token)
productRouter.get('/manage', authMiddleware, getManageProducts);
productRouter.post('/', authMiddleware, createProduct);
productRouter.put('/:id', authMiddleware, updateProduct);
productRouter.delete('/:id', authMiddleware, deleteProduct);

export default productRouter;
