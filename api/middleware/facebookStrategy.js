const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;
const User = require('../../database/models');
const keys = require('../../config/secret');

passport.use(
  new FaceBookStrategy(
    {
      clientID: keys.FACEBOOK_APP_ID,
      clientSecret: keys.FACEBOOK_APP_SECRET,
      callbackURL: '/login/?provider=facebook/redirect',
      profileFields: ['id', 'first-name', 'last-name', 'email-address']
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ facebookId: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  )
);
