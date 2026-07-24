import db from '../config/db.js';
import crypto from 'crypto';

/**
 * userRepository
 * Handles direct database interactions for the 'users' table using Turso (SQLite).
 */
const userRepository = {
  async getByUsername(username) {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM users WHERE username = ?',
        args: [username]
      });

      if (result.rows.length === 0) {
        return null; // User not found
      }

      return result.rows[0];
    } catch (err) {
      console.error('[userRepository.getByUsername] Error:', err.message);
      throw err;
    }
  },

  async createUser({ username, password_hash, role }) {
    try {
      const id = crypto.randomUUID();
      const result = await db.execute({
        sql: 'INSERT INTO users (id, username, password_hash, role) VALUES (?, ?, ?, ?) RETURNING *',
        args: [id, username, password_hash, role]
      });

      return result.rows[0];
    } catch (err) {
      if (err.message.includes('UNIQUE constraint failed: users.username')) {
        const customErr = new Error('Username already exists');
        customErr.statusCode = 409;
        throw customErr;
      }
      console.error('[userRepository.createUser] Error:', err.message);
      throw err;
    }
  },

  async getOwners() {
    try {
      const result = await db.execute({
        sql: 'SELECT id, username FROM users WHERE role = ?',
        args: ['owner_produk']
      });
      return result.rows;
    } catch (err) {
      console.error('[userRepository.getOwners] Error:', err.message);
      throw err;
    }
  },

  async getAllUsers() {
    try {
      const result = await db.execute('SELECT id, username, role FROM users ORDER BY id DESC');
      return result.rows;
    } catch (err) {
      console.error('[userRepository.getAllUsers] Error:', err.message);
      throw err;
    }
  },

  async deleteUser(id) {
    try {
      await db.execute({
        sql: 'DELETE FROM users WHERE id = ?',
        args: [id]
      });
      return true;
    } catch (err) {
      console.error('[userRepository.deleteUser] Error:', err.message);
      throw err;
    }
  },

  async updateUserPassword(id, password_hash) {
    try {
      const result = await db.execute({
        sql: 'UPDATE users SET password_hash = ? WHERE id = ? RETURNING id, username',
        args: [password_hash, id]
      });

      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      return result.rows[0];
    } catch (err) {
      console.error('[userRepository.updateUserPassword] Error:', err.message);
      throw err;
    }
  }
};

export default userRepository;
