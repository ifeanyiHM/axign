"use client";

import { withAuth } from "@/utils/withAuth";

import {
  BarChart3,
  LayoutDashboard,
  ListTodo,
  Settings,
  User,
} from "lucide-react";

import DashboardLayout, { LinkItem } from "@/components/layout/DashboardLayout";
import DashboardSettings from "@/components/dashboard/DashboardSettings";

function CEOSettingsPage() {
  const navItems: LinkItem[] = [
    {
      href: "/dashboard/employee",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/employee/mytask",
      label: "My Tasks",
      icon: ListTodo,
    },
    {
      href: "/dashboard/employee/overview",
      label: "Overview",
      icon: BarChart3,
    },
    {
      href: "/dashboard/employee/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/dashboard/employee/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <DashboardLayout links={navItems}>
      <DashboardSettings />
    </DashboardLayout>
  );
}

export default withAuth(CEOSettingsPage, { role: "employee" });
