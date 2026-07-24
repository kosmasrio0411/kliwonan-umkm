import productService from '../../service/productService.js';
import { uploadToCloudinary } from '../../config/cloudinary.js';

export const getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    const products = await productService.getProducts(search, category, sort);

    return res.status(200).json({
      status: 'success',
      data: products || []
    });
  } catch (error) {
    console.error('[getProducts] Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const getManageProducts = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const products = await productService.getManageProducts(role, userId);

    return res.status(200).json({
      status: 'success',
      data: products || []
    });
  } catch (error) {
    console.error('[getManageProducts] Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    return res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    console.error('[getProductById] Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;
    
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      req.body.imageUrl = imageUrl;
    }

    const data = await productService.createProduct(req.body, req.user.role, req.user.id);

    return res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data
    });
  } catch (error) {
    console.error('[createProduct] Error:', error.message);
    if (error.message.includes('All fields')) {
      return res.status(400).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let imageUrl = req.body.imageUrl;
    
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      req.body.imageUrl = imageUrl;
    }

    const data = await productService.updateProduct(id, req.body, req.user.role, req.user.id);

    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data
    });
  } catch (error) {
    console.error('[updateProduct] Error:', error.message);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id, req.user.role, req.user.id);

    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('[deleteProduct] Error:', error.message);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
