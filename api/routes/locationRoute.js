const router = require('express').Router();
const controller = require('../controllers/location');
const authUser = require('../helpers/jwt');

router.post('/location', [authUser.authUser], controller.FindorCreateLocation);

module.exports = router;
