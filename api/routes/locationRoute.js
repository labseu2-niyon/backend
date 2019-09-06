const router = require('express').Router();
const controller = require('../controllers/location');
const userValidators = require('../validator/userValidator');

router.post(
  '/getLocation',
  userValidators.validateLocationInfo,
  controller.findOrCreateLocation
);

module.exports = router;
