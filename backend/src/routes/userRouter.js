const express = require("express");
const addNewUser = require("../controllers/userController");

const router = express.Router();

router.post("/", async (req, res) => {
  const userData = req.body;
  console.log("userdata ", userData);
  if (!userData) {
    return res
      .status(401)
      .json({ status: false, message: "User data is required" });
  }
  try {
    const result = await addNewUser(userData);
    if (result.isExists) {
      return res.status(200).json(result); // conflict
    }
    return res.status(201).json(result); // created
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Server error", error });
  }
});

module.exports = router;
