const mongoose = require("mongoose");

const workspaceMembershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate memberships
workspaceMembershipSchema.index(
  { userId: 1, workspaceId: 1 },
  { unique: true },
);

const WorkspaceMembership = mongoose.model(
  "WorkspaceMembership",
  workspaceMembershipSchema,
);
module.exports = WorkspaceMembership;
