const mongoose = require("mongoose");

// Define the schema for a team
const teamSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true, // Automatically generate an ObjectId
  },
  teamName: {
    type: String,
    required: true,
  },
});

// Define the schema for a participant
const participantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

// Define the main organization schema
const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    username: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Inactive",
  },
  teams: [teamSchema],
  participants: [participantSchema],
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
