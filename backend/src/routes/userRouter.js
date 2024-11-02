const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  console.log("auth header", req.auth);
  res.send("create user profile");
});

module.exports = router;
