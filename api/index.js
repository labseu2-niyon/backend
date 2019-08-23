const router = require('express').Router();
// Export routes from here

const authRouter = require('./auth/userAuth');
const userRouter = require('./routes/userRoute');

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
