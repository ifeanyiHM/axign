"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Lock,
  Camera,
  Save,
  X,
  Building2,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";

import Header from "./Header";
import { useUser } from "@/context/UserContext";
import { ProfileFormData, profileSchema } from "@/schemas/profileSchema";
import InputField from "../primitives/form/InputField";
import { Button } from "../ui/button";
import { PasswordFormData, passwordSchema } from "@/schemas/passwordSchema";
import { Alert } from "../ui/alert";
import SelectField from "../primitives/form/SelectField";
import Avatar from "./Avatar";
import { UserProfileSkeleton } from "../skeletons/UserProfileSkeleton";
import TextareaField from "../primitives/form/TextareaField";

export function UserProfile() {
  const { user } = useAuth();
  const { updateProfile, changePassword, profile, loadingProfileDetails } =
    useUser();
  const { theme } = useTheme();
  const colors = themes[theme];

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("THIS IS NOW:", profile);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
    reset,
    control,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      location: "",
      position: "",
      department: "",
      bio: "",
      avatar: "",
      userActiveStatus: "active",
    },
  });
  console.log("PROFILE ERRORS:", profileErrors);

  const avatar = useWatch({ control, name: "avatar" });
  const userActiveStatus = useWatch({ control, name: "userActiveStatus" });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        username: profile.username || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        position: profile.position || "",
        department: profile.department || "",
        bio: profile.bio || "",
        avatar: profile.avatar || "",
        userActiveStatus: profile.userActiveStatus || "",
      });
    }
  }, [profile, reset]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      await updateProfile(data);

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

      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

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
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      reset((prev) => ({
        ...prev,
        avatar: imageData,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMessage("");
  };

  if (loadingProfileDetails) {
    return <UserProfileSkeleton />;
  }

  return (
    <>
      {/* Header */}
      <Header
        title="Profile Settings"
        subtitle="Manage your account information and preferences"
        className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
      />
      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:px-6 md:py-0`}>
        {/* Success/Error Messages */}
        {(errorMessage || successMessage) && (
          <Alert
            variant={errorMessage ? "danger" : "success"}
            title={errorMessage ? "Error" : "Success"}
            description={errorMessage || successMessage}
            dismissible={true}
            onClose={() => {
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className="w-fit fixed top-0 right-4 mt-6 mr-10 z-50"
          />
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
                  <Avatar
                    avatar={avatar}
                    name={profile?.username}
                    className="w-24 h-24 sm:w-32 sm:h-32"
                  />
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
                  {profile?.username}
                </h2>
                <p
                  className={`${colors.textMuted} text-xs sm:text-sm text-center mb-1`}
                >
                  {profile?.position}
                </p>
                <p className={`${colors.textMuted} text-xs text-center`}>
                  {profile?._id
                    ? profile.userStatus === "employee"
                      ? `EMP-${profile._id.slice(0, 4)}`
                      : `CEO-${profile._id.slice(0, 4)}`
                    : ""}
                </p>

                <div
                  className={`w-full mt-4 pt-4 border-t ${colors.border} space-y-2`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className={colors.textMuted}>Status</span>
                    {isEditing ? (
                      <Controller
                        name="userActiveStatus"
                        control={control}
                        render={({ field }) => (
                          <SelectField
                            error={profileErrors?.userActiveStatus?.message}
                            options={[
                              { label: "Active", value: "active" },
                              { label: "Onleave", value: "onleave" },
                              { label: "Inactive", value: "inactive" },
                            ]}
                            value={field.value}
                            onValueChange={field.onChange}
                            selectClassName="w-fit inline-flex items-center px-3 py-1 rounded-md text-xs font-medium"
                          />
                        )}
                      />
                    ) : (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${userActiveStatus === "active" ? "bg-emerald-600 text-white" : userActiveStatus === "inactive" ? "bg-red-600 text-white" : "bg-transparent border"}`}
                      >
                        {userActiveStatus}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className={colors.textMuted}>Member since</span>
                    <span className="font-medium">
                      {new Date(profile?.createdAt || "").toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        },
                      )}
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
                  <p className="text-xl sm:text-2xl font-bold">
                    {profile?.tasksCompleted}
                  </p>
                </div>
                <div
                  className={`p-3 ${colors.bgSidebar} rounded-lg border ${colors.border}`}
                >
                  <p className={`text-xs ${colors.textMuted} mb-1`}>
                    Active Projects
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {(profile.tasksAssigned ?? 0) -
                      (profile?.tasksCompleted ?? 0)}
                  </p>
                </div>
                <div
                  className={`p-3 ${colors.bgSidebar} rounded-lg border ${colors.border}`}
                >
                  <p className={`text-xs ${colors.textMuted} mb-1`}>
                    Total Tasks
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {profile?.tasksAssigned}
                  </p>
                </div>
                <div
                  className={`p-3 ${colors.bgSidebar} rounded-lg border ${colors.border}`}
                >
                  <p className={`text-xs ${colors.textMuted} mb-1`}>Rating</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {profile?.performanceRating}
                  </p>
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
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-lg ${colors.bg} ${colors.text}`}
                  >
                    <User size={20} className="" />
                  </div>

                  <h3 className="text-base font-semibold">
                    Personal Information
                  </h3>
                </div>
                {!isEditing && (
                  <Button
                    variant={theme === "light" ? "outline" : "ghost"}
                    onClick={() => setIsEditing(true)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>

              <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}

                  <InputField
                    type="text"
                    label="Full Name *"
                    {...registerProfile("username")}
                    disabled={!isEditing}
                    error={profileErrors?.username?.message}
                    className={`w-full px-3 sm:px-4 py-2.5 text-sm border-0 ${colors.input} ${isEditing ? "" : `${colors.bg}`}`}
                    labelClassName={colors.textMuted}
                  />

                  {/* Email */}
                  <InputField
                    type="email"
                    label="Email Address *"
                    {...registerProfile("email")}
                    disabled={!isEditing}
                    error={profileErrors?.email?.message}
                    className={`w-full px-3 sm:px-4 py-2.5 text-sm border-0 ${colors.input} ${isEditing ? "" : `${colors.bg}`}`}
                    labelClassName={colors.textMuted}
                  />

                  {/* Phone */}
                  <InputField
                    label="Phone Number"
                    type="tel"
                    {...registerProfile("phone")}
                    disabled={!isEditing}
                    className={`w-full px-3 sm:px-4 py-2.5 text-sm border-0 ${colors.input} ${isEditing ? "" : `${colors.bg}`}`}
                    labelClassName={colors.textMuted}
                  />

                  {/* Location */}
                  <InputField
                    type="text"
                    label="Location"
                    {...registerProfile("location")}
                    disabled={!isEditing}
                    className={`w-full px-3 sm:px-4 py-2.5 text-sm border-0 ${colors.input} ${isEditing ? "" : `${colors.bg}`}`}
                    labelClassName={colors.textMuted}
                  />

                  {/* Position */}
                  <InputField
                    type="text"
                    label="Position"
                    {...registerProfile("position")}
                    disabled={!isEditing}
                    className={`w-full px-3 sm:px-4 py-2.5 text-sm border-0 ${colors.input} ${isEditing ? "" : `${colors.bg}`}`}
                    labelClassName={colors.textMuted}
                  />

                  {/* Department (read-only) */}
                  <InputField
                    type="text"
                    label="Department"
                    {...registerProfile("department")}
                    disabled={!isEditing}
                    className={`w-full px-3 sm:px-4 py-2.5 text-sm border-0 ${colors.input} ${isEditing ? "" : `${colors.bg}`}`}
                    labelClassName={colors.textMuted}
                  />
                </div>

                {/* Bio */}
                <div className="mt-4">
                  <TextareaField
                    label="Bio"
                    {...registerProfile("bio")}
                    disabled={!isEditing}
                    rows={4}
                    className={`w-full px-3 sm:px-4 py-2.5 text-sm border-0 ${colors.input} ${isEditing ? "" : `${colors.bg}`}`}
                    labelClassName={colors.textMuted}
                  />
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <Button
                      type="submit"
                      disabled={isSubmittingProfile}
                      className={`px-4 sm:px-6 py-2.5 ${colors.button}`}
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
                    </Button>
                    <Button
                      variant={theme === "light" ? "secondary" : "ghost"}
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={isSubmittingProfile}
                      className={`px-4 sm:px-6 py-2.5 ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`}
                    >
                      <X size={18} />
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </div>

            {/* Organization Information (Read-only) */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg ${colors.bg} ${colors.text}`}
                >
                  <Building2 size={18} className="" />
                </div>
                <h3 className="text-base font-semibold">Organization</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs sm:text-sm ${colors.textMuted} mb-1`}
                  >
                    Organization Name
                  </label>
                  <p
                    className={`font-medium text-sm ${colors.bg} px-3 sm:px-4 py-2.5 rounded-md`}
                  >
                    {profile?.companyName}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-xs sm:text-sm ${colors.textMuted} mb-1`}
                  >
                    {profile?.userStatus === "employee" ? "Employee ID" : "ID"}
                  </label>
                  <p
                    className={`font-medium text-sm ${colors.bg} px-3 sm:px-4 py-2.5 rounded-md`}
                  >
                    {profile?._id
                      ? profile.userStatus === "employee"
                        ? `EMP-${profile._id.slice(0, 4)}`
                        : `CEO-${profile._id.slice(0, 4)}`
                      : "Loading..."}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-xs sm:text-sm ${colors.textMuted} mb-1`}
                  >
                    Join Date
                  </label>
                  <p
                    className={`font-medium text-sm ${colors.bg} px-3 sm:px-4 py-2.5 rounded-md`}
                  >
                    {new Date(profile?.createdAt || "").toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-xs sm:text-sm ${colors.textMuted} mb-1`}
                  >
                    Role
                  </label>
                  <p
                    className={`font-medium text-sm capitalize ${colors.bg} px-3 sm:px-4 py-2.5 rounded-md`}
                  >
                    {user?.userStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg ${colors.bg} ${colors.text}`}
                >
                  <Shield size={20} className="" />
                </div>

                <h3 className="text-base font-semibold">Security</h3>
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
                    <Button
                      variant={"secondary"}
                      onClick={() => setShowPasswordForm(true)}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${theme === "light" ? "" : colors.button}`}
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                  <div className="space-y-4">
                    {/* Current Password */}
                    <div className="relative">
                      <InputField
                        type={showCurrentPassword ? "text" : "password"}
                        label=" Current Password *"
                        {...registerPassword("currentPassword")}
                        error={passwordErrors?.currentPassword?.message}
                        className={`w-full px-3 sm:px-4 py-2.5 text-sm border  ${colors.input}`}
                        labelClassName={colors.textMuted}
                      />
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className={`p-0 hover:bg-0 absolute right-3 ${passwordErrors?.currentPassword ? "top-1/2" : "top-2/3"} transform -translate-y-1/2`}
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={18} className={colors.textMuted} />
                        ) : (
                          <Eye size={18} className={colors.textMuted} />
                        )}
                      </Button>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                      <InputField
                        type={showNewPassword ? "text" : "password"}
                        label=" New Password *"
                        {...registerPassword("newPassword")}
                        error={passwordErrors?.newPassword?.message}
                        className={`w-full px-3 sm:px-4 py-2.5 text-sm border ${colors.input}`}
                        labelClassName={colors.textMuted}
                      />
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className={`p-0 hover:bg-0 absolute right-3 ${passwordErrors?.newPassword ? "top-1/2" : "top-2/3"} transform -translate-y-1/2`}
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} className={colors.textMuted} />
                        ) : (
                          <Eye size={18} className={colors.textMuted} />
                        )}
                      </Button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <InputField
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm Password *"
                        {...registerPassword("confirmPassword")}
                        error={passwordErrors?.confirmPassword?.message}
                        className={`w-full px-3 sm:px-4 py-2.5 text-sm border ${colors.input}`}
                        labelClassName={colors.textMuted}
                      />
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className={`p-0 hover:bg-0 absolute right-3 ${passwordErrors?.confirmPassword ? "top-1/2" : "top-2/3"} transform -translate-y-1/2`}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} className={colors.textMuted} />
                        ) : (
                          <Eye size={18} className={colors.textMuted} />
                        )}
                      </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmittingPassword}
                        className={`px-4 sm:px-6 py-2.5 ${colors.button}`}
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
                      </Button>
                      <Button
                        type="button"
                        variant={theme === "light" ? "secondary" : "ghost"}
                        onClick={() => {
                          setShowPasswordForm(false);
                          resetPassword();
                          setErrorMessage("");
                        }}
                        disabled={isSubmittingPassword}
                        className={`px-4 sm:px-6 py-2.5 ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`}
                      >
                        <X size={18} />
                        Cancel
                      </Button>
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
