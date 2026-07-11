import authService from '../../service/authService.js';

/**
 * authHandler
 * Parses incoming HTTP requests, validates payloads, and formats structured JSON responses for auth routes.
 */
const authHandler = {
  /**
   * Handles POST /admin/login
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // 1. Basic validation: return 400 if fields are missing
      if (!username || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Username and password are required'
        });
      }

      // 2. Call the service layer to perform authentication
      const authResult = await authService.login(username, password);

      // 3. Return 200 OK containing the JWT token and user details
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: authResult
      });

    } catch (error) {
      // 4. Handle authentication failure (401) or other errors (500)
      const statusCode = error.statusCode || 500;
      
      // If it's not a known status code like 401, log it for debugging
      if (statusCode === 500) {
        console.error('[authHandler.login] Internal Error:', error);
      }

      return res.status(statusCode).json({
        status: 'error',
        message: statusCode === 500 ? 'Internal server error' : error.message
      });
    }
  },

  /**
   * Handles POST /api/auth/register
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async register(req, res) {
    try {
      const { username, password, role } = req.body;

      if (!username || !password || !role) {
        return res.status(400).json({
          status: 'error',
          message: 'Username, password, and role are required'
        });
      }

      const user = await authService.register(username, password, role);

      return res.status(201).json({
        status: 'success',
        message: 'Account successfully created',
        data: user
      });

    } catch (error) {
      const statusCode = error.statusCode || 500;
      
      if (statusCode === 500) {
        console.error('[authHandler.register] Internal Error:', error);
      }

      return res.status(statusCode).json({
        status: 'error',
        message: statusCode === 500 ? 'Internal server error' : error.message
      });
    }
  },

  /**
   * Handles GET /api/auth/owners
   */
  async getOwners(req, res) {
    try {
      const owners = await authService.getOwners();
      return res.status(200).json({
        status: 'success',
        data: owners
      });
    } catch (error) {
      console.error('[authHandler.getOwners] Internal Error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
};

export default authHandler;
