const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');

const models = require('../../database/models');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, cb) => {
      return models.Users.findOne({ 
        where: {
          'email': email
        }
      })
      .then(user => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }

        let hashedPassword = bcrypt.hashSync(password, user.salt);
        if (user.password === hashedPassword) {
          return document(null, user)
        }

        return cb(null, user, { message: 'Logged In Successfully' });
      })
      .catch(err => cb(err));
    }
  )
);
