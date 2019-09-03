const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const LinkedInStrategy = require('passport-linkedin');
const models = require('../../database/models');
const keys = require('../../config/secret');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.Users.findByPk(id, (err, user) => {
    done(err, user);
  });
});

async function callbackStrategy(profile, cb) {
  const email = profile.emails[0].value;

  try {
    const existingUser = await models.Users.findOne({ where: { email } });
    if (!existingUser) {
      const newUser = await models.Users.findOrCreate({
        where: { auth_id: profile.id },
        defaults: { username: profile.username, email, password: ' ' }
      });
      if (!newUser) {
        return new Error();
      }
      return cb(null, newUser);
    }
    return cb(null, existingUser);
  } catch (error) {
    return cb(error, null);
  }
}

function githubStrategy() {
  return new GitHubStrategy(
    {
      clientID: keys.GITHUB_CLIENT_ID,
      clientSecret: keys.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/user/auth/github/callback',
      scope: 'user:email'
    },
    (accessToken, refreshToken, profile, cb) => {
      return callbackStrategy(profile, cb);
    }
  );
}

function linkedInStrategy() {
  return new LinkedInStrategy(
    {
      consumerKey: keys.LINKEDIN_API_KEY,
      consumerSecret: keys.LINKEDIN_SECRET_KEY,
      callbackURL: '/api/user/auth/linkedin/callback',
      profileFields: ['id', 'first-name', 'last-name', 'email-address']
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      return callbackStrategy(profile, cb);
    }
  );
}

module.exports = {
  githubStrategy,
  linkedInStrategy
};
