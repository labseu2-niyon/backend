const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/users', controller.getAllUsers);
router.post('/:username/profile', controller.createUserProfile);
router.put('/:username/profile', controller.updateUserProfile);

module.exports = router;
