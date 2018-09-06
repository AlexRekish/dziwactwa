const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('../middleware/validate');
const { validate, validatePassword, User } = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select({ password: 0 });
  return res.send(user);
});

router.post('/', validator(validate), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User is already registered');

  const password = validatePassword(req.body.password);
  if (password.error) return res.status(400).send(password.error.details[0].message);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    refreshTokens: {}
  });

  const refreshToken = user.generateRefreshToken();
  const salt = await bcrypt.genSalt(10);
  const deviceId = await bcrypt.hash(`${+Date.now() + Math.floor(Math.random() * 1000000)}`, salt);

  user.password = await bcrypt.hash(req.body.password, salt);
  user.refreshTokens[deviceId] = refreshToken;
  await user.save();

  const token = user.generateAuthToken();
  const returnedUser = {
    name: user.name,
    email: user.email,
    _id: user._id
  };

  return res
    .header('x-auth-token', token)
    .header('x-refresh-token', refreshToken)
    .header('x-device-id', deviceId)
    .header('access-control-expose-headers', ['x-auth-token', 'x-refresh-token', 'x-device-id'])
    .send(returnedUser);
});

module.exports = router;
