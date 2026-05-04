import {
  createPostService,
  deletePostService,
  getFeedService,
  getPostByIdService,
  updatePostService,
} from "../services/postService.js";

export const createPostController = async (req, res) => {
  try {
    const post = await createPostService(req.userId, req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    const post = await getPostByIdService(req.userId, req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePostController = async (req, res) => {
  try {
    const result = await deletePostService(req.userId, req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const post = await updatePostService(req.userId, req.params.id, req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFeedController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const posts = await getFeedService(req.userId, page, limit);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
