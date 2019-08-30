const passport = require('passport');
const models = require('../../database/models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.Users.findByPk(id, (err, user) => {
    console.log('deserialize', user);
    done(err, user);
  });
});
