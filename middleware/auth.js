const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Pastikan hanya mengambil token tanpa "Bearer"

  if (!token) {
    console.error("No token provided.");
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token authentication failed:", err);
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;