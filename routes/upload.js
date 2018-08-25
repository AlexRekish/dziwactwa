const express = require('express');
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/', [auth, admin], async (req, res) => {
  try {
    const bus = new Busboy({ headers: req.headers });
    let imgName;
    bus.on('file', (fieldname, file) => {
      imgName = +new Date() + Math.floor(Math.random() * 10000);
      const saveTo = path.join(__dirname, '../Public/img', `${imgName}.jpg`);
      file.pipe(fs.createWriteStream(saveTo));
    });
    bus.on('finish', () => res.status(201).send(`http://localhost:3502/img/${imgName}.jpg`));
    return req.pipe(bus);
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
});

module.exports = router;
