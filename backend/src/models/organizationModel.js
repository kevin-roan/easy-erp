const mongoose = require("mongoose");

// Define the schema for a team
const teamSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    auto: true, // Automatically generate an ObjectId
  },
  teamName: {
    type: String,
    required: false,
  },
});

// Define the main organization schema
const organizationSchema = new mongoose.Schema({
  workspaceName: {
    type: String,
    required: true,
  },
  owner: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  // status: {
  //   type: String,
  //   enum: ["Active", "Inactive"],
  //   default: "Inactive",
  // },
  teams: [teamSchema],
  participants: [
    (email = {
      type: String,
      required: false,
    }),
  ],
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
