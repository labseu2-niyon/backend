const router = require('express').Router();
const controller = require('../controllers/location');

router.get('/countries', controller.getCountries);
router.get('/:country/cities', controller.getCitiesByCountries);

module.exports = router;
