const Organization = require("../models/organizationModel");
const User = require("../models/userModel");

const addNewUser = async (userData) => {
  const { email, name } = userData;
  console.log("profile data", userData);
  try {
    const queryUser = await User.findOne({ email });
    if (queryUser) {
      console.log("Conflict with existing user");
      const workspace = await Organization.findOne({
        "owner.userId": queryUser._id,
      });
      return {
        status: true,
        message: "User already exists",
        isExists: true,
        data: {
          userData: queryUser,
          workspaceData: workspace,
        },
      };
    } else {
      if (name) {
        //only create a user if there is name in params
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        if (savedUser) {
          console.log("Added User successfully");
          return { status: true, message: "Added new User", data: savedUser };
        }
      } else {
        return { status: false, message: "User not found" };
      }
    }
  } catch (err) {
    console.error("Error adding User", err);
    return { status: false, message: "Error adding User", error: err };
  }
};

module.exports = addNewUser;
