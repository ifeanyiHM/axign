"use client";

import { withAuth } from "@/utils/withAuth";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import { links } from "../data";
import { useTask } from "@/context/TaskContext";
import { useTaskStats } from "@/hooks/useTaskStats";
import { CircleCheckBig, ClipboardList, Clock, Loader2 } from "lucide-react";
import { StatusItem } from "@/components/dashboard/StatusCard";

function CEOSettingsPage() {
  const { loading } = useTask();
  const myTaskStats = useTaskStats();

  const statsConfig: StatusItem[] = [
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
    <DashboardLayout links={links}>
      <DashboardSettings statsConfig={statsConfig} loading={loading} />
    </DashboardLayout>
  );
}

export default withAuth(CEOSettingsPage, { role: "ceo" });
