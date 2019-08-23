const router = require('express').Router();
const controller = require('../controllers/user');

router.post('/:username/profile', controller.createUserProfile);

module.exports = router;
