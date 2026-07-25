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

  async createProduct(data, mediaList = [], userRole, userId) {
    const { name, category, price, priceNum, imageUrl, description, phone, user_id } = data;
    
    if (!name || !category || !priceNum || !imageUrl || !description) {
      throw new Error('All fields (name, category, priceNum, imageUrl, description) are required');
    }

    const newProduct = {
      name,
      category,
      price: price || `Rp ${Number(priceNum).toLocaleString('id-ID')}`,
      thumbnail_url: imageUrl,
      short_description: description,
      long_description: description,
      whatsapp_number: phone || '6281234567890',
      user_id: (userRole === 'admin' || userRole === 'admin_desa') ? (user_id || null) : userId
    };

    const createdProduct = await productRepository.create(newProduct);
    
    if (mediaList && mediaList.length > 0) {
      for (const media of mediaList) {
        await productRepository.addMedia(createdProduct.id, media.media_url, media.media_type);
      }
    }
    
    return createdProduct;
  }

  async updateProduct(id, data, mediaList = [], userRole, userId) {
    const { name, category, price, priceNum, imageUrl, description, phone, user_id } = data;

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
      ...((price || priceNum) && { price: price || `Rp ${Number(priceNum).toLocaleString('id-ID')}` }),
      ...(imageUrl && { thumbnail_url: imageUrl }),
      ...(description && { short_description: description, long_description: description }),
      ...(phone && { whatsapp_number: phone }),
    };

    if (userRole === 'admin' || userRole === 'admin_desa') {
      if (user_id !== undefined) {
        updatedData.user_id = user_id || null;
      }
    }

    const updatedProduct = await productRepository.update(id, updatedData);
    
    // Update media list: delete old and insert new ones
    if (mediaList) {
      await productRepository.deleteMediaByProductId(id);
      for (const media of mediaList) {
        await productRepository.addMedia(id, media.media_url, media.media_type);
      }
    }
    
    return updatedProduct;
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
