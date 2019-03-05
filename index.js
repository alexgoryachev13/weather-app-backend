const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo')(expressSession);
const cookieParser = require('cookie-parser');

const initMongoose = require('./lib/initMongoose');
const cors = require('cors')
const api = require('./api');
const config = require('./config');
const initPassport = require('./lib/initPassport');
const scheduler = require('./scheduler');

const app = express();

const { mongoURL } = initMongoose({ db: 'weather' });

// scheduler.start();

app
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json({ limit: '100mb' }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(expressSession({
      secret: config.sessionSecret,
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
          url: mongoURL,
          collection: 'sessions',
      }),
  }))

initPassport(app);

app
    .use('/api', api)
    .use('/public', express.static(path.join(__dirname, './public')));

app.listen(3001);

module.exports = app;
