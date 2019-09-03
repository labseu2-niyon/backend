const router = require('express').Router();
const controller = require('../controllers/jobs');

router.get('/all', controller.getAllJobs);

module.exports = router;
