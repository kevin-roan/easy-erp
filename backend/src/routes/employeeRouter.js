const express = require("express");
const clc = require("cli-color");

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
  console.log(clc.red("This is an error message!"));
  console.log(req.body, "content body");
  const employeeData = req.body;
  try {
    const result = await addNewEmployee(employeeData);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete an employee by objectid
router.delete("/", async (req, res) => {
  const { employeeId } = req.body;
  console.log(clc.red("employee id", employeeId));

  if (!employeeId) {
    return res.status(400).json({ error: "employeeId is required" });
  }
  try {
    const result = await deleteEmployeeById(employeeId);
    if (result.status) {
      res.status(204).json({ message: result.message });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
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
