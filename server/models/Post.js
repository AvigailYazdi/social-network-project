import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
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
      maxlength: 1000,
    },

    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },

    visibility: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "public",
    },
  },
  {
    timestamps: true,
  },
);

// Feed queries: newest posts first by author
postSchema.index({ authorId: 1, createdAt: -1 });

export const Post = mongoose.model("Post", postSchema);
