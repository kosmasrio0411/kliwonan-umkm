import supabase, { supabaseAdmin } from '../config/db.js';

/**
 * userRepository
 * Handles direct database interactions for the 'users' table.
 */
const userRepository = {
  /**
   * Retrieves a single user record by their username.
   * Gracefully handles cases where the user does not exist by returning null.
   * 
   * @param {string} username - The username to query
   * @returns {Promise<Object|null>} The user record or null if not found
   */
  async getByUsername(username) {
    try {
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        // PostgREST returns code 'PGRST116' when no rows are returned from a .single() query
        if (error.code === 'PGRST116') {
          return null; // User not found
        }
        // Throw other errors to be caught by the service layer
        throw error;
      }

      return user;
    } catch (err) {
      console.error('[userRepository.getByUsername] Error:', err.message);
      throw err;
    }
  },

  /**
   * Creates a new user record.
   * Uses supabaseAdmin to bypass RLS.
   * 
   * @param {Object} userData
   * @returns {Promise<Object>} The inserted user record
   */
  async createUser({ username, password_hash, role }) {
    try {
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .insert([{ username, password_hash, role }])
        .select('*')
        .single();

      if (error) {
        if (error.code === '23505') {
          const err = new Error('Username already exists');
          err.statusCode = 409;
          throw err;
        }
        throw error;
      }

      return user;
    } catch (err) {
      console.error('[userRepository.createUser] Error:', err.message);
      throw err;
    }
  },

  /**
   * Retrieves all users with the role 'owner_produk'
   */
  async getOwners() {
    try {
      const { data: users, error } = await supabaseAdmin
        .from('users')
        .select('id, username')
        .eq('role', 'owner_produk');

      if (error) {
        throw error;
      }
      return users;
    } catch (err) {
      console.error('[userRepository.getOwners] Error:', err.message);
      throw err;
    }
  },

  /**
   * Retrieves all users
   */
  async getAllUsers() {
    try {
      const { data: users, error } = await supabaseAdmin
        .from('users')
        .select('id, username, role')
        .order('id', { ascending: false });

      if (error) {
        throw error;
      }
      return users;
    } catch (err) {
      console.error('[userRepository.getAllUsers] Error:', err.message);
      throw err;
    }
  },

  /**
   * Deletes a user by ID
   */
  async deleteUser(id) {
    try {
      const { error } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
      return true;
    } catch (err) {
      console.error('[userRepository.deleteUser] Error:', err.message);
      throw err;
    }
  },

  /**
   * Updates a user's password
   */
  async updateUserPassword(id, password_hash) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .update({ password_hash })
        .eq('id', id)
        .select('id, username')
        .single();

      if (error) {
        throw error;
      }
      return data;
    } catch (err) {
      console.error('[userRepository.updateUserPassword] Error:', err.message);
      throw err;
    }
  }
};

export default userRepository;
