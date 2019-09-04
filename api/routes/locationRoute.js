const router = require('express').Router();
const controller = require('../controllers/location');

router.post('/getLocation', controller.findOrCreateLocation);

module.exports = router;
