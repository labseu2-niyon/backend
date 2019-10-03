const router = require('express').Router();
// Export routes from here

const userRouter = require('./routes/userRoute');
const locationRouter = require('./routes/locationRoute');
const authRouter = require('./routes/authRoute');
const mentorRouter = require('./routes/mentorRoute');
const countryRouter = require('./routes/countryRoute');
const autoCompleteRouter = require('./routes/autocomplete');
const jobsRouter = require('./routes/jobsRoute');
const mentorTypes = require('./routes/mentoringTypesRoute');
const menteeRouter = require('./routes/menteeRoute');
const connectionRouter = require('./routes/connectionRoute');

router.use('/user', userRouter);
router.use('/mentor', mentorRouter);
router.use('/mentee', menteeRouter);
router.use('/jobs', jobsRouter);
router.use('/types', mentorTypes);
router.use('/countries', countryRouter);
router.use('/autocomplete', autoCompleteRouter);
router.use('/location', locationRouter);
router.use('/auth', authRouter);
router.use('/connection', connectionRouter);

module.exports = router;
