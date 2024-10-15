const express = require("express");
const {
  addNewEmployee,
  deleteEmployeeById,
  updateEmployee,
  viewEmployees,
} = require("../controllers/employeeControllers");

const router = express.Router();

// view all employees
router.get("/", async (req, res) => {
  const response = await viewEmployees();
  if (response.status) {
    res.status(200).json(response);
  } else {
    res.status(400).json({ status: response.status, error: response.error });
  }
});

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
