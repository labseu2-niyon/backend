const router = require('express').Router();
const controller = require('../controllers/location');
const authUser = require('../helpers/jwt');

router.post(
  '/getLocation',
  [authUser.authUser],
  controller.findOrCreateLocation
);

module.exports = router;
