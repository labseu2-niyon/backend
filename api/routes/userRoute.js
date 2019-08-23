const router = require('express').Router();
const controller = require('../controllers/user');

router.post('/:username/profile', controller.createUserProfile);
router.post('/signup', controller.createUser);

module.exports = router;
