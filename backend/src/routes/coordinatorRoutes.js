const express = require('express');
const { createDisaster, getDisasterStats, approveOrganization, assignTeam, sendEmergencyNotification, getDisasters} = require('../controllers/coordinatorController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post( '/disasters', verifyToken, requireRole('coordinator'), createDisaster);
router.get( '/disasters/:id?', verifyToken,  requireRole('coordinator'),  getDisasters );
router.patch( '/organizations/:orgId/approve',  verifyToken,  requireRole('coordinator'),
approveOrganization);
router.post('/disasters/:disasterId/assign-team', verifyToken, requireRole('coordinator'),assignTeam);
router.get( '/disasters/:disasterId/stats',verifyToken, requireRole('coordinator'),  getDisasterStats);
router.post('/emergency-notifications', verifyToken, requireRole('coordinator'),sendEmergencyNotification);



module.exports = router;
