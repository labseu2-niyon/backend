const router = require('express').Router();
const controller = require('../controllers/mentor');

router.get('/', (req, res) => {
  res.status(200).json('Mentor routes can be seen here');
});
router.get('/mentors', controller.getAllMentors);
router.post('/:username/mentor', controller.makeUserMentor);

module.exports = router;
