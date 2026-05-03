import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema(
  {
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate friendships (A-B and B-A)
friendshipSchema.index({ userA: 1, userB: 1 }, { unique: true });

export const Friendship = mongoose.model("Friendship", friendshipSchema);
