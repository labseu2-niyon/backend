const router = require('express').Router();
// Export routes from here
const mentorRouter = require('./mentors/mentor.router');
const authRouter = require('./auth/userAuth');
const userRouter = require('./user/user.router');

router.use('/mentors', mentorRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
