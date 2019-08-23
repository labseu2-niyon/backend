const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/login/?provider=facebook',
  passport.authenticate('facebook', {
    scope: ['profile']
  })
);

router.get(
  '/login/?provider=facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;
