const router = require('express').Router();
// Export routes from here

const authRouter = require('./auth/userAuth');

router.use('/auth', authRouter);

module.exports = router;
