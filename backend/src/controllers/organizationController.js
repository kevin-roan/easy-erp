const Organization = require("../models/organizationModel");

// add an organization
const addOrganization = async (orgData) => {
  try {
    const organization = new Organization(orgData);
    const savedOrganization = await organization.save();
    if (savedOrganization) {
      console.log("created new organization");
      return {
        status: true,
        message: "Created new Organization",
        result: savedOrganization,
      };
    }
  } catch (error) {
    console.error("Error creating organization", error);
    return { status: false, message: `Error creating Organization, ${error}` };
  }
};

module.exports = { addOrganization };
