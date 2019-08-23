const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../../database/models/users');
const keys = require('../../config/secret');

export default passport.use(
  new GitHubStrategy(
    {
      clientID: keys.GITHUB_CLIENT_ID,
      clientSecret: keys.GITHUB_CLIENT_SECRET,
      callbackURL: '/login/?provider=github/redirect'
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ githubId: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  )
);
