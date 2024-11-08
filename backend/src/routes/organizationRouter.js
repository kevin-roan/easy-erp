const express = require("express");
const { addOrganization } = require("../controllers/organizationController");

const router = express.Router();

// fetch organization data from route
router.post("/", async (req, res) => {
  console.log("getting requat on workspace dire");
  const orgData = req.body;
  console.log("org data", orgData);
  if (!orgData) {
    return res
      .status(401)
      .json({ status: false, message: "Organization Details are required" });
  }
  try {
    const result = await addOrganization(orgData);
    if (result.status) {
      return res.status(200).json(result); // successfull
    } else {
      return res.status(404).json(result); // error
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: false, message: `Error adding organization ${error}` });
  }
});

module.exports = router;
