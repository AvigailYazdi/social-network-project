import {
  createCommentService,
  deleteCommentService,
  getCommentsByPostService,
  updateCommentService,
} from "../services/commentService.js";
import { getIO } from "../socket.js";

export const createCommentController = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await createCommentService(
      req.userId,
      req.params.postId,
      content,
    );
    const io = getIO();
    io.emit("newComment", comment);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentsByPostController = async (req, res) => {
  try {
    const comments = await getCommentsByPostService(
      req.userId,
      req.params.postId,
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCommentController = async (req, res) => {
  try {
    const comment = await updateCommentService(
      req.userId,
      req.params.commentId,
      req.body.content,
    );
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const result = await deleteCommentService(req.userId, req.params.commentId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
