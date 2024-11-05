const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    active: { type: String, required: false, default: "Invited" }, // invited or active
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
