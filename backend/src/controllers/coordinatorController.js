const coordinatorService = require('../services/coordinatorService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');
const { createDisasterSchema, assignDisasterToTeamSchema, emergencyNotificationSchema } = require('../validation/coordinatorValidation');

const createDisaster = async (req, res) => {
  try {
    const { error, value } = createDisasterSchema.validate(req.body);
    if (error) return sendErrorResponse(res, error.details[0].message, 422);
    
    const coordinatorId = req.user.id;
    const result = await coordinatorService.createDisaster(coordinatorId, value);
    return sendSuccessResponse(res, result, 'Disaster created successfully');
  } catch (error) {
    console.error('createDisaster error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getDisasters = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const result = await coordinatorService.getDisasters(offset, parseInt(limit));
    return sendSuccessResponse(res, result, 'Disasters retrieved successfully');
  } catch (error) {
    console.error('getDisasters error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const approveOrganization = async (req, res) => {
  try {
    const { orgId } = req.params;
    const result = await coordinatorService.approveOrganization(orgId);
    return sendSuccessResponse(res, result, 'Organization approved successfully');
  } catch (error) {
    console.error('approveOrganization error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getAllTeams = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const result = await coordinatorService.getAllTeams(offset, parseInt(limit));
    return sendSuccessResponse(res, result, 'Teams retrieved successfully');
  } catch (error) {
    console.error('getAllTeams error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const assignDisasterToTeam = async (req, res) => {
  try {
    const { error, value } = assignDisasterToTeamSchema.validate(req.body);
    if (error) return sendErrorResponse(res, error.details[0].message, 422);
    
    const result = await coordinatorService.assignDisasterToTeam(value.teamId, value.disasterId);
    return sendSuccessResponse(res, result, 'Disaster assigned to team successfully');
  } catch (error) {
    console.error('assignDisasterToTeam error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getDisasterStats = async (req, res) => {
  try {
    const { disasterId } = req.params;
    const result = await coordinatorService.getDisasterStats(disasterId);
    return sendSuccessResponse(res, result, 'Disaster statistics retrieved successfully');
  } catch (error) {
    console.error('getDisasterStats error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const sendEmergencyNotification = async (req, res) => {
  try {
    const { error, value } = emergencyNotificationSchema.validate(req.body);
    if (error) return sendErrorResponse(res, error.details[0].message, 422);
    
    const result = await coordinatorService.sendEmergencyNotification(value.subject, value.message);
    return sendSuccessResponse(res, result, 'Emergency notification sent successfully');
  } catch (error) {
    console.error('sendEmergencyNotification error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

module.exports = {
  createDisaster,
  getDisasters,
  approveOrganization,
  getAllTeams,
  assignDisasterToTeam,
  getDisasterStats,
  sendEmergencyNotification,
};
