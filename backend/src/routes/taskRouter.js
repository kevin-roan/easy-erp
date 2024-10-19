const express = require("express");
const {
  assignTasktoEmployee,
  viewAlltasks,
  deleteTaskById,
  getEmployeeTasks,
  updateTask,
} = require("../controllers/taskController");
const router = express.Router();

// get all tasks
router.get("/", async (req, res) => {
  try {
    const result = await viewAlltasks();
    if (result.status) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(400).json({ status: false, error: error });
  }
});

// add new task
router.post("/", async (req, res) => {
  const taskData = req.body;
  // task data contains all the information , assiged to, task name etc.
  try {
    const result = await assignTasktoEmployee(taskData);
    res.status(200).json({ status: result.status, message: result.message });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

// delete a task
router.delete("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    return res.status(400).json({ error: "TaskId is required" });
  }
  try {
    const result = await deleteTaskById(taskId);
    console.log("result", result);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// get tasks that are assigned for a particular employee,

router.get("/employee/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const result = await getEmployeeTasks(employeeId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const updatedData = req.body;
  console.log(updatedData, "jsondata updated");
  try {
    const result = await updateTask(taskId, updatedData);
    if (result.status) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error });
  }
});

module.exports = router;
