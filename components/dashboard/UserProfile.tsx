"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Lock,
  Camera,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Building2,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";

import Image from "next/image";
import Header from "./Header";

// Profile Schema
const profileSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  position: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Password Schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export function UserProfile() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = themes[theme];

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Mock user data (replace with real data from API)
  const [userData] = useState({
    username: user?.username || "John Doe",
    email: user?.email || "john.doe@company.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Nigeria",
    position: "Chief Executive Officer",
    department: "Executive",
    joinDate: "2021-06-15",
    employeeId: "EMP-001",
    organizationName: "Axign Consulting Ltd.",
    bio: "Experienced professional with expertise in quality management and organizational leadership. Passionate about driving excellence and building high-performing teams.",
    avatar: user?.username?.substring(0, 2).toUpperCase() || "JD",
  });

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      location: userData.location,
      position: userData.position,
      bio: userData.bio,
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Profile updated:", data);

      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
      console.error(error);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Password updated:", data);

      setSuccessMessage("Password changed successfully!");
      setShowPasswordForm(false);
      resetPassword();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Failed to change password. Please try again.");
      console.error(error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    resetProfile();
    setErrorMessage("");
  };

  return (
    <>
      {/* Header */}
      <Header
        title="Profile Settings"
        subtitle="Manage your account information and preferences"
        className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
      />
      <div
        className={`min-h-screen ${colors.bg} ${colors.text} p-3 sm:p-4 md:px-6 md:py-0`}
      >
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 sm:mb-6 bg-emerald-900/30 border border-emerald-800/50 rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
            <p className="text-emerald-400 text-sm sm:text-base">
              {successMessage}
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 sm:mb-6 bg-red-900/30 border border-red-800/50 rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <AlertCircle size={20} className="text-red-400 shrink-0" />
            <p className="text-red-400 text-sm sm:text-base">{errorMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Picture */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white border-4 border-blue-500 shadow-lg">
                      {userData.avatar}
                    </div>
                  )}
                  <label
                    htmlFor="profile-image"
                    className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform`}
                  >
                    <Camera size={16} className="sm:w-5 sm:h-5" />
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-center mb-1">
                  {userData.username}
                </h2>
                <p
                  className={`${colors.textMuted} text-xs sm:text-sm text-center mb-1`}
                >
                  {userData.position}
                </p>
                <p className={`${colors.textMuted} text-xs text-center`}>
                  {userData.employeeId}
                </p>

                <div
                  className={`w-full mt-4 pt-4 border-t ${colors.border} space-y-2`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className={colors.textMuted}>Status</span>
                    <span className="px-2 sm:px-3 py-1 bg-emerald-900/30 border border-emerald-800/50 text-emerald-400 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className={colors.textMuted}>Member since</span>
                    <span className="font-medium">
                      {new Date(userData.joinDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div
                  className={`p-3 ${colors.bgSidebar} rounded-lg border ${colors.border}`}
                >
                  <p className={`text-xs ${colors.textMuted} mb-1`}>
                    Tasks Completed
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">156</p>
                </div>
                <div
                  className={`p-3 ${colors.bgSidebar} rounded-lg border ${colors.border}`}
                >
                  <p className={`text-xs ${colors.textMuted} mb-1`}>
                    Active Projects
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">8</p>
                </div>
                <div
                  className={`p-3 ${colors.bgSidebar} rounded-lg border ${colors.border}`}
                >
                  <p className={`text-xs ${colors.textMuted} mb-1`}>
                    Team Members
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">12</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Personal Information */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-blue-400 sm:w-6 sm:h-6" />
                  <h3 className="text-base sm:text-lg font-semibold">
                    Personal Information
                  </h3>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm`}
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      {...registerProfile("username")}
                      disabled={!isEditing}
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                        profileErrors.username ? "ring-2 ring-red-500" : ""
                      }`}
                    />
                    {profileErrors.username && (
                      <p className="text-red-400 text-xs mt-1">
                        {profileErrors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      {...registerProfile("email")}
                      disabled={!isEditing}
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                        profileErrors.email ? "ring-2 ring-red-500" : ""
                      }`}
                    />
                    {profileErrors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {profileErrors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...registerProfile("phone")}
                      disabled={!isEditing}
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      {...registerProfile("location")}
                      disabled={!isEditing}
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      {...registerProfile("position")}
                      disabled={!isEditing}
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>

                  {/* Department (read-only) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={userData.department}
                      disabled
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base ${colors.input} rounded-lg opacity-50 cursor-not-allowed`}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Bio
                  </label>
                  <textarea
                    {...registerProfile("bio")}
                    disabled={!isEditing}
                    rows={4}
                    className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                      profileErrors.bio ? "ring-2 ring-red-500" : ""
                    }`}
                  />
                  {profileErrors.bio && (
                    <p className="text-red-400 text-xs mt-1">
                      {profileErrors.bio.message}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button
                      type="submit"
                      disabled={isSubmittingProfile}
                      className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 ${colors.button} rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isSubmittingProfile ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={isSubmittingProfile}
                      className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-gray-100 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Organization Information (Read-only) */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Building2 size={20} className="text-blue-400 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">
                  Organization
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs sm:text-sm ${colors.textMuted} mb-1`}
                  >
                    Organization Name
                  </label>
                  <p className="font-medium text-sm sm:text-base">
                    {userData.organizationName}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-xs sm:text-sm ${colors.textMuted} mb-1`}
                  >
                    Employee ID
                  </label>
                  <p className="font-medium text-sm sm:text-base">
                    {userData.employeeId}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-xs sm:text-sm ${colors.textMuted} mb-1`}
                  >
                    Join Date
                  </label>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(userData.joinDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-xs sm:text-sm ${colors.textMuted} mb-1`}
                  >
                    Role
                  </label>
                  <p className="font-medium text-sm sm:text-base capitalize">
                    {user?.userStatus || "CEO"}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Shield size={20} className="text-blue-400 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">Security</h3>
              </div>

              {!showPasswordForm ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <p className="font-medium text-sm sm:text-base mb-1">
                        Password
                      </p>
                      <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
                        Last changed 3 months ago
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className={`px-3 sm:px-4 py-2 bg-gray-100 rounded-lg text-xs sm:text-sm`}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                  <div className="space-y-4">
                    {/* Current Password */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                        Current Password <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          {...registerPassword("currentPassword")}
                          className={`w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            passwordErrors.currentPassword
                              ? "ring-2 ring-red-500"
                              : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={18} className={colors.textMuted} />
                          ) : (
                            <Eye size={18} className={colors.textMuted} />
                          )}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && (
                        <p className="text-red-400 text-xs mt-1">
                          {passwordErrors.currentPassword.message}
                        </p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                        New Password <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          {...registerPassword("newPassword")}
                          className={`w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            passwordErrors.newPassword
                              ? "ring-2 ring-red-500"
                              : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} className={colors.textMuted} />
                          ) : (
                            <Eye size={18} className={colors.textMuted} />
                          )}
                        </button>
                      </div>
                      {passwordErrors.newPassword && (
                        <p className="text-red-400 text-xs mt-1">
                          {passwordErrors.newPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                        Confirm New Password{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          {...registerPassword("confirmPassword")}
                          className={`w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            passwordErrors.confirmPassword
                              ? "ring-2 ring-red-500"
                              : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} className={colors.textMuted} />
                          ) : (
                            <Eye size={18} className={colors.textMuted} />
                          )}
                        </button>
                      </div>
                      {passwordErrors.confirmPassword && (
                        <p className="text-red-400 text-xs mt-1">
                          {passwordErrors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmittingPassword}
                        className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 ${colors.button} rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isSubmittingPassword ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Changing...
                          </>
                        ) : (
                          <>
                            <Lock size={18} />
                            Change Password
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordForm(false);
                          resetPassword();
                          setErrorMessage("");
                        }}
                        disabled={isSubmittingPassword}
                        className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-gray-100 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
