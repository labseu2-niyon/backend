const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const model = require('../../database/models');
const keys = require('../../config/secret');

export default passport.use(
  new GitHubStrategy(
    {
      clientID: keys.GITHUB_CLIENT_ID,
      clientSecret: keys.GITHUB_CLIENT_SECRET,
      callbackURL: '/login/?provider=github/redirect'
    },
    (accessToken, refreshToken, profile, cb) => {
      model.Users.findOrCreate({ Auth_Id: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  )
);
