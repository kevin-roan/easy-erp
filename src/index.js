// @ts-nocheck
const express = require("express");
const app = express();
const port = 8000;
const userRouter = require("./routes/userRoutes.js");
const { connectDB } = require("./config/databaseConfig.js");

app.use("/employee", userRouter);
// todo build the routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
