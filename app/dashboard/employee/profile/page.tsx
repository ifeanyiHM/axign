"use client";

import { withAuth } from "@/utils/withAuth";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { navItems } from "../data";

function ProfilePage() {
  return (
    <DashboardLayout links={navItems}>
      <UserProfile />
    </DashboardLayout>
  );
}

export default withAuth(ProfilePage, { role: "employee" });
