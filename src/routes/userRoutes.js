const express = require("express");

const router = express.Router();

router.get("/1", (req, res, next) => {
  res.send("Response from router");
});

module.exports = router;
