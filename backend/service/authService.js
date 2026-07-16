import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userRepository from '../repository/userRepository.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRES_IN = '45m';

/**
 * authService
 * Implements business logic for authentication.
 */
const authService = {
  /**
   * Attempts to log in a user with the provided credentials.
   * 
   * @param {string} username - The provided username
   * @param {string} password - The plain text password
   * @returns {Promise<Object>} An object containing the generated token and user info if successful
   * @throws {Error} Throws an error if authentication fails (invalid credentials)
   */
  async login(username, password) {
    // 1. Fetch user by username from the repository
    const user = await userRepository.getByUsername(username);

    // 2. If user doesn't exist, fail auth
    if (!user) {
      const error = new Error('Invalid username or password');
      error.statusCode = 401;
      throw error;
    }

    // 3. Compare provided plain text password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      const error = new Error('Invalid username or password');
      error.statusCode = 401;
      throw error;
    }

    // 4. If valid, generate a secure JWT token containing specific claims
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // 5. Return the token and essential user info
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  },

  /**
   * Registers a new user.
   * 
   * @param {string} username - The provided username
   * @param {string} password - The plain text password
   * @param {string} role - The user role
   * @returns {Promise<Object>} An object containing the new user info
   */
  async register(username, password, role) {
    // 1. Hash the plain text password
    const password_hash = await bcrypt.hash(password, 10);

    // 2. Create the user in the repository
    const user = await userRepository.createUser({
      username,
      password_hash,
      role
    });

    // 3. Return the newly created user info
    return {
      id: user.id,
      username: user.username,
      role: user.role
    };
  },

  /**
   * Fetches all owners
   */
  async getOwners() {
    return await userRepository.getOwners();
  },

  /**
   * Fetches all users
   */
  async getAllUsers() {
    return await userRepository.getAllUsers();
  },

  /**
   * Deletes a user
   */
  async deleteUser(id) {
    return await userRepository.deleteUser(id);
  },

  /**
   * Updates a user's password
   */
  async updateUserPassword(id, newPassword) {
    const password_hash = await bcrypt.hash(newPassword, 10);
    return await userRepository.updateUserPassword(id, password_hash);
  }
};

export default authService;
