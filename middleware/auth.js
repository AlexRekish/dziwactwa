const jwt = require('jsonwebtoken');
const config = require('config');
// const { User } = require('../models/user');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  // const refresh = req.header('x-refresh-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = await jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (error) {
    // if (error.name === 'TokenExpiredError') return res.status(401).send('Expired Token');
    return res.status(400).send('Invalid token');
  }
};
