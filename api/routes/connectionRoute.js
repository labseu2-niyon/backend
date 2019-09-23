const router = require('express').Router();
const controller = require('../controllers/connection');
const { simpleAuth } = require('../helpers/jwt');

router.post('', simpleAuth, controller.makeConnectionRequest);
router.get('/:connectionId', simpleAuth, controller.getConnection);
router.get(
  '/:userId/requests',
  simpleAuth,
  controller.getConnectionsRequestsForUser
);
router.get('/:userId/accepted', simpleAuth, controller.getAcceptedConnections);
router.patch('/:connectionId', simpleAuth, controller.updateConnection);

module.exports = router;
