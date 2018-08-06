const express = require('express');
const validator = require('../middleware/validate');
const { validate, validatePassword, User } = require('../models/user');

const router = express.Router();

router.post('/', validator(validate), async (req, res) => {
  const password = validatePassword(req.body.password);
  if (password.error) return res.status(400).send(password.error.details[0].message);

  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).send('User is already registered');
  return res.status(200).send();
});


module.exports = router;
