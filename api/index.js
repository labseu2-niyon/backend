const router = require('express').Router();
// Export routes from here

const authRouter = require('./auth/auth');
const userRouter = require('./routes/userRoute');
const mentorRouter = require('./routes/mentorRoute');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/mentor', mentorRouter);

module.exports = router;
