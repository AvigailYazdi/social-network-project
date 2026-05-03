import {
  acceptFriendRequestService,
  getFriendsService,
  getReceivedFriendRequestsService,
  rejectFriendRequestService,
  removeFriendService,
  sendFriendRequestService,
} from "../services/friendService.js";

export const sendFriendRequestController = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.userId;
    const friendRequest = await sendFriendRequestService(senderId, receiverId);
    res.status(201).json(friendRequest);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getReceivedFriendRequestsController = async (req, res) => {
  try {
    const requests = await getReceivedFriendRequestsService(req.userId);
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const acceptFriendRequestController = async (req, res) => {
  try {
    const friendship = await acceptFriendRequestService(
      req.params.requestId,
      req.userId,
    );
    res.status(201).json(friendship);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const rejectFriendRequestController = async (req, res) => {
  try {
    const result = await rejectFriendRequestService(
      req.params.requestId,
      req.userId,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getFriendsController = async (req, res) => {
  try {
    const friends = await getFriendsService(req.userId);
    res.status(200).json(friends);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const removeFriendController = async (req, res) => {
  try {
    const result = await removeFriendService(req.userId, req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
