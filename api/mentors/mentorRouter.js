const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    name: 'Captain Mentor',
    company: 'Amentors',
    role: 'First Mentor'
  });
});

module.exports = router;
