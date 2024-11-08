const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    taskAssignedTo: { type: Array, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    isAccepted: { type: Boolean, required: true, default: false },
    isCompleted: { type: Boolean, required: true, default: false },
    assignedTo: [
      {
        username: { type: String, required: false },
        email: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

// For Redundency
// taskAssignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },  // Reference to Employee
// Task.find().populate("taskAssignedTo").exec();
