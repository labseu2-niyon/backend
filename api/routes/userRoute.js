const router = require('express').Router();
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
router.get(
  '/:username',
  [userValidators.validateUserExists],
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
  '/:username/password',
  [authUser.authUser, userValidators.validateUserExists],
  controller.updateUserPassword
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

router.post(
  '/:username/socialmedia',
  [authUser.authUser, userValidators.validateUserExists],
  controller.addSocialMediaAccount
);
router.patch(
  '/:username/socials',
  [authUser.authUser, userValidators.validateUserExists],
  controller.updateSocialMediaAccount
);

router.get(
  '/:username',
  [userValidators.validateUserExists],
  controller.getUserByUsername
);

module.exports = router;
