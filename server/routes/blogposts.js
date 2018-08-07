const express = require('express');
const validator = require('../middleware/validate');
const { BlogPost, validate } = require('../models/blogpost');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.get('/', async (req, res) => {
  const blogposts = await BlogPost.find().sort('date');
  return res.send(blogposts);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  if (!blogpost) return res.status(404).send('Blog post not found');
  return res.send(blogpost);
});

router.post('/', [auth, admin, validator(validate)], async (req, res) => {
  const blogpost = new BlogPost({
    title: req.body.title,
    photo: req.body.photo,
    text: req.body.text,
  });
  await blogpost.save();
  return res.send(blogpost);
});

router.put('/:id', [auth, admin, validateObjectId, validator(validate)], async (req, res) => {
  const blogpost = await BlogPost.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    photo: req.body.photo,
    text: req.body.text,
  }, { new: true });
  if (!blogpost) return res.status(404).send('Blog post with passed id not found');
  return res.send(blogpost);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const blogpost = await BlogPost.findByIdAndRemove(req.params.id);
  if (!blogpost) return res.status(404).send('Blog post with passed id not found');
  return res.send(blogpost);
});
module.exports = router;
