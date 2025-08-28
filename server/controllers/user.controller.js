import {
  updateUserProfile,
  changeUserPassword,
  getPublicUser,
} from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await getPublicUser(req.user.user_id);
  return res.json(user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { firstname, lastname, username } = req.body;

  const user = await updateUserProfile(req.user.user_id, {
    firstname,
    lastname,
    username,
  });
  return res.json(user);
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const result = await changeUserPassword(req.user.user_id, {
    currentPassword,
    newPassword,
  });
  return res.json(result);
});
