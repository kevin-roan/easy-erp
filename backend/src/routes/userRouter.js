const express = require("express");
const addNewUser = require("../controllers/userController");

const router = express.Router();

router.post("/", async (req, res) => {
  const userData = req.body;
  if (!userData) {
    res.status(401).json({ status: false, message: "User data is required" });
  }
  try {
    const result = await addNewUser(userData);
    res.status(200).send(result);
    res.end();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
