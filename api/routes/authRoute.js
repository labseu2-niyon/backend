const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/auth');

// Github
router.get('/github', passport.authenticate('github', { session: false }));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureMessage: 'Error logging in with github'
  }),

  controller.socialAuthlogin
);

// Facebook
router.get('/facebook', [
  passport.authenticate('facebook', {
    scope: ['email']
  })
]);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  controller.socialAuthlogin
);

// Linkedin
router.get(
  '/linkedin',
  passport.authenticate(
    'linkedin',
    { state: 'cjT4OF3pxVWNDrB' },
    { session: false }
  )
);

router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
  // controller.socialAuthlogin
);

module.exports = router;
