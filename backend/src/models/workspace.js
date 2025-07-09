const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // The user who created the workspace (workspace owner)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // store workspace image / logo path.
    avatar: {
      type: String,
      default: null,
    },

    // metadata
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports = Workspace;
