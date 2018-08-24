const express = require('express');
const fs = require('fs');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/', [auth, admin], async (req, res) => {
  // console.log(req.body);
  fs.writeFile('image.jpg', req.body, err => {
    if (err) console.log(err.message);
  });
  return res.send('OK');
});

module.exports = router;
