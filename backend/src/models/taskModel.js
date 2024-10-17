const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    taskAssignedTo: { type: Object, required: true },
    deadLine: { type: Date, required: false },
    isAccepted: { type: Boolean, required: true, default: false },
    isCompleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };

// For Redundency
// taskAssignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },  // Reference to Employee
// Task.find().populate("taskAssignedTo").exec();
