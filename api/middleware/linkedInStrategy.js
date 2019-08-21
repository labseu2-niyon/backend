const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin');
const User = require('../../database/models/users');
const keys = require('../../config/secret');

export default passport.use(
  new LinkedInStrategy(
    {
      consumerKey: keys.LINKEDIN_API_KEY,
      consumerSecret: keys.LINKEDIN_SECRET_KEY,
      callbackURL: '/login/?provider=linkedIn/redirect'
    },
    (token, tokenSecret, profile, done) => {
      User.findOrCreate({ linkedinId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  )
);
