import { useState, useEffect } from "react";
import { UserService } from "../services/UserService";
import type {
  UserProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "../types/UserProfile";

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const userProfile = await UserService.getProfile();
      setProfile(userProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    data: UpdateProfileRequest
  ): Promise<boolean> => {
    try {
      setError(null);
      const updatedProfile = await UserService.updateProfile(data);
      setProfile(updatedProfile);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      return false;
    }
  };

  const changePassword = async (
    data: ChangePasswordRequest
  ): Promise<boolean> => {
    try {
      setError(null);
      await UserService.changePassword(data);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to change password"
      );
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    changePassword,
  };
};
