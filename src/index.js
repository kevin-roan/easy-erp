// @ts-nocheck
const express = require("express");
const app = express();
const port = 8000;
const empolyeeRouter = require("./routes/employeeRouter.js");
const { connectDB } = require("./config/databaseConfig.js");

app.use("/employee", empolyeeRouter);
// todo build the routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});

//todo
// work on add employees
