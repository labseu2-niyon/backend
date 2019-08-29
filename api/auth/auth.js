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

router.get(
  '/login/?provider=linkedIn',
  passport.authenticate('linkedIn', {
    scope: ['profile']
  })
);

router.post(
  '/login/?provider=LinkedIn/redirect',
  passport.authenticate('linkedIn', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.post(
  '/login/?provider=github',
  passport.authenticate('facebook', {
    scope: ['profile']
  })
);

router.post(
  '/login/?provider=github/redirect',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;
