const { Router } = require('express');
const login = require('./login');
const callback = require('./callback');

module.exports = new Router()
  .get('/login', login)
  .get('/callback', callback);
