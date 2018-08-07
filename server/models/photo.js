const mongoose = require('mongoose');
const Joi = require('joi');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
  },
  tags: [String],
  path: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const validate = (photo) => {
  const schema = {
    title: Joi.string().min(3).max(100).required(),
    tags: Joi.array().items(Joi.string()).max(10),
    path: Joi.string().required(),
  };
  return Joi.validate(photo, schema);
};

const Photo = mongoose.model('Photo', photoSchema);

module.exports = {
  photoSchema,
  Photo,
  validate,
};
