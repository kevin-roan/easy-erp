const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    status: { type: String, required: false, default: "Invited" }, // invited or active
    // device token is removed, use redis for storing exponent tokens.
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId, // after the workspace creation
      required: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
