const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').Strategy;
const LinkedInStrategy = require('passport-linkedin');
const TwitterStrategy = require('passport-twitter').Strategy;
const models = require('../../database/models');
const keys = require('../../config/secret');

function callbackStrategy(profile, cb) {
  models.Users.findOne({where: {email: profile.email}}, (err, user)=>{
    console.log(user);
    if(user) {
      return cb(err, user)
    }
    User.findOrCreate({ auth_id: profile.id }, (err, user) => {
      return cb(err, user);
    });
  })
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
       return callbackStrategy(profile, cb)
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
        User.findOrCreate({ githubId: profile.id }, (err, user) => {
          return cb(err, user);
        });
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
        // Need a User model to find or create User
        User.findOrCreate({ googleId: profile.id }, (err, user) => {
          return cb(err, user);
        });
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
      (token, tokenSecret, profile, done) => {
        User.findOrCreate({ linkedinId: profile.id }, (err, user) => {
          return done(err, user);
        });
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
      (token, tokenSecret, profile, cb) => {
        User.findOrCreate({ twitterId: profile.id }, (err, user) => {
          return cb(err, user);
        });
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
