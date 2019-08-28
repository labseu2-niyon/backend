const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/user');
const userValidators = require('../validator/userValidator');
const cloudinary = require('../middleware/cloudinaryImage');
const authUser = require('../helpers/jwt');

router.post('/:username/profile', controller.createUserProfile);

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
router.post('/signup', controller.createUser);

router.post(
  '/login',
  [userValidators.validateUserExists, userValidators.validateUserEmail],
  controller.loginUser
);

router.get('/login/?provider=facebook', [
  passport.authenticate('facebook', {
    scope: ['profile']
  })
]);

router.get(
  '/login/?provider=facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

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
