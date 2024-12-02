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
  const workspaceId = req.query;
  try {
    const result = await viewAlltasks(workspaceId);
    if (result.status) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(400).json({ status: false, error: error });
  }
});

// get all tasks that are not accepted

// add new task
router.post("/", async (req, res) => {
  const taskData = req.body;
  // task data contains all the information , assiged to, task name etc.
  try {
    const result = await assignTasktoEmployee(taskData);
    return res
      .status(200)
      .json({ status: result.status, message: result.message });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
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
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// get tasks that are assigned for a particular employee,
router.get("/employee/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const result = await getEmployeeTasks(employeeId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.patch("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const updatedData = req.body;
  if (Object.keys(updatedData).length === 0) {
    // if no data is provided,
    return res.status(404).json({ status: false, error: "No data provided" });
  }
  try {
    const result = await updateTask(taskId, updatedData);
    if (result.status) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ status: false, error: error });
  }
});

module.exports = router;
