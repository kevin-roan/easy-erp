const Task = require("../models/taskModel");

const assignTasktoEmployee = async (taskData) => {
  try {
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    if (savedTask) {
      return { status: true, message: "Task assinged sucessfully" };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

const deleteTaskById = async (taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (deletedTask) {
      return { status: true, message: "Task deleted sucessfully" };
    } else {
      return { status: false, message: "Task not found" };
    }
  } catch (error) {
    console.log("Error deleting task", error);
    return { status: false, message: "Error deleting task" };
  }
};

const viewAlltasks = async () => {
  try {
    const result = await Task.find();
    return { status: true, result: result };
  } catch (error) {
    return { status: false, message: error };
  }
};

const getEmployeeTasks = async (employeeId) => {
  try {
    const result = await Task.find({
      taskAssignedTo: employeeId,
    });
    return { status: true, result: result };
  } catch (error) {
    return { status: false, error: error };
  }
};

// update tasks; isComplete true/false, isAccepted true/false
const updateTask = async (taskId, updatedTaskData) => {
  try {
    const result = await Task.findByIdAndUpdate(
      { _id: taskId },
      { $set: updatedTaskData },
      { new: true }, // returns the updated document
    );
    if (result) {
      return { status: true, message: "Updated Tasks", result: result };
    }
  } catch (error) {
    return { status: false, message: `Failed to update tasks ${error}` };
  }
};

module.exports = {
  assignTasktoEmployee,
  deleteTaskById,
  viewAlltasks,
  getEmployeeTasks,
  updateTask,
};
