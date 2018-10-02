const express = require('express');
const winston = require('winston');
const { firebaseAdmin } = require('./upload');
const validator = require('../middleware/validate');
const { Photo, validate } = require('../models/photo');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

const bucket = firebaseAdmin.storage().bucket();

router.get('/', async (req, res) => {
  const photos = await Photo.find().sort({ date: -1 });
  return res.send(photos);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  if (!photo) return res.status(404).send('Photo not found');
  return res.send(photo);
});

router.post('/', [auth, admin, validator(validate)], async (req, res) => {
  const photo = new Photo({
    title: req.body.title,
    tags: req.body.tags,
    path: req.body.path
  });
  await photo.save();
  return res.send(photo);
});

router.put('/:id', [auth, admin, validateObjectId, validator(validate)], async (req, res) => {
  const photo = await Photo.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      tags: req.body.tags,
      path: req.body.path
    },
    { new: true }
  );
  if (!photo) return res.status(404).send('Photo with passed id not found');
  return res.send(photo);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const photo = await Photo.findByIdAndRemove(req.params.id);
  if (!photo) return res.status(404).send('Photo with passed id not found');

  try {
    const imgName = photo.path.split('dziwactwa-b0813.appspot.com/');
    const samePhotos = await Photo.find({ path: photo.path });
    if (!samePhotos.length) await bucket.file(imgName[1]).delete();
  } catch (err) {
    winston.error(err);
  }
  return res.send(photo);
});
module.exports = router;
