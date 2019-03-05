const {
  NODE_ENV = 'development',
} = process.env || {};

const openWeather = require('./openWeather');
const google = require('./google');

module.exports = {
  isDevelopment: NODE_ENV === 'development',
  sessionSecret: 'go go rangers!!!',
  openWeather,
  google,
};
