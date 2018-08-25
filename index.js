const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const helmet = require('helmet');
const Joi = require('joi');
const winston = require('winston');
const cors = require('cors');
Joi.objectId = require('joi-objectid')(Joi);
const users = require('./routes/users');
const auth = require('./routes/auth');
const blogposts = require('./routes/blogposts');
const photos = require('./routes/photos');
const upload = require('./routes/upload');
const error = require('./middleware/error');
require('express-async-errors');

const app = express();
const port = 3502;
const db = config.get('db');
// const origin = new RegExp('^http://localhost', 'i');
// const corsOptions = {
//   origin,
//   optionsSuccessStatus: 200
// };

winston.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyPrint: true }),
  new winston.transports.File({ filename: 'uncaughtExceptions.log' })
);

winston.add(
  new winston.transports.Console({
    colorize: true,
    prettyPrint: true,
    level: 'info'
  })
);
winston.add(
  new winston.transports.File({
    filename: 'logfile.log',
    handleExceptions: true,
    level: 'warn'
  })
);

process.on('unhandledRejection', err => {
  throw err;
});

if (!config.get('jwtSecret')) {
  throw new Error('Fatal error. jwtSecret is not defined!');
}

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    winston.info('Connected to MongoDB...');
  });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static('public'));
app.use(helmet());
app.use(cors());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/blog/posts', blogposts);
app.use('/api/photos', photos);
app.use('/api/upload', upload);
app.use(error);

const server = app.listen(port, () => {
  winston.info(`Listening on ${port}...`);
});

module.exports = server;
