/* eslint-disable no-param-reassign */
const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').Strategy;
const LinkedInStrategy = require('passport-linkedin');
const TwitterStrategy = require('passport-twitter').Strategy;
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
        defaults: {
          username: profile.username,
          email,
          password: ' '
        }
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
      callbackURL: '/api/auth/github/callback',
      scope: 'user:email'
    },
    (accessToken, refreshToken, profile, cb) => {
      return callbackStrategy(profile, cb);
    }
  );
}

function facebookStrategy() {
  return new FaceBookStrategy(
    {
      clientID: keys.FACEBOOK_APP_ID,
      clientSecret: keys.FACEBOOK_APP_SECRET,
      callbackURL: '/api/auth/facebook/callback',
      profileFields: ['id', 'last_name', 'first_name', 'email']
    },
    (accessToken, refreshToken, profile, cb) => {
      // Make sure there is a username, needed to create a new user
      if (!profile.username) {
        const newUsername = `${profile.name.familyName}${profile.name.givenName}`;
        profile = { ...profile, username: newUsername };
      }
      console.log(profile.username);
      return callbackStrategy(profile, cb);
    }
  );
}

function googleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: 'auth/google/redirect'
      },
      (accessToken, refreshToken, profile, cb) => {
        return callbackStrategy(profile, cb);
      }
    )
  );
}

function linkedinStrategy() {
  passport.use(
    new LinkedInStrategy(
      {
        consumerKey: keys.LINKEDIN_API_KEY,
        consumerSecret: keys.LINKEDIN_SECRET_KEY,
        callbackURL: '/login/?provider=linkedIn/redirect'
      },
      (accessToken, refreshToken, profile, cb) => {
        return callbackStrategy(profile, cb);
      }
    )
  );
}

function twitterStrategy() {
  passport.use(
    new TwitterStrategy(
      {
        clientID: keys.TWITTER_CONSUMER_KEY,
        clientSecret: keys.TWITTER_CONSUMER_SECRET,
        callbackURL: '/login/?provider=twitter/redirect'
      },
      (accessToken, refreshToken, profile, cb) => {
        return callbackStrategy(profile, cb);
      }
    )
  );
}

module.exports = {
  facebookStrategy,
  githubStrategy,
  googleStrategy,
  linkedinStrategy,
  twitterStrategy
};
