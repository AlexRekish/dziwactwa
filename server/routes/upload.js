const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const express = require('express');
const Busboy = require('busboy');
const winston = require('winston');
const config = require('config');
const firebaseAdmin = require('firebase-admin');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const upload = express.Router();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    private_key: config.get('firebasePrivateKey').replace(/\\n/g, '\n'),
    client_email: config.get('firebaseClientEmail')
  }),
  storageBucket: 'dziwactwa-b0813.appspot.com'
});

const bucket = firebaseAdmin.storage().bucket();

upload.post('/', [auth, admin], async (req, res) => {
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
    let fileName;
    let saveTo;
    bus.on('file', (fieldname, file, filename, encoding, mimetype) => {
      if (/^image\//i.test(mimetype)) {
        const fileExt = filename.split('.').reverse()[0];
        fileName = `${imgName}.${fileExt}`;
        saveTo = path.join(__dirname, '../public/img', `${imgName}.${fileExt}`);
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

    bus.on('finish', async () => {
      if (!error) {
        await bucket.upload(saveTo, {
          destination: fileName,
          predefinedAcl: 'publicRead'
        });
        // const file = await bucket.file(fileName).getSignedUrl({
        //   action: 'read',
        //   expires: '03-09-2491'
        // });
        const file = await bucket.file(fileName);
        unlink(saveTo);
        return res.status(201).send(`https://storage.googleapis.com/${bucket.name}/${file.id}`);
      }
    });

    return req.pipe(bus);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = {
  upload,
  firebaseAdmin
};
