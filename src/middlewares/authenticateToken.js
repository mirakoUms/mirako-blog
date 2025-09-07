const { verifyToken } = require('../utils/jwt');

/**
 * JWT authentication middleware
 * @description Checks if the token in the request header is valid
 * @Author Mirako
 * @Date 2025-09-07
 */
const authenticateToken = (req, res, next) => {
  // 1. get Authorization header
  const authHeader = req.headers['authorization'];

  // 2. check if Authorization header exists and get token
  // Format is usually "Bearer TOKEN_STRING"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // if no token, return 401 Unauthorized
    return res.status(401).json({ message: 'Authentication failed: No token provided.' });
  }

  // 3. verify Token
  const decoded = verifyToken(token);

  if (!decoded) {
    // if token is invalid (expired or signature error), return 403 Forbidden
    return res.status(403).json({ message: 'Authentication failed: Invalid token.' });
  }

  // 4. Token is valid, attach decoded user info to req object
  req.user = decoded;

  // 5. call next(), pass control to the next middleware or route handler
  next();
};

module.exports = authenticateToken;