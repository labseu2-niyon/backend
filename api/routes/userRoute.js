const router = require('express').Router();
const controller = require('../controllers/user');
const userValidators = require('../validator/userValidator');
const cloudinary = require('../middleware/cloudinaryImage');

router.post('/:username/profile', controller.createUserProfile);

router.patch(
  '/image/upload',
  [
    userValidators.validateUserExists,
    cloudinary.uploadCloudImage('image'),
    cloudinary.deleteCloudImage
  ],
  controller.uploadUserImage
);

module.exports = router;
