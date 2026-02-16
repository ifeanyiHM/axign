"use client";

import { FullProfile } from "@/schemas/profileSchema";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Task } from "./TaskContext";

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
  getProfile: () => Promise<void>;
  fetchOrganizationUsers: () => Promise<void>;
  updateProfile: (data: UpdateProfilePayload) => Promise<void>;
  changePassword: (data: ChangePasswordPayload) => Promise<void>;
  calculateTaskCounts: (tasks: Task[]) => Promise<void>;
  profile: FullProfile;
  organizationStaffs: FullProfile[];
  loadingOrgStaffs: boolean;
  loadingProfileDetails: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const [organizationStaffs, setOrganizationStaffs] = useState([]);
  const [loadingOrgStaffs, setLoadingOrgStaffs] = useState(true);
  const [profile, setProfile] = useState<FullProfile>(profilePayload);
  const [loadingProfileDetails, setLoadingProfileDetials] =
    useState<boolean>(false);

  //GET USERS BY ORGANIZATION
  const organizationId = user?.organizationId;
  const fetchOrganizationUsers = async () => {
    setLoadingOrgStaffs(true);

    try {
      const res = await fetch(`/api/organizations/${organizationId}/users`);

      if (!res.ok) {
        throw new Error("Failed to fetch organization users");
      }

      const data = await res.json();
      setOrganizationStaffs(data.users);
      // console.log("Organization users:", data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching organization users:", error);
    } finally {
      setLoadingOrgStaffs(false);
    }
  };
  useEffect(() => {
    if (!organizationId) {
      console.log("No organizationId available yet");
      return;
    }
    fetchOrganizationUsers();
  }, [organizationId]);

  //GET USERS PROFILE
  const getProfile = async () => {
    setLoadingProfileDetials(true);
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
    } finally {
      setLoadingProfileDetials(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  //UPDATE USER PROFILE
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

  //UPDATE USER PASSWORD
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

  //Calculate task counts from actual tasks and update via API
  const calculateTaskCounts = async (tasks: Task[]) => {
    if (!profile || !user?.id) return;

    try {
      // Filter tasks assigned to current user
      const myTasks = tasks.filter((task) =>
        task.assignedTo.some((assignee) => assignee.id === user.id),
      );

      const myCompletedTasks = myTasks.filter(
        (task) => task.status === "Completed",
      );

      console.log("📊 Updating task counts:", {
        tasksAssigned: myTasks.length,
        tasksCompleted: myCompletedTasks.length,
      });

      // Update profile via API
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasksAssigned: myTasks.length,
          tasksCompleted: myCompletedTasks.length,
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to update profile");
      }

      await res.json();

      console.log("✅ Task counts updated successfully");
    } catch (error) {
      console.error("Calculate task counts error:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        getProfile,
        fetchOrganizationUsers,
        updateProfile,
        changePassword,
        profile,
        organizationStaffs,
        loadingOrgStaffs,
        calculateTaskCounts,
        loadingProfileDetails,
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
