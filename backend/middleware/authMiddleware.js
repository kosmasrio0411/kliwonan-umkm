import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

/**
 * authMiddleware
 * Intercepts requests, checks for a Bearer token in the Authorization header,
 * verifies the token with jsonwebtoken, and injects the user payload into req.user.
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export default async function authMiddleware(req, res, next) {
  try {
    // 1. Get the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized: Missing or invalid authorization header'
      });
    }

    // 2. Extract the token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized: Token not found'
      });
    }

    // 3. Verify the token using jsonwebtoken
    let user;
    try {
      user = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized: Invalid or expired token'
      });
    }

    // 4. Inject the user object and token into the request object
    req.user = user;
    req.token = token;

    // 5. Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('[authMiddleware] Error:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error during authentication'
    });
  }
}
