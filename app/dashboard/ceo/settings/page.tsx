"use client";

import { withAuth } from "@/utils/withAuth";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import { links } from "../data";

function CEOSettingsPage() {
  return (
    <DashboardLayout links={links}>
      <DashboardSettings />
    </DashboardLayout>
  );
}

export default withAuth(CEOSettingsPage, { role: "ceo" });
