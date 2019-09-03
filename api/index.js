const router = require('express').Router();
// Export routes from here

const userRouter = require('./routes/userRoute');
const mentorRouter = require('./routes/mentorRoute');
const countryRouter = require('./routes/countryRoute');
const autoCompleteRouter = require('./routes/autocomplete');

router.use('/user', userRouter);
router.use('/mentor', mentorRouter);
router.use('/countries', countryRouter);
router.use('/autocomplete', autoCompleteRouter);

module.exports = router;
