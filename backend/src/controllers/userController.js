const User = require("../models/userModel");

const addNewUser = async (userData) => {
  const { email } = userData;
  try {
    const queryUser = await User.findOne({ email });
    if (queryUser) {
      console.log(queryUser);
      return {
        status: false,
        message: "User already exists",
        data: queryUser,
      };
    }
    const newUser = new User(userData); // Changed variable name to "newUser"
    const savedUser = await newUser.save();
    if (savedUser) {
      console.log("Added User successfully");
      return { status: true, message: "Added new User" };
    }
  } catch (err) {
    console.error("Error adding User", err);
    return { status: false, message: "Error adding User" };
  }
};

module.exports = addNewUser;
