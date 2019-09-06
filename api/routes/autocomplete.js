const router = require('express').Router();
const controller = require('../controllers/autocomplete');

router.get('/:place', controller.autoComplete);

module.exports = router;
