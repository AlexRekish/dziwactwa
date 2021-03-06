const express = require('express');
const winston = require('winston');
const validator = require('../middleware/validate');
const { BlogPost, validate } = require('../models/blogpost');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const { firebaseAdmin } = require('./upload');

const router = express.Router();

const bucket = firebaseAdmin.storage().bucket();

router.get('/', async (req, res) => {
  const blogposts = await BlogPost.find().sort({ date: -1 });
  const cuttedBlogposts = blogposts.map(post => ({
    _id: post._id,
    title: post.title,
    photo: post.photo,
    date: post.date
  }));
  return res.send(cuttedBlogposts);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id).sort();
  if (!blogpost) return res.status(404).send('Blog post not found');
  return res.send(blogpost);
});

router.post('/', [auth, admin, validator(validate)], async (req, res) => {
  const blogpost = new BlogPost({
    title: req.body.title,
    photo: req.body.photo,
    text: req.body.text
  });
  await blogpost.save();
  return res.send(blogpost);
});

router.put('/:id', [auth, admin, validateObjectId, validator(validate)], async (req, res) => {
  const blogpost = await BlogPost.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      photo: req.body.photo,
      text: req.body.text,
      date: new Date()
    },
    { new: true }
  );
  if (!blogpost) return res.status(404).send('Blog post with passed id not found');
  return res.send(blogpost);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const blogpost = await BlogPost.findByIdAndRemove(req.params.id);
  if (!blogpost) return res.status(404).send('Blog post with passed id not found');

  try {
    const imgName = blogpost.path.split('dziwactwa-b0813.appspot.com/');
    const samePhotos = await BlogPost.find({ photo: blogpost.photo });
    if (!samePhotos.length) await bucket.file(imgName[1]).delete();
  } catch (err) {
    winston.error(err);
  }

  return res.send(blogpost);
});
module.exports = router;
