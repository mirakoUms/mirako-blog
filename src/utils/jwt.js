const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'SMUCGIAUT12FGIBCC';

// Function to generate a JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};