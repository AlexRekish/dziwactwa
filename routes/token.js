const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  const refresh = req.header('x-refresh-token');
  if (!refresh) return res.status(401).send('Access denied. No token provided.');

  const decoded = await jwt.decode(refresh);
  const user = await User.findById(decoded._id);

  if (!user) return res.status(400).send('Invalid token');
  if (user.refreshToken !== refresh) return res.status(400).send('Invalid token');

  try {
    await jwt.verify(refresh, config.get('jwtSecret'));
    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return res
      .header('x-auth-token', token)
      .header('x-refresh-token', refreshToken)
      .header('access-control-expose-headers', ['x-auth-token', 'x-refresh-token'])
      .send('token refreshed successfully');
  } catch (err) {
    if (user.refreshToken === refresh && err.name === 'TokenExpiredError') {
      user.refreshToken = '';
      await user.save();
      return res.status(400).send('Invalid token');
    }

    return res.status(400).send('Invalid token');
  }
});

module.exports = router;
