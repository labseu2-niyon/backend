const router = require('express').Router();
const auth = require('../helpers/jwt');
const userValidator = require('../validator/userValidator');
const controller = require('../controllers/mentee');

router.get('/', (req, res) => {
  res.status(200).json('Mentor routes can be seen here');
});
router.get(
  '/:username/mentees',
  [auth.authUser, userValidator.validateUserExists],
  controller.getAllMentees
);
router.post(
  '/:username/mentee',
  [auth.authUser, userValidator.validateUserExists],
  controller.makeUserMentee
);

module.exports = router;
