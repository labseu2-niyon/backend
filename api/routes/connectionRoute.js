const router = require('express').Router();
const controller = require('../controllers/connection');

router.post('', controller.makeConnectionRequest);
router.get('/:connectionId', controller.getConnection);
router.get('/:userId/requests', controller.getConnectionsRequestsForUser);
router.get('/:userId/accepted', controller.getAcceptedConnections);
router.patch('/:connectionId', controller.updateConnection);

module.exports = router;
