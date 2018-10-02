const Joi = require('joi');
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { User } = require('../models/user');
const validator = require('../middleware/validate');

const router = express.Router();

const validate = user => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(10)
      .max(24)
      .required()
  };
  return Joi.validate(user, schema);
};

router.post('/', validator(validate), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  const deviceId = req.header('x-device-id');

  if (!deviceId) {
    const device = await new mongoose.Types.ObjectId().toHexString();
    user.refreshTokens.set(device, refreshToken);
    await user.save();
    return res
      .header('x-auth-token', token)
      .header('x-refresh-token', refreshToken)
      .header('x-device-id', device)
      .header('access-control-expose-headers', ['x-auth-token', 'x-refresh-token', 'x-device-id'])
      .send({ _id: user._id, name: user.name, isAdmin: user.isAdmin });
  }

  if (deviceId && !user.refreshTokens.get(deviceId))
    return res.status(400).send('Invalid device ID');

  user.refreshTokens.set(deviceId, refreshToken);
  await user.save();
  return res
    .header('x-auth-token', token)
    .header('x-refresh-token', refreshToken)
    .header('access-control-expose-headers', ['x-auth-token', 'x-refresh-token'])
    .send({ _id: user._id, name: user.name, isAdmin: user.isAdmin });
});

module.exports = router;
