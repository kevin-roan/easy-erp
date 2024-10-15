const { Employee } = require("../models/employeeModel");

const viewEmployees = async () => {
  try {
    const employees = await Employee.find({});
    return { status: true, result: employees };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

const addNewEmployee = async (employeeData) => {
  try {
    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();
    if (savedEmployee) {
      console.log("Added employee successfully");
      return { status: true, message: "Added new employee" };
    }
  } catch (err) {
    console.error("Error adding employee", err);
    return { status: false, message: "Error adding employee" };
  }
};

const deleteEmployeeById = async (employeeId) => {
  const deleteEmployee = await Employee.findByIdAndDelete(employeeId);
  if (deleteEmployee) {
    return { status: true, message: "Employee deleted successfully" };
  } else {
    return { status: false, message: "Error deleting employee" };
  }
};

const updateEmployee = async (employeeData) => {
  const employeeId = employeeData.id;
  const updatedEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    employeeData,
  );
  if (updatedEmployee) {
    return { status: true, message: "Employee updated successfully" };
  } else {
    return { status: false, messge: "Error updating employee" };
  }
};

module.exports = {
  addNewEmployee,
  deleteEmployeeById,
  updateEmployee,
  viewEmployees,
};
