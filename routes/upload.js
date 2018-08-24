const express = require('express');
const Busboy = require('busboy');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/', [auth, admin], async (req, res) => {
  const readdir = promisify(fs.readdir);
  try {
    const imgs = await readdir(path.join(__dirname, '../Public/img'));
    const imgLink = imgs.length + 1;

    const bus = new Busboy({ headers: req.headers });
    bus.on('file', (fieldname, file) => {
      const saveTo = path.join(__dirname, '../Public/img', `${imgLink}.jpg`);
      file.pipe(fs.createWriteStream(saveTo));
    });
    bus.on('finish', () => res.status(201).send(`http://localhost:3502/img/${imgLink}.jpg`));
    return req.pipe(bus);
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
});

module.exports = router;
