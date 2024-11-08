const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    auto: true,
  },
  teamName: {
    type: String,
    required: true,
  },
});

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

const moderatorSchema = new mongoose.Schema({
  moderatorEmail: {
    type: String,
    required: false,
  },
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  moderators: [moderatorSchema],
  participants: [participantSchema],
  tasks: [tasksSchema],
});
const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
