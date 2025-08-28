import {
  updateUserProfile,
  changeUserPassword,
  getPublicUser,
} from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError } from "../utils/errors.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await getPublicUser(req.user.user_id);
  return res.json(user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { firstname, lastname, username } = req.body;

  if (!firstname && !lastname && !username) {
    throw new BadRequestError("At least one field is required for update");
  }

  const user = await updateUserProfile(req.user.user_id, {
    firstname,
    lastname,
    username,
  });
  return res.json(user);
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new BadRequestError("Current password and new password are required");
  }

  if (
    !isStrongPassword(String(newPassword), {
      minLength: 6,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    throw new BadRequestError(
      "New password must be at least 6 characters and include at least one uppercase letter and one number"
    );
  }

  const result = await changeUserPassword(req.user.user_id, {
    currentPassword,
    newPassword,
  });
  return res.json(result);
});
