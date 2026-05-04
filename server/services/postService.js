import { Post } from "../models/Post.js";
import { Friendship } from "../models/Friendship.js";

export const createPostService = async (userId, postData) => {
  const { content, imageUrl, visibility } = postData;
  if (!content || content.trim().length === 0) {
    throw new Error("Post content is required");
  }
  const post = await Post.create({
    authorId: userId,
    content: content.trim(),
    imageUrl,
    visibility: visibility || "public",
  });

  return post;
};

export const getPostByIdService = async (userId, postId) => {
  const post = await Post.findById(postId).populate(
    "authorId",
    "name bio avatarUrl",
  );
  if (!post) {
    throw new Error("Post not found");
  }
  const authorId = post.authorId._id.toString();

  if (post.visibility === "public") {
    return post;
  }

  if (post.visibility === "private") {
    if (authorId !== userId) {
      throw new Error("You are not allowed to view this post");
    }
    return post;
  }

  if (post.visibility === "friends") {
    if (authorId === userId) {
      return post;
    }
    const friendship = await Friendship.findOne({
      $or: [
        { userA: userId, userB: authorId },
        { userA: authorId, userB: userId },
      ],
    });
    if (!friendship) {
      throw new Error("You are not allowed to view this post");
    }
    return post;
  }

  return post;
};

export const deletePostService = async (userId, postId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.authorId.toString() !== userId) {
    throw new Error("You are not allowed to delete this post");
  }
  await Post.findByIdAndDelete(postId);

  return { message: "Post deleted successfully" };
};

export const updatePostService = async (userId, postId, postData) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.authorId.toString() !== userId) {
    throw new Error("You are not allowed to edit this post");
  }
  const { content, imageUrl, visibility } = postData;
  if (content !== undefined) {
    if (!content || content.trim().length === 0) {
      throw new Error("Post content cannot be empty");
    }
    post.content = content.trim();
  }
  if (imageUrl !== undefined) {
    post.imageUrl = imageUrl.trim();
  }
  if (visibility !== undefined) {
    post.visibility = visibility;
  }
  await post.save();

  return post;
};

export const getFeedService = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  // friends
  const friendships = await Friendship.find({
    $or: [{ userA: userId }, { userB: userId }],
  });
  const friendIds = friendships.map((f) =>
    f.userA.toString() === userId ? f.userB : f.userA,
  );
  const allowedUserIds = [userId, ...friendIds];

  const posts = await Post.find({
    $or: [
      { visibility: "public" },
      {
        visibility: "friends",
        authorId: { $in: allowedUserIds },
      },
      {
        visibility: "private",
        authorId: userId,
      },
    ],
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("authorId", "name avatarUrl");

  return posts;
};
