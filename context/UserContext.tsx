"use client";

import { FullProfile } from "@/schemas/profileSchema";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

interface UpdateProfilePayload {
  username: string;
  email: string;
  phone?: string;
  location?: string;
  position?: string;
  department?: string;
  bio?: string;
  avatar?: string;
  userActiveStatus?: "active" | "inactive" | "onleave";
}

const profilePayload: FullProfile = {
  _id: "",
  username: "",
  userStatus: "",
  email: "",
  phone: "",
  location: "",
  position: "",
  department: "",
  bio: "",
  avatar: "",
  createdAt: "",
  companyName: "",
  userActiveStatus: "active",
  tasksAssigned: 0,
  tasksCompleted: 0,
  performanceRating: 0,
};

interface UserContextType {
  updateProfile: (data: UpdateProfilePayload) => Promise<void>;
  changePassword: (data: ChangePasswordPayload) => Promise<void>;
  profile: FullProfile;
  organizationStaffs: FullProfile[];
  loadingOrgStaffs: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const [organizationStaffs, setOrganizationStaffs] = useState([]);
  const [loadingOrgStaffs, setLoadingOrgStaffs] = useState(false);
  const [profile, setProfile] = useState<FullProfile>(profilePayload);

  //GET USERS BY ORGANIZATION
  const organizationId = user?.organizationId;
  useEffect(() => {
    if (!organizationId) {
      console.log("No organizationId available yet");
      return;
    }

    const fetchOrganizationUsers = async () => {
      setLoadingOrgStaffs(true);

      try {
        const res = await fetch(`/api/organizations/${organizationId}/users`);

        if (!res.ok) {
          throw new Error("Failed to fetch organization users");
        }

        const data = await res.json();
        setOrganizationStaffs(data.users);
        console.log("Organization users:", data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching organization users:", error);
      } finally {
        setLoadingOrgStaffs(false);
      }
    };

    fetchOrganizationUsers();
  }, [organizationId]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch("/api/profile");

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        if (!data?.user) {
          throw new Error("User not found");
        }

        setProfile(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // optional: set error state here
      }
    };

    getProfile();
  }, []);

  const updateProfile = async (data: UpdateProfilePayload) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update profile");
      }

      return result;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  const changePassword = async (data: ChangePasswordPayload) => {
    try {
      const res = await fetch("/api/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to change password");
      }

      return result;
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        updateProfile,
        changePassword,
        profile,
        organizationStaffs,
        loadingOrgStaffs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
