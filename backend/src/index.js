// @ts-nocheck
const express = require("express");
require("dotenv").config();
const empolyeeRouter = require("./routes/employeeRouter.js");
const taskRouter = require("./routes/taskRouter.js");
const { connectDB } = require("./config/databaseConfig.js");
const multer = require("multer");
const path = require("path");
const { auth } = require("express-openid-connect");
const { config } = require("./middlewares/auth.js");
const { requiresAuth } = require("express-openid-connect");

const port = process.env.DEV_PORT || 8001;

const app = express();
// dotenv config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// these two are protected routes
app.use("/api/v1/employee", requiresAuth(), empolyeeRouter);
app.use("/api/v1/tasks", requiresAuth(), taskRouter);
// todo build the routes

app.get("/auth", (req, res, next) => {
  console.log(req.headers, "auth header");
  res.end();
});

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
