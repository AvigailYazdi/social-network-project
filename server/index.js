import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { verifyToken } from "./middlewares/verifyToken.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { setIO } from "./socket.js";
import cookieParser from "cookie-parser";
import {
  getAllPublicUsersController,
  getMeController,
  getPublicUserProfileController,
  loginUserController,
  logoutUserController,
  registerUserController,
  updateMeController,
} from "./controllers/userController.js";
import {
  acceptFriendRequestController,
  getFriendsController,
  getReceivedFriendRequestsController,
  rejectFriendRequestController,
  removeFriendController,
  sendFriendRequestController,
} from "./controllers/friendController.js";
import {
  createPostController,
  deletePostController,
  getFeedController,
  getPostByIdController,
  updatePostController,
} from "./controllers/postController.js";
import {
  createCommentController,
  deleteCommentController,
  getCommentsByPostController,
  updateCommentController,
} from "./controllers/commentController.js";

const app = express();

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

//USERS
app.post("/api/users/register", registerUserController);

app.post("/api/users/login", loginUserController);

app.post("/api/users/logout", logoutUserController);

app.get("/api/users", getAllPublicUsersController);

app.get("/api/users/me", verifyToken, getMeController);

app.patch("/api/users/me", verifyToken, updateMeController);

app.get("/api/users/:id", getPublicUserProfileController);

// FRIENDS
app.post(
  "/api/friends/request/:userId",
  verifyToken,
  sendFriendRequestController,
);

app.get(
  "/api/friends/requests",
  verifyToken,
  getReceivedFriendRequestsController,
);

app.post(
  "/api/friends/requests/:requestId/accept",
  verifyToken,
  acceptFriendRequestController,
);

app.post(
  "/api/friends/requests/:requestId/reject",
  verifyToken,
  rejectFriendRequestController,
);

app.get("/api/friends", verifyToken, getFriendsController);

app.delete("/api/friends/:userId", verifyToken, removeFriendController);

//POSTS
app.post("/api/posts", verifyToken, createPostController);

app.get("/api/posts/feed", verifyToken, getFeedController);

app.get("/api/posts/:id", verifyToken, getPostByIdController);

app.delete("/api/posts/:id", verifyToken, deletePostController);

app.patch("/api/posts/:id", verifyToken, updatePostController);

//COMMENTS
app.post("/api/posts/:postId/comments", verifyToken, createCommentController);

app.get(
  "/api/posts/:postId/comments",
  verifyToken,
  getCommentsByPostController,
);

app.patch("/api/comments/:commentId", verifyToken, updateCommentController);

app.delete("/api/comments/:commentId", verifyToken, deleteCommentController);

//

app.get("/", (req, res) => {
  res.send("Server is running");
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
    const server = createServer(app);
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
    });
    setIO(io);
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
    });
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

startServer();
