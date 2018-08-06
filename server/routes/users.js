const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('../middleware/validate');
const { validate, validatePassword, User } = require('../models/user');

const router = express.Router();

router.post('/', validator(validate), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User is already registered');

  const password = validatePassword(req.body.password);
  if (password.error) return res.status(400).send(password.error.details[0].message);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  const returnedUser = {
    name: user.name,
    email: user.email,
    _id: user._id,
  };

  return res.header('x-auth-token', token).send(returnedUser);
});


module.exports = router;
