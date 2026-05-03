import {
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
    res.status(201).json(result);
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
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
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
