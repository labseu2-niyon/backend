const router = require('express').Router();
// Export routes from here
const mentorRouter = require('./mentors/mentorRouter');
const authRouter = require('./auth/userAuth');
const userRouter = require('./user/userRouter');

router.use('/mentors', mentorRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
