/* eslint-disable no-param-reassign */
const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LinkedInStrategy = require('passport-linkedin');
// const TwitterStrategy = require('passport-twitter').Strategy;
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
      const newUser = await models.Users.create({
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
      callbackURL: keys.GITHUB_CALLBACK,
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
      callbackURL: keys.FACEBOOK_CALLBACK,
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
  return new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: keys.GOOGLE_CALLBACK,
      passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      if (!profile.username) {
        const newUsername = `${profile.name.familyName}${profile.name.givenName}`;
        profile = { ...profile, username: newUsername };
      }
      console.log(profile.username);
      return callbackStrategy(profile, cb);
    }
  );
}

function linkedInStrategy() {
  return new LinkedInStrategy(
    {
      clientID: keys.LINKEDIN_CLIENT_ID,
      clientSecret: keys.LINKEDIN_CLIENT_SECRET,
      callbackURL: keys.LINKEDIN_CALLBACK,
      scope: ['r_emailaddress', 'r_liteprofile'],
      state: true
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        // console.log(profile);
        return done(null, profile);
        // return callbackStrategy(profile, cb);
      });
    }
  );
}

// function twitterStrategy() {
//   passport.use(
//     new TwitterStrategy(
//       {
//         clientID: keys.TWITTER_CONSUMER_KEY,
//         clientSecret: keys.TWITTER_CONSUMER_SECRET,
//         callbackURL: '/login/?provider=twitter/redirect'
//       },
//       (accessToken, refreshToken, profile, cb) => {
//         return callbackStrategy(profile, cb);
//       }
//     )
//   );
// }

module.exports = {
  facebookStrategy,
  githubStrategy,
  googleStrategy,
  linkedInStrategy
  // twitterStrategy
};
