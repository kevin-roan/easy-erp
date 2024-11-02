const express = require("express");
const { addOrganization } = require("../controllers/organizationController");

const router = express.Router();

// fetch organization data from route
router.get("/", (req, res) => {
  console.log("workspace route");
  addOrganization();
  res.end();
});

module.exports = router;
