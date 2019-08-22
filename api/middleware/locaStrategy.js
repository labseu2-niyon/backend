const passport = require('passport');
const LocalStrategy = require('passport-local');
const UsersModel = require('../../database/models/users');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, cb) => {
      // This one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return UsersModel.findOne({ email, password })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }
          return cb(null, user, { message: 'Logged In Successfully' });
        })
        .catch(err => cb(err));
    }
  )
);
