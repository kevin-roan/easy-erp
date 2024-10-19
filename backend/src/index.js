// @ts-nocheck
const express = require("express");
const empolyeeRouter = require("./routes/employeeRouter.js");
const taskRouter = require("./routes/taskRouter.js");
const { connectDB } = require("./config/databaseConfig.js");
const multer = require("multer");
const path = require("path");

const port = 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/employee", empolyeeRouter);
app.use("/api/v1/tasks", taskRouter);
// todo build the routes

// not found middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
