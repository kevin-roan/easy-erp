const express = require("express");
const {
  assignTasktoEmployee,
  viewAlltasks,
} = require("../controllers/taskController");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = viewAlltasks();
  res.status(200).send(result);
});

router.post("/", async (req, res) => {
  const { taskData, employeeId } = req.body;
  try {
    const result = await assignTasktoEmployee(taskData, employeeId);
    res.send(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
