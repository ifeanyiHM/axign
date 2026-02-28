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

interface InviteEmployeeData {
  inviteeName: string;
  inviteeEmail: string;
}

interface InviteEmployeeResponse {
  success?: boolean;
  message?: string;
  error?: string;
  isRegistered?: boolean;
}

type ContactPayload = {
  fullName: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
};

type ContactResponse = {
  success: boolean;
  message: string;
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
  inviteEmployee: (data: InviteEmployeeData) => Promise<InviteEmployeeResponse>;
  sendContactMessage: (payload: ContactPayload) => Promise<ContactResponse>;
  contactLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const [organizationStaffs, setOrganizationStaffs] = useState([]);
  const [loadingOrgStaffs, setLoadingOrgStaffs] = useState(true);
  const [profile, setProfile] = useState<FullProfile>(profilePayload);
  const [contactLoading, setContactLoading] = useState(false);
  const [loadingProfileDetails, setLoadingProfileDetials] =
    useState<boolean>(false);

  // console.log("UserContext initialized with user:", profile);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      // console.error("Error fetching organization users:", error);
    } finally {
      setLoadingOrgStaffs(false);
    }
  };
  useEffect(() => {
    if (!organizationId) {
      // console.log("No organizationId available yet");
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Error fetching profile:", error);
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
      // console.error("Update profile error:", error);
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
      // console.error("Change password error:", error);
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

      // console.log("📊 Updating task counts:", {
      //   tasksAssigned: myTasks.length,
      //   tasksCompleted: myCompletedTasks.length,
      // });

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

      // console.log("✅ Task counts updated successfully");
    } catch (error) {
      // console.error("Calculate task counts error:", error);
      throw error;
    }
  };

  // Invite employee function - sends invite data to API route and handles response
  const inviteEmployee = async (
    data: InviteEmployeeData,
  ): Promise<InviteEmployeeResponse> => {
    try {
      // Get user details from context
      if (!user || !user.username) {
        throw new Error("User information not available. Please login again.");
      }

      const requestBody = {
        inviteeName: data.inviteeName,
        inviteeEmail: data.inviteeEmail,
        inviterUsername: user.username,
        organizationName: profile?.companyName,
      };

      const res = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to send invitation");
      }

      return {
        success: true,
        message: responseData.message,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send invitation";
      // console.error("Invite employee error:", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  //send contail mail to admin
  const sendContactMessage = async (
    payload: ContactPayload,
  ): Promise<ContactResponse> => {
    setContactLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }

      return {
        success: true,
        message: data?.message || "Message sent successfully",
      };
    } finally {
      setContactLoading(false);
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
        inviteEmployee,
        sendContactMessage,
        contactLoading,
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
