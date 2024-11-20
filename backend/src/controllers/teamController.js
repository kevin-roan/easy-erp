const Team = require("../models/teamModel");

// create a new team
const createTeam = async (teamData) => {
  try {
    // check for team conflict (this is for standelon team creation, not for signup)
    const queryTeam = await Team.findOne({
      teamName: teamData.teamName,
    });
    if (queryTeam) {
      return {
        status: true,
        message: "Team Already Exits",
        result: queryTeam,
      };
    }

    // create a new team
    const team = new Team({
      teamName: teamData.teamName,
      moderators: [teamData.userId],
    });
    const savedTeam = await team.save();
    if (savedTeam) {
      console.log("Created new team");
      return {
        status: true,
        message: "Created new team",
        result: savedTeam,
      };
    }
  } catch (error) {
    console.error("Error creating team", error);
    return {
      status: false,
      message: `Error creating team, ${error}`,
    };
  }
};

module.exports = { createTeam };
