import express from 'express';
import { getProducts, getManageProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../handler/productHandler.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const productRouter = express.Router();

// Public routes
productRouter.get('/', getProducts);

// Protected routes (require Supabase Auth token)
productRouter.get('/manage', authMiddleware, getManageProducts);

// This must come after /manage to avoid intercepting it
productRouter.get('/:id', getProductById); 

productRouter.post('/', authMiddleware, createProduct);
productRouter.put('/:id', authMiddleware, updateProduct);
productRouter.delete('/:id', authMiddleware, deleteProduct);

export default productRouter;
