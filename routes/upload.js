const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const express = require('express');
const Busboy = require('busboy');
const config = require('config');
const winston = require('winston');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/', [auth, admin], async (req, res) => {
  const unlink = promisify(fs.unlink);

  try {
    const bus = new Busboy({
      headers: req.headers,
      limits: {
        files: 1,
        fileSize: 2000000
      }
    });
    const imgName = +new Date() + Math.floor(Math.random() * 100000);
    let error = false;
    bus.on('file', (fieldname, file, filename, encoding, mimetype) => {
      if (/^image\//i.test(mimetype)) {
        const fileExt = filename.split('.').reverse()[0];
        const saveTo = path.join(__dirname, '../public/img', `${imgName}.${fileExt}`);
        file.pipe(fs.createWriteStream(saveTo));

        file.on('limit', async () => {
          error = true;
          file.resume();
          try {
            await unlink(saveTo);
            return res.status(400).send('Too big file provided');
          } catch (err) {
            winston.error(err);
            return res.status(500).send('Something went wrong :(');
          }
        });
      } else {
        error = true;
        return res.status(400).send('Wrong file type provided!');
      }
    });

    bus.on('finish', () => {
      if (!error) res.status(201).send(`${config.get('host')}/img/${imgName}.jpg`);
    });

    return req.pipe(bus);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
