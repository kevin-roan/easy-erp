const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    // status: {
    //   type: String,
    //   enum: ["Invited", "Active"],
    //   default: "Invited",
    // },
    //
    defaultWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

// mongodb creates a sorted b-tree for fast lookup to avoid email duplications
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
