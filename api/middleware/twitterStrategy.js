const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../../database/models/users');
const keys = require('../../config/secret');

passport.use(
  new TwitterStrategy(
    {
      clientID: keys.TWITTER_CONSUMER_KEY,
      clientSecret: keys.TWITTER_CONSUMER_SECRET,
      callbackURL: '/login/?provider=twitter/redirect'
    },
    (token, tokenSecret, profile, cb) => {
      User.findOrCreate({ twitterId: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  )
);
