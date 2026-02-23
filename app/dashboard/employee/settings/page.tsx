"use client";

import { withAuth } from "@/utils/withAuth";

import { CircleCheckBig, ClipboardList, Clock, Loader2 } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import { useTask } from "@/context/TaskContext";
import { useTaskStats } from "@/hooks/useTaskStats";
import { navItems } from "../data";

function CEOSettingsPage() {
  const { loading } = useTask();
  const myTaskStats = useTaskStats();

  const statsConfig = [
    {
      label: "Total Tasks",
      value: myTaskStats.total,
      icon: ClipboardList,
    },
    {
      label: "Pending",
      value: myTaskStats.pending,
      icon: Clock,
    },
    {
      label: "In Progress",
      value: myTaskStats.inProgress,
      icon: Loader2,
    },
    {
      label: "Completed",
      value: myTaskStats.completed,
      icon: CircleCheckBig,
    },
  ];

  return (
    <DashboardLayout links={navItems}>
      <DashboardSettings statsConfig={statsConfig} loading={loading} />
    </DashboardLayout>
  );
}

export default withAuth(CEOSettingsPage, { role: "employee" });
