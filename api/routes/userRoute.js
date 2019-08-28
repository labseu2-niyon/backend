const router = require('express').Router();
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
