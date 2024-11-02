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

// Define the schema for the owner
const ownerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/, // Basic email validation
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
    type: ownerSchema, // Embed the owner schema
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"], // Restrict status values
    default: "Inactive", // Default status
  },
  teams: [teamSchema], // Array of team schemas
  participants: [participantSchema], // Array of participant schemas
});

// Create the model
const Organization = mongoose.model("Organization", organizationSchema);

// Export the model
module.exports = Organization;
