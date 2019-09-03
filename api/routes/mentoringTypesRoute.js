const router = require('express').Router();
const controller = require('../controllers/mentoringTypes');

router.get('/all', controller.getAllTypes);

module.exports = router;
