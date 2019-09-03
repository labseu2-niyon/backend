const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/user');
const userValidators = require('../validator/userValidator');
const cloudinary = require('../middleware/cloudinaryImage');
const authUser = require('../helpers/jwt');

router.get(
  '/:username/users',
  [authUser.authUser, userValidators.validateUserExists],
  controller.getAllUsers
);
router.get(
  '/:username/profile',
  [authUser.authUser, userValidators.validateUserExists],
  controller.getUserByUsername
);
router.patch(
  '/:username/profile',
  [
    authUser.authUser,
    userValidators.validateUserExists,
    userValidators.validateUserProfileUpdate
  ],
  controller.updateUserProfile
);

router.patch(
  '/:username/image/upload',
  [
    authUser.authUser,
    userValidators.validateUserExists,
    cloudinary.uploadImage('image'),
    cloudinary.deleteCloudImage
  ],
  controller.uploadUserImage
);

// Auth Routes
router.post(
  '/signup',
  [userValidators.validateUserSignup],
  controller.createUser
);

router.post('/login', [userValidators.validateUserEmail], controller.loginUser);

// Github
router.get('/auth/github', passport.authenticate('github', { session: false }));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureMessage: 'Error logging in with Github'
  }),

  controller.socialAuthlogin
);

// Linkedin
router.get(
  '/auth/linkedin',
  passport.authenticate(
    'linkedin',
    { scope: ['r_basicprofile', 'r_emailaddress'] },
    { session: false }
  )
);

router.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    failureMessage: 'Error logging in with LinkedIn'
  }),

  controller.socialAuthlogin
);

// Password Reset
router.post(
  '/resetpassword',
  [userValidators.validateUserEmail],
  controller.sendPasswordMail
);

router.patch(
  '/newpassword',
  [userValidators.validatePassword],
  controller.resetPassword
);

module.exports = router;
