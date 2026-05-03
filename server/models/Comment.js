import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Comments per post (newest first)
commentSchema.index({ postId: 1, createdAt: -1 });

export const Comment = mongoose.model("Comment", commentSchema);