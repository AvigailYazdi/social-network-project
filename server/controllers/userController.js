import {
  getAllPublicUsersService,
  getMeService,
  getPublicUserProfileService,
  loginUserService,
  registerUserService,
  updateMeService,
} from "../services/userService.js";

export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUserService({ name, email, password });
    const { user, token } = result;
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService({ email, password });
    const { user, token } = result;
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const logoutUserController = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getMeController = async (req, res) => {
  try {
    const user = await getMeService(req.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateMeController = async (req, res) => {
  try {
    const updatedUser = await updateMeService(req.userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getPublicUserProfileController = async (req, res) => {
  try {
    const user = await getPublicUserProfileService(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getAllPublicUsersController = async (req, res) => {
  try {
    const users = await getAllPublicUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
