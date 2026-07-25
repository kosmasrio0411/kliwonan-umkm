import db from '../config/db.js';
import crypto from 'crypto';

class ProductRepository {
  async getAll(search, category, sort) {
    let sql = 'SELECT * FROM products';
    let args = [];
    let conditions = [];

    if (category && category !== 'Semua') {
      conditions.push('category = ?');
      args.push(category);
    }

    if (search) {
      // Use LIKE for case-insensitive search in standard SQLite text
      conditions.push('(name LIKE ? OR short_description LIKE ? OR long_description LIKE ?)');
      const likeSearch = `%${search}%`;
      args.push(likeSearch, likeSearch, likeSearch);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    if (sort === 'price-low') {
      sql += ' ORDER BY price ASC';
    } else if (sort === 'price-high') {
      sql += ' ORDER BY price DESC';
    } else {
      sql += ' ORDER BY created_at DESC';
    }

    const { rows } = await db.execute({ sql, args });
    return rows;
  }

  async getManaged(role, userId) {
    let sql = 'SELECT * FROM products';
    let args = [];

    if (role === 'owner_produk') {
      sql += ' WHERE user_id = ?';
      args.push(userId);
    }

    sql += ' ORDER BY id ASC';

    const { rows } = await db.execute({ sql, args });
    return rows;
  }

  async getById(id) {
    const { rows } = await db.execute({
      sql: 'SELECT * FROM products WHERE id = ?',
      args: [id]
    });
    
    if (rows.length === 0) return null;
    return rows[0];
  }

  async getMediaByProductId(id) {
    const { rows } = await db.execute({
      sql: 'SELECT * FROM product_media WHERE product_id = ?',
      args: [id]
    });
    return rows;
  }

  async create(productData) {
    // Generate UUID manually since SQLite doesn't have uuid_generate_v4()
    const id = crypto.randomUUID();
    const payload = { id, ...productData };
    
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    
    const placeholders = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO products (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    
    const { rows } = await db.execute({ sql, args: values });
    return rows[0];
  }

  async update(id, updateData) {
    const keys = Object.keys(updateData);
    const values = Object.values(updateData);
    
    if (keys.length === 0) {
      return this.getById(id);
    }

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const sql = `UPDATE products SET ${setClause} WHERE id = ? RETURNING *`;
    
    const args = [...values, id];

    const { rows } = await db.execute({ sql, args });
    if (rows.length === 0) return null;
    return rows[0];
  }

  async delete(id) {
    await db.execute({
      sql: 'DELETE FROM products WHERE id = ?',
      args: [id]
    });
  }

  async getOwnerId(id) {
    const { rows } = await db.execute({
      sql: 'SELECT user_id FROM products WHERE id = ?',
      args: [id]
    });
    
    if (rows.length === 0) return null;
    return rows[0].user_id;
  }

  async addMedia(productId, mediaUrl, mediaType) {
    const sql = 'INSERT INTO product_media (product_id, media_url, media_type) VALUES (?, ?, ?)';
    await db.execute({
      sql,
      args: [productId, mediaUrl, mediaType]
    });
  }

  async deleteMediaByProductId(productId) {
    await db.execute({
      sql: 'DELETE FROM product_media WHERE product_id = ?',
      args: [productId]
    });
  }
}

export default new ProductRepository();
