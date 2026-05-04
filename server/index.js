import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { verifyToken } from "./middlewares/verifyToken.js";
import {
  getMeController,
  getPublicUserProfileController,
  loginUserController,
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
import { createPostController, deletePostController, getFeedController, getPostByIdController, updatePostController } from "./controllers/postController.js";

const app = express();

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

//USERS
app.post("/api/users/register", registerUserController);

app.post("/api/users/login", loginUserController);

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


//

app.get("/", (req, res) => {
  res.send("Server is running");
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

startServer();
