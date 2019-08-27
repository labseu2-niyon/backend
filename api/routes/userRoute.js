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
    cloudinary.uploadCloudImage('image'),
    cloudinary.deleteCloudImage
  ],
  controller.uploadUserImage
);

module.exports = router;
