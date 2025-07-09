// @ts-nocheck
const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/userRouter.js");
const empolyeeRouter = require("./routes/employeeRouter.js");
const taskRouter = require("./routes/taskRouter.js");
const organizationRouter = require("./routes/organizationRouter.js");
const { connectDB } = require("./config/databaseConfig.js");
const multer = require("multer");
const path = require("path");
const { auth } = require("express-openid-connect");
const { config } = require("./middlewares/auth.js");
const { requiresAuth } = require("express-openid-connect");
const jwtCheck = require("./middlewares/verifyJwt.js");
const session = require("express-session");

const port = process.env.DEV_PORT || 8001;

const app = express();

// =================================== MIDDLEWARES ======================================
// authorization for all routes
// app.use(jweMiddleware);
// temporarly disabled jwt check for all routes,
// app.use(jwtCheck);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(
    "----------------------------------------------------------------------------------------------",
  );
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true if using HTTPS
  }),
);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// =============================== MIDDLEWARES END ======================================

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// protected route for testing purpose, in production client directly connects to auth0
// // app.use("/api/v1/employee", requiresAuth(), empolyeeRouter);
// app.use("/api/v1/tasks", requiresAuth(), taskRouter);
// todo build the routes

app.use("/api/v1/user", jwtCheck, userRouter);
app.use("/api/v1/organization", organizationRouter);
app.use("/api/v1/employee", jwtCheck, empolyeeRouter);
app.use("/api/v1/tasks", jwtCheck, taskRouter);
app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

// not found middleware
app.use((error, req, res, next) => {
  console.log("validation error", error);
  res.status(404).json({
    success: false,
    message: `Resource not found ${error}`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
