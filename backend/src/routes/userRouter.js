const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  // dummy verification,
  if (req.query.email === "kevinroan@gmail.com") {
    console.log("user exists");
    res.status(200).json({ status: "success", isExists: true });
  } else {
    console.log("user not found");
    res.status(200).json({ status: "success", isExists: false });
  }
});

module.exports = router;
