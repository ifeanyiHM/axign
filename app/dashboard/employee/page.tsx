"use client";
import { withAuth } from "@/utils/withAuth";
import { useAuth } from "@/context/AuthContext";

import StatusCard from "@/components/dashboard/StatusCard";
import TaskTable from "@/components/dashboard/TaskTable";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/dashboard/Header";
import PieChartComponent from "@/components/dashboard/PieChartComponent";
import { myTasksData, myTaskStats, navItems, pieData } from "./data";
import { CircleCheckBig, ClipboardList, Clock, Loader2 } from "lucide-react";

function EmployeeDashboard() {
  const { user } = useAuth();

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
    <>
      <DashboardLayout links={navItems}>
        <Header
          user={user}
          title="My Dashboard"
          subtitle="Welcome back,"
          className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
        />
        {/* Main Content */}
        <div className="p-4 sm:px-6 sm:py-0">
          <div>
            {/* Personal Stats Cards */}
            <StatusCard status={statsConfig} />

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {/* Task Status Pie Chart */}
              <section>
                <PieChartComponent pieData={pieData} title="My Task Status" />
              </section>

              {/* My Tasks Table */}
              <TaskTable taskList={myTasksData} title="My Tasks" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default withAuth(EmployeeDashboard, { role: "employee" });
