"use client";
import { withAuth } from "@/utils/withAuth";
import { useAuth } from "../../../context/AuthContext";

function EmployeeDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Employee Dashboard</h1>
      <p>Welcome, {user?.username}!</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default withAuth(EmployeeDashboard, { role: "employee" });
