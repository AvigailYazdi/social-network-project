import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { formatUser } from "../utils/formatUser.js";

export const registerUserService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  if (await User.findOne({ email })) {
    throw new Error("User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, passwordHash });

  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    user: formatUser(user),
    token,
  };
};

export const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    user: formatUser(user),
    token,
  };
};

export const getMeService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return formatUser(user);
};

export const updateMeService = async (userId, { name, bio, avatarUrl }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (name !== undefined) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
  await user.save();

  return formatUser(user);
};

export const getPublicUserProfileService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
  };
};

export const getAllPublicUsersService = async () => {
  const users = await User.find().select("name bio avatarUrl createdAt");

  return users.map((user) => ({
    id: user._id,
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
  }));
};
