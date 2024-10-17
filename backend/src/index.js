// @ts-nocheck
const express = require("express");
const port = 8000;
const empolyeeRouter = require("./routes/employeeRouter.js");
const { connectDB } = require("./config/databaseConfig.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/employee", empolyeeRouter);
// todo build the routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});

//todo
// work on add employees
