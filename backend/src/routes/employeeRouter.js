const {
  addNewEmployee,
  deleteEmployeeById,
  updateEmployee,
  viewEmployees,
} = require("../controllers/employeeControllers");

const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// to store employee images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    console.log("foobar", req.body.name);
    cb(null, file.fieldname + req.body.employeeNumber);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    // 1 mb max size for the assets:w
    fileSize: 1 * 1024 * 1024,
  },
});

// to add an employee
router.post("/", upload.single("avatar"), async (req, res) => {
  const employeeData = req.body;
  try {
    const result = await addNewEmployee(employeeData);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// view all employees
router.get("/", async (req, res) => {
  const response = await viewEmployees();
  if (response.status) {
    res.status(200).json(response);
  } else {
    res.status(400).json({ status: response.status, error: response.error });
  }
});

// delete an employee by objectid
router.delete("/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  if (!employeeId) {
    return res.status(400).json({ error: "employeeId is required" });
  }
  try {
    const result = await deleteEmployeeById(employeeId);
    if (result.status) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(202).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// to update employee details
router.patch("/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  const updatedEmployeeData = req.body;
  try {
    const result = await updateEmployee(employeeId, updatedEmployeeData);
    res.status(204).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
