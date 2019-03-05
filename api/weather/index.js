const { Router } = require('express');
const yesterday = require('./yesterday');

module.exports = new Router()
  .get('/yesterday', yesterday);
