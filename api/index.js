const router = require('express').Router();
// Export routes from here

const userRouter = require('./routes/userRoute');
const mentorRouter = require('./routes/mentorRoute');

router.use('/user', userRouter);
router.use('/mentor', mentorRouter);

module.exports = router;
