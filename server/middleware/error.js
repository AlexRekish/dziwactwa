const winston = require('winston');

/* eslint-disable-next-line no-unused-vars */
module.exports = (err, req, res, next) => {
  winston.error(err.message, err);
  return res.status(500).send('Something went wrong');
};
