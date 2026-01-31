"use client";

import { withAuth } from "@/utils/withAuth";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { links } from "../data";
import { UserProfile } from "@/components/dashboard/UserProfile";

function ProfilePage() {
  return (
    <DashboardLayout links={links}>
      <UserProfile />
    </DashboardLayout>
  );
}

export default withAuth(ProfilePage, { role: "ceo" });
