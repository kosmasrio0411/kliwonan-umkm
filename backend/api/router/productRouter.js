import express from 'express';
import multer from 'multer';
import { getProducts, getManageProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../handler/productHandler.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const productRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
productRouter.get('/', getProducts);

// Protected routes (require Supabase Auth token)
productRouter.get('/manage', authMiddleware, getManageProducts);

// This must come after /manage to avoid intercepting it
productRouter.get('/:id', getProductById); 

productRouter.post('/', authMiddleware, upload.single('thumbnail'), createProduct);
productRouter.put('/:id', authMiddleware, upload.single('thumbnail'), updateProduct);
productRouter.delete('/:id', authMiddleware, deleteProduct);

export default productRouter;
