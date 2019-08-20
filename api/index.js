const router = require('express').Router();
// Export routes from here
const mentorRouter = require('./mentors/mentor.router');

router.use('/mentors', mentorRouter);

module.exports = router;
