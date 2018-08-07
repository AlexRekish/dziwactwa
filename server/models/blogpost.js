const mongoose = require('mongoose');
const Joi = require('joi');

const blogpostSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  photo: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  text: {
    type: String,
    minlength: 10,
    maxlength: 5000,
    required: true,
  },
});

const validate = (blogPost) => {
  const schema = {
    title: Joi.string().min(3).max(255).required(),
    photo: Joi.string().min(5).max(255),
    text: Joi.string().min(10).max(5000).required(),
  };
  return Joi.validate(blogPost, schema);
};

const BlogPost = mongoose.model('BlogPost', blogpostSchema);

module.exports = {
  BlogPost,
  blogpostSchema,
  validate,
};
