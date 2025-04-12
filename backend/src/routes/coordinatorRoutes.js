const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { 
  validateRequestBody 
} = require('../middlewares/validationMiddleware'); 
const { 
    createDisasterSchema,
    assignDisasterToTeamSchema, 
    emergencyNotificationSchema
 } = require('../validation/coordinatorValidation');

 const {
    createDisaster,
    getDisasters,
    closeDisaster,
    approveOrganization,
    getAllOrganizations,
    getAllTeams,
    assignDisasterToTeam,
    getDisasterStats,
    getLocationKeyByCity,
    getLocationInfoByKey,
    sendEmergencyNotification
 } = require('../controllers/coordinatorController');

const router = express.Router();


router.use(verifyToken);
router.use(requireRole('coordinator'));


router.post('/disasters', validateRequestBody(createDisasterSchema), createDisaster);


router.get('/disasters', getDisasters);

router.patch('/disasters/:disasterId/close', closeDisaster);

router.get('/organizations', getAllOrganizations);

router.patch('/organizations/:orgId/approve', approveOrganization);


router.get('/teams', getAllTeams);


router.post('/disasters/assign-team', validateRequestBody(assignDisasterToTeamSchema), assignDisasterToTeam);


router.get('/disasters/:disasterId/stats', getDisasterStats);

router.get('/city/:city',  getLocationKeyByCity);

router.get('/key/:locationKey', getLocationInfoByKey);

router.post('/send-notification', validateRequestBody(emergencyNotificationSchema), sendEmergencyNotification);

module.exports = router;
