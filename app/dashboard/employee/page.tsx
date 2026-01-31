"use client";
import { withAuth } from "@/utils/withAuth";
import { useAuth } from "@/context/AuthContext";

import StatusCard from "@/components/dashboard/StatusCard";
import TaskTable from "@/components/dashboard/TaskTable";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/dashboard/Header";
import PieChartComponent from "@/components/dashboard/PieChartComponent";
import { myTasks, navItems, personalStats, pieData } from "./data";

function EmployeeDashboard() {
  const { user } = useAuth();

  return (
    <>
      <DashboardLayout links={navItems}>
        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <Header user={user} title="My Dashboard" subtitle="Welcome back," />

          <div>
            {/* Personal Stats Cards */}
            <StatusCard status={personalStats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {/* Task Status Pie Chart */}
              <section>
                <PieChartComponent pieData={pieData} title="My Task Status" />
              </section>

              {/* My Tasks Table */}
              <TaskTable taskList={myTasks} title="My Tasks" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default withAuth(EmployeeDashboard, { role: "employee" });
