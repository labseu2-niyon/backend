const router = require('express').Router();
// Export routes from here
const mentorRouter = require('./mentors/mentor.router');
const authRouter = require('./auth/userAuth');

router.use('/mentors', mentorRouter);
router.use('/auth', authRouter);

module.exports = router;
