const router = require('express').Router();
// Export routes from here

const userRouter = require('./routes/userRoute');

router.use('/user', userRouter);

module.exports = router;
