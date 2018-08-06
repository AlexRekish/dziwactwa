const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3502;
const db = config.get('db');

if (!config.get('jwtSecret')) {
  throw new Error('Fatal error. jwtSecret is not defined!');
}

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB...');
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/users', users);
app.use('/api/auth', auth);

const server = app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});

module.exports = server;
