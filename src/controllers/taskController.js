const Task = require("../models/taskModel");

const assignTasktoEmployee = async (taskData, employeeId) => {
  try {
    const newTask = new Task({
      taskName: taskData.taskName,
      taskAssignedTo: employeeId,
      deadLine: taskData.deadLine,
      isAccepted: taskData.isAccepted,
      isCompleted: taskData.isCompleted,
    });
    const savedTask = await newTask.save();
    if (savedTask) {
      return { status: true, message: "Task assinged sucessfully" };
    }
  } catch (error) {
    return {
      status: false,
      messge: "Failed to assing task",
      error: error.message,
    };
  }
};

const deleteTask = async (taskId) => {
  try {
    const deletedTask = Task.findByIdAndDelete(taskId);
    if (deletedTask) {
      return { status: true, message: "Task deleted sucessfully" };
    }
  } catch (error) {
    console.log("Error deleting task", error);
    return { status: false, message: "Error deleting task" };
  }
};

module.exports = { assignTasktoEmployee, deleteTask };
