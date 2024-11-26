const Organization = require("../models/organizationModel");
const User = require("../models/userModel");
const { addOrganization } = require("./organizationController");
const { createTeam } = require("./teamController");
const addNewUser = require("./userController");

const signupUser = async (userData) => {
  const { name, email, participants, workspaceName, teamName } = userData;
  // create a user
  const userInfo = { name, email };
  const user = await addNewUser(userInfo);
  const userId = user.data._id;
  console.log("userId", userId);
  // create a workspace
  const workspaceInfo = {
    workspaceName,
    owner: {
      // append userid to workspace
      userId,
      userName: name,
      userEmail: email,
    },
    participants,
  };
  console.log("workspaceinfo", workspaceInfo);
  const workspace = await addOrganization(workspaceInfo);
  if (workspace) {
    console.log("crateed workspcae with id", workspace.result._id);
    // append the workspaceid to the user document
    const updatedUser = await User.updateOne(
      { email },
      {
        $set: {
          workspaceId: workspace.result._id,
        },
      },
    );
    console.log("updated user data with workspcae id", updatedUser);
  }
  // create a team.
  // // should have  teamname, paritcipants email, moderators ( objectid of user)
  const teamData = {
    teamName,
    userId,
  };
  const team = await createTeam(teamData);
  if (team.status) {
    console.log("Created team", team.result);
  }

  // set the team id to workspace doc as an array
  const updateWorkspaceWithTeamId = await Organization.updateOne(
    { _id: workspace.result._id },
    {
      $push: {
        teams: {
          teamId: team.result._id,
          teamName: team.result.teamName,
        },
      },
    },
  );

  console.log("team name from result", team.result.teamName);

  if (updateWorkspaceWithTeamId) {
    console.log(
      "updated the workspace with the team ID",
      updateWorkspaceWithTeamId,
    );
  }
  // combine everything and send it to the client application.
};

module.exports = signupUser;
