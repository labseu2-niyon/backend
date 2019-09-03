const router = require('express').Router();
// Export routes from here

const userRouter = require('./routes/userRoute');
const mentorRouter = require('./routes/mentorRoute');
const menteeRouter = require('./routes/menteeRoute');
const jobsRouter = require('./routes/jobsRoute');

router.use('/user', userRouter);
router.use('/mentor', mentorRouter);
router.use('/mentee', menteeRouter);
router.use('/jobs', jobsRouter);

module.exports = router;
