const { verifyToken } = require('../utils/jwt');

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided.' });
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (error) {
    return res.status(403).json({ message: `Authentication failed: ${error.message}` });
  }

  if (!decoded) {
    return res.status(403).json({ message: 'Authentication failed: Invalid token.' });
  }
  req.user = decoded;
  next();
};

module.exports = authenticateToken;