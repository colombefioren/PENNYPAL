import { DefaultService } from "../api/services/DefaultService";
import { useMascotStore } from "../stores/mascotStore";
import type { ChangePasswordRequest, UpdateProfileRequest, UserProfile } from "../types/UserProfile";

export class UserService {
  // GET user profile
  static async getProfile() {
    try {
      const response = await DefaultService.getUserProfile();
      useMascotStore.getState().setExpression("success");
      return response as UserProfile;
    } catch (error) {
      useMascotStore.getState().setExpression("error");
      console.error("Error fetching user profile:", error);
      throw new Error("Failed to fetch user profile");
    }
  }

  //UPDATE user profile
  static async updateProfile(profileData: UpdateProfileRequest) {
    try {
      const response = await DefaultService.putUserProfile(profileData);
      useMascotStore.getState().setExpression("success");
      return response as UserProfile;
    } catch (error) {
      useMascotStore.getState().setExpression("error");
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile");
    }
  }

  //CHANGE password
  static async changePassword(passwordData: ChangePasswordRequest) {
    try {
      const response = await DefaultService.patchUserProfilePassword(
        passwordData
      );
      useMascotStore.getState().setExpression("success");
      return response;
    } catch (error) {
      useMascotStore.getState().setExpression("error");
      console.error("Error changing password:", error);
      throw new Error("Failed to change password");
    }
  }
}
