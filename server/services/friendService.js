import { User } from "../models/User.js";
import { FriendRequest } from "../models/FriendRequest.js";
import { Friendship } from "../models/Friendship.js";

export const sendFriendRequestService = async (senderId, receiverId) => {
  if (senderId === receiverId) {
    throw new Error("You cannot send a friend request to yourself");
  }
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw new Error("Receiver user not found");
  }
  const existingRequest = await FriendRequest.findOne({
    senderId,
    receiverId,
  });
  if (existingRequest) {
    throw new Error("Friend request already exists");
  }

  const friendRequest = await FriendRequest.create({
    senderId,
    receiverId,
  });

  return friendRequest;
};

export const getReceivedFriendRequestsService = async (userId) => {
  const requests = await FriendRequest.find({
    receiverId: userId,
    status: "pending",
  })
    .populate("senderId", "name avatarUrl")
    .sort({ createdAt: -1 });

  return requests;
};

export const acceptFriendRequestService = async (requestId, userId) => {
  const request = await FriendRequest.findById(requestId);
  if (!request) {
    throw new Error("Friend request not found");
  }
  if (request.receiverId.toString() !== userId) {
    throw new Error("You are not authorized to accept this request");
  }
  if (request.status !== "pending") {
    throw new Error("Request is not pending");
  }

  request.status = "accepted";
  await request.save();

  // ensure consistent order
  const userA =
    request.senderId.toString() < request.receiverId.toString()
      ? request.senderId
      : request.receiverId;

  const userB =
    request.senderId.toString() < request.receiverId.toString()
      ? request.receiverId
      : request.senderId;

  const friendship = await Friendship.create({
    userA,
    userB,
  });

  return friendship;
};

export const rejectFriendRequestService = async (requestId, userId) => {
  const request = await FriendRequest.findById(requestId);
  if (!request) {
    throw new Error("Friend request not found");
  }
  if (request.receiverId.toString() !== userId) {
    throw new Error("You are not authorized to reject this request");
  }
  if (request.status !== "pending") {
    throw new Error("Request is not pending");
  }

  request.status = "rejected";
  await request.save();

  return { message: "Friend request rejected" };
};

export const getFriendsService = async (userId) => {
  const friendships = await Friendship.find({
    $or: [{ userA: userId }, { userB: userId }],
  })
    .populate("userA", "name avatarUrl bio")
    .populate("userB", "name avatarUrl bio")
    .sort({ createdAt: -1 });

  const friends = friendships.map((friendship) => {
    const userA = friendship.userA;
    const userB = friendship.userB;
    return userA._id.toString() === userId ? userB : userA;
  });

  return friends;
};

export const removeFriendService = async (userId, friendId) => {
  if (userId === friendId) {
    throw new Error("You cannot remove yourself");
  }
  const userA = userId < friendId ? userId : friendId;
  const userB = userId < friendId ? friendId : userId;
  const friendship = await Friendship.findOneAndDelete({
    userA,
    userB,
  });
  if (!friendship) {
    throw new Error("Friendship not found");
  }

  return { message: "Friend removed successfully" };
};
