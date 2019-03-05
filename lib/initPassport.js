const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALLBACK_URL,
} = require('../config').google;

const parseGoogleProfile = () => ({
  googleId: profile.id,
  email: profile.emails[0].value,
  firstName: profile.name.givenName,
  lastName: profile.name.familyName,
  avatar: profile.photos[0].value,
});

const verify = async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const user = await User.findOne({ googleId: profile.id, email });

  if (user) {
    return done(null, user);
  }

  const data = parseGoogleProfile(profile);
  const newUser = await new User(data).save();

  return done(null, newUser);
}

const googleStrategy = new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
}, verify);

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(googleStrategy);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err, null);
    }
  });
};


