const router = require('express').Router();
const models = require('../../database/models');

router.get('/:username', async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await models.Users.findOne({
      where: { username: userName },
      include: [
        {
          model: models.Locations,
          as: 'location'
        }
      ]
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send('User with that username does not exist');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
