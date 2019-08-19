const router = require('express').Router();

router.get('/', (_, res) => {
  res.status(200).json({
    name: 'Captain Mentor',
    company: 'Amentors',
    role: 'First Mentor'
  });
});

module.exports = router;
