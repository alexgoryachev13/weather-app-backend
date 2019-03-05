const passport = require('passport');

module.exports = [
  passport.authenticate('google', { failureRedirect: '/login/error' }),
  (req, res) => {
    // in real app I extract it from env
    res.redirect('https://localhost:3000/');
  }
];

