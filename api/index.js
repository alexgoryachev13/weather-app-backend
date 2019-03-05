const { Router } = require('express');
const weather = require('./weather');
const google = require('./google');

module.exports = new Router()
  .use('/weather', weather)
  .use('/google', google);
