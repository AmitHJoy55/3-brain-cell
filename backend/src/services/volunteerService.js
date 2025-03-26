const { AppDataSource } = require('../config/database');
const Volunteer = require('../models/Volunteer');
const Organization = require('../models/Organization');
const Disaster = require('../models/Disaster');

const applyToOrganization = async (organizationId, volunteerId) => {
  const organizationRepository = AppDataSource.getRepository(Organization);
  const volunteerRepository = AppDataSource.getRepository(Volunteer);
  const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
  
  const organization = await organizationRepository.findOne({ where: { organization_id: organizationId } });
  if (!organization) {
    throw new OrganizationNotFoundError();
  }
  
  const volunteer = await volunteerRepository.findOne({ where: { user: { userId: volunteerId } } });
  if (!volunteer) {
    const error = new Error('Only volunteers can apply');
    error.statusCode = 403;
    throw error;
  }
  
  const newApplication = applicationRepository.create({
    volunteer: { volunteer_id: volunteer.volunteer_id },
    organization: { organization_id: organization.organization_id },
    status: 'pending'
  });
  
  const savedApplication = await applicationRepository.save(newApplication);
  return savedApplication;
};


const getOrganizationsForVolunteer = async (volunteerId) => {
  const volunteerRepository = AppDataSource.getRepository(Volunteer);
  const volunteer = await volunteerRepository.findOne({
    where: { user: { userId: volunteerId } },
    relations: ['organization'],
  });
  if (!volunteer) {
    const error = new Error('Volunteer not found');
    error.statusCode = 404;
    throw error;
  }

  const organizationRepository = AppDataSource.getRepository(Organization);
  const organizations = await organizationRepository.find({
    where: { approval_status: true },
  });

  const availableOrganizations = organizations
    .filter((org) => !volunteer.organization || org.organization_id !== volunteer.organization.organization_id)
    .map((org) => ({
      organization_id: org.organization_id,
      organization_name: org.organization_name,
      type: org.type,
      sector: org.sector,
      mission: org.mission,
    }));

  return availableOrganizations;
};


const getOngoingDisasters = async () => {
  const disasterRepository = AppDataSource.getRepository(Disaster);
  const disasters = await disasterRepository.find({
    where: { status: 'OPEN' }
  });
  if (disasters.length === 0) {
    const error = new Error('No ongoing disasters found');
    error.statusCode = 404;
    throw error;
  }
  return disasters.map(disaster => ({
    disaster_id: disaster.disaster_id,
    title: disaster.title,
    description: disaster.description,
    location: disaster.location,
    startDate: disaster.startDate,
    status: disaster.status,
    createdAt: disaster.createdAt,
  }));
};

module.exports = {
  getOrganizationsForVolunteer,
  getOngoingDisasters,
  applyToOrganization
};
