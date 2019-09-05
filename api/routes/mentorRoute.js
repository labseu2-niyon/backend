const router = require('express').Router();
const auth = require('../helpers/jwt');
const userValidator = require('../validator/userValidator');
const controller = require('../controllers/mentor');

router.get('/', (req, res) => {
  res.status(200).json('Mentor routes can be seen here');
});
router.get(
  '/:username/mentors',
  [auth.authUser, userValidator.validateUserExists],
  controller.getAllMentors
);

router.get(
  '/:username',
  [auth.authUser, userValidator.validateUserExists],
  controller.checkifUserIsMentor
);

router.post(
  '/:username/mentor',
  [auth.authUser, userValidator.validateUserExists],
  controller.makeUserMentor
);

router.post('/choice', controller.addMentorChoice);

module.exports = router;
