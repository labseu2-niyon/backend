const router = require('express').Router();
// Export routes from here

const userRouter = require('./routes/userRoute');
const locationRouter = require('./routes/locationRoute');
const mentorRouter = require('./routes/mentorRoute');
const menteeRouter = require('./routes/menteeRoute');
const jobsRouter = require('./routes/jobsRoute');
const mentorTypes = require('./routes/mentoringTypesRoute');

router.use('/user', userRouter);
router.use('/mentor', mentorRouter);
router.use('/mentee', menteeRouter);
router.use('/jobs', jobsRouter);
router.use('/types', mentorTypes);
router.use('/location', locationRouter);

module.exports = router;
