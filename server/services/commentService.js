import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";
import { Friendship } from "../models/Friendship.js";

export const createCommentService = async (userId, postId, content) => {
  if (!content || content.trim().length === 0) {
    throw new Error("Comment content is required");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.visibility === "private") {
    throw new Error("You are not allowed to comment on this post");
  }
  if (post.authorId.toString() === userId) {
    throw new Error("You cannot comment on your own post");
  }
  const friendship = await Friendship.findOne({
    $or: [
      { userA: userId, userB: post.authorId },
      { userA: post.authorId, userB: userId },
    ],
  });
  if (!friendship) {
    throw new Error("You can comment only on friends posts");
  }
  const comment = await Comment.create({
    postId,
    authorId: userId,
    content: content.trim(),
  });

  return comment;
};

export const getCommentsByPostService = async (userId, postId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.visibility === "private" && post.authorId.toString() !== userId) {
    throw new Error("You are not allowed to view comments");
  }
  if (post.visibility === "friends") {
    if (post.authorId.toString() !== userId) {
      const friendship = await Friendship.findOne({
        $or: [
          { userA: userId, userB: post.authorId },
          { userA: post.authorId, userB: userId },
        ],
      });
      if (!friendship) {
        throw new Error("You are not allowed to view comments");
      }
    }
  }
  const comments = await Comment.find({ postId })
    .sort({ createdAt: -1 })
    .populate("authorId", "name avatarUrl");

  return comments;
};

export const updateCommentService = async (userId, commentId, content) => {
  if (!content || content.trim().length === 0) {
    throw new Error("Comment content cannot be empty");
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  if (comment.authorId.toString() !== userId) {
    throw new Error("You are not allowed to edit this comment");
  }
  comment.content = content.trim();
  await comment.save();

  return comment;
};

export const deleteCommentService = async (userId, commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  if (comment.authorId.toString() !== userId) {
    throw new Error("You are not allowed to delete this comment");
  }
  await Comment.findByIdAndDelete(commentId);

  return { message: "Comment deleted successfully" };
};
