"use client";
import { withAuth } from "@/utils/withAuth";
import { useAuth } from "@/context/AuthContext";

import StatusCard from "@/components/dashboard/StatusCard";
import TaskTable from "@/components/dashboard/TaskTable";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/dashboard/Header";
import PieChartComponent, {
  PieDataItem,
} from "@/components/dashboard/PieChartComponent";
import { navItems } from "./data";
import { CircleCheckBig, ClipboardList, Clock, Loader2 } from "lucide-react";
import { useTask } from "@/context/TaskContext";
import { useTaskStats } from "@/hooks/useTaskStats";
import StatusCardSkeleton from "@/components/skeletons/StatusCardSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import ChartSkeleton from "@/components/skeletons/ChartSkeleton";
import HeaderSkeleton from "@/components/skeletons/HeaderSkeleton";

function EmployeeDashboard() {
  const { user } = useAuth();
  const { myTasks, loading } = useTask();
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

  const pieData: PieDataItem[] = [
    { name: "Completed", value: myTaskStats.completed, color: "#059669" }, // green
    { name: "In Progress", value: myTaskStats.inProgress, color: "#1e40af" }, // blue
    { name: "Pending Review", value: myTaskStats.pending, color: "#64748b" }, // slate
    { name: "Overdue", value: myTaskStats.overdue, color: "#b91c1c" }, // red
    { name: "Not Started", value: myTaskStats.notStarted, color: "#38bdf8" }, // 👈 soft gray-slate
  ];

  return (
    <>
      <DashboardLayout links={navItems}>
        {loading ? (
          <HeaderSkeleton
            className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
            hasButton={false}
          />
        ) : (
          <Header
            user={user}
            title="My Dashboard"
            subtitle="Welcome back,"
            className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
          />
        )}

        {/* Main Content */}
        <div className="p-4 sm:px-6 sm:py-0">
          <div>
            {/* Personal Stats Cards */}
            {loading ? (
              <StatusCardSkeleton />
            ) : (
              <StatusCard status={statsConfig} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {/* Task Status Pie Chart */}
              <section>
                {loading ? (
                  <ChartSkeleton type="pie" />
                ) : (
                  <PieChartComponent pieData={pieData} title="My Task Status" />
                )}
              </section>

              {/* My Tasks Table */}
              {loading ? (
                <TableSkeleton />
              ) : (
                <TaskTable taskList={myTasks} title="My Tasks" />
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default withAuth(EmployeeDashboard, { role: "employee" });
