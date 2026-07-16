import productRepository from '../repository/productRepository.js';

class ProductService {
  async getProducts(search, category, sort) {
    return await productRepository.getAll(search, category, sort);
  }

  async getManageProducts(role, userId) {
    return await productRepository.getManaged(role, userId);
  }

  async getProductById(id) {
    const product = await productRepository.getById(id);
    if (!product) return null;
    
    try {
      const media = await productRepository.getMediaByProductId(id);
      product.media = media || [];
    } catch (e) {
      product.media = [];
    }
    
    return product;
  }

  async createProduct(data, userRole, userId) {
    const { name, category, priceNum, imageUrl, description, phone, user_id } = data;
    
    if (!name || !category || !priceNum || !imageUrl || !description) {
      throw new Error('All fields (name, category, priceNum, imageUrl, description) are required');
    }

    const newProduct = {
      name,
      category,
      price: Number(priceNum),
      thumbnail_url: imageUrl,
      short_description: description,
      long_description: description,
      whatsapp_number: phone || '6281234567890',
      user_id: (userRole === 'admin' || userRole === 'admin_desa') ? (user_id || null) : userId
    };

    return await productRepository.create(newProduct);
  }

  async updateProduct(id, data, userRole, userId) {
    const { name, category, priceNum, imageUrl, description, phone, user_id } = data;

    // Check ownership if owner_produk
    if (userRole === 'owner_produk') {
      const ownerId = await productRepository.getOwnerId(id);
      if (ownerId !== userId) {
        const error = new Error('Forbidden: You can only edit your own products');
        error.statusCode = 403;
        throw error;
      }
    }

    const updatedData = {
      ...(name && { name }),
      ...(category && { category }),
      ...(priceNum && { price: Number(priceNum) }),
      ...(imageUrl && { thumbnail_url: imageUrl }),
      ...(description && { short_description: description, long_description: description }),
      ...(phone && { whatsapp_number: phone }),
    };

    if (userRole === 'admin' || userRole === 'admin_desa') {
      if (user_id !== undefined) {
        updatedData.user_id = user_id || null;
      }
    }

    return await productRepository.update(id, updatedData);
  }

  async deleteProduct(id, userRole, userId) {
    // Check ownership if owner_produk
    if (userRole === 'owner_produk') {
      const ownerId = await productRepository.getOwnerId(id);
      if (ownerId !== userId) {
        const error = new Error('Forbidden: You can only delete your own products');
        error.statusCode = 403;
        throw error;
      }
    }

    await productRepository.delete(id);
  }
}

export default new ProductService();
