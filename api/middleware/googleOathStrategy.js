const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').Strategy;
const User = require('../../database/models');
const keys = require('../../config/secret');

export default passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: 'auth/google/redirect'
    },
    (accessToken, refreshToken, profile, cb) => {
      // Need a User model to find or create User
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  )
);
