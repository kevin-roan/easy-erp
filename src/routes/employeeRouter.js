const express = require("express");
const {
  addNewEmployee,
  deleteEmployeeById,
  updateEmployee,
} = require("../controllers/employeeControllers");

const router = express.Router();

// to add an employee
router.post("/", async (req, res) => {
  const { employeeData } = req.body;
  try {
    const result = await addNewEmployee(employeeData);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// to delete an employee

router.delete("/", async (req, res) => {
  const { employeeId } = req.body;
  try {
    const result = await deleteEmployeeById(employeeId);
    res.status(204).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// to update employee details
router.patch("/", async (req, res) => {
  const { employeeData } = req.body;
  try {
    const result = await updateEmployee(employeeData);
    res.status(204).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
