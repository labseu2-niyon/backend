const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').Strategy;
const LinkedInStrategy = require('passport-linkedin');
const TwitterStrategy = require('passport-twitter').Strategy;
const models = require('../../database/models');
const keys = require('../../config/secret');

async function callbackStrategy(profile, cb) {
  const userEmail = await models.Users.findOne({
    where: { email: profile.email }
  });

  if (!userEmail) {
    const user = models.Users.findOrCreate({ auth_id: profile.id });
    return cb(null, user);
  }
  return cb(null, userEmail);
}

function facebookStrategy() {
  passport.use(
    new FaceBookStrategy(
      {
        clientID: keys.FACEBOOK_APP_ID,
        clientSecret: keys.FACEBOOK_APP_SECRET,
        callbackURL: '/login/?provider=facebook/redirect',
        profileFields: ['id', 'first-name', 'last-name', 'email-address']
      },
      (accessToken, refreshToken, profile, cb) => {
        return callbackStrategy(profile, cb);
      }
    )
  );
}

function githubStrategy() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: keys.GITHUB_CLIENT_ID,
        clientSecret: keys.GITHUB_CLIENT_SECRET,
        callbackURL: '/login/?provider=github/redirect'
      },
      (accessToken, refreshToken, profile, cb) => {
        return callbackStrategy(profile, cb);
      }
    )
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
