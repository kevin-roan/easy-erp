const User = require("../models/userModel");

const addNewUser = async (userData) => {
  const { email } = userData;
  console.log("email of user", email);
  try {
    const queryUser = await User.findOne({ email });
    if (queryUser) {
      console.log(queryUser);
      return {
        status: "success",
        message: "User already exists",
        isExists: true,
        data: queryUser,
      };
    } else if (userData.name) {
      // if the userData does not have the user name or any other info than the email, create a user
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      if (savedUser) {
        console.log("Added User successfully");
        return { status: true, message: "Added new User" };
      }
    } else {
      return {
        status: true,
        isExists: false,
        message: "User does not exists please create a profile",
      };
    }
  } catch (err) {
    console.error("Error adding User", err);
    return { status: false, message: "Error adding User" };
  }
};

module.exports = addNewUser;
