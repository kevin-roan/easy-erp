const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("auth header", req.auth, req.query);
  // check the email against users organization.participants doc
  res.send("create user profile");
});

module.exports = router;
