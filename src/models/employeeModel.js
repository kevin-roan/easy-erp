const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    employeeNumber: { type: String || Number, required: true },
    companyName: { type: String, required: true },
    phoneNumber: { type: String || Number, required: false },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee };
