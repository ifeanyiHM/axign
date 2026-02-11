"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";

// Types
interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedBy: string;
  assignedTo: Assignee[];
  startDate: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status:
    | "Not Started"
    | "In Progress"
    | "Pending Review"
    | "Overdue"
    | "Completed";
  category: string;
  progress: number;
  estimatedHours?: number;
  hoursLogged: number;
  tags: string[];
  attachments: string[];
  notifyAssignees: boolean;
  recurring: boolean;
  recurringFrequency: "" | "daily" | "weekly" | "monthly";
  organizationId: string;
  organizationName: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateTaskData {
  title: string;
  description: string;
  assignedBy: string;
  assignedTo: Assignee[];
  startDate: string;
  dueDate: string;
  priority: string;
  status?: string;
  category: string;
  progress?: number;
  estimatedHours?: string;
  tags?: string[];
  attachments?: string[];
  notifyAssignees?: boolean;
  recurring?: boolean;
  recurringFrequency?: string;
}

interface TaskContextType {
  allTasks: Task[];
  myTasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (taskData: CreateTaskData) => Promise<Task | null>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { getProfile, fetchOrganizationUsers, calculateTaskCounts } = useUser();

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (allTasks.length > 0) {
      calculateTaskCounts(allTasks);
    }
  }, [allTasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.organizationId) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/tasks?organizationId=${user.organizationId}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();
        const fetchedTasks: Task[] = data.tasks || [];

        // 1️⃣ All organization tasks (CEO)
        setAllTasks(fetchedTasks);

        // 2️⃣ Tasks assigned to logged-in user (Employee)
        if (user?.id) {
          const assignedToMe = fetchedTasks.filter((task) =>
            task.assignedTo.some((assignee) => assignee.id === user.id),
          );

          setMyTasks(assignedToMe);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user?.organizationId, user?.id]);

  const createTask = async (taskData: CreateTaskData): Promise<Task | null> => {
    setLoading(true);
    setError(null);

    try {
      if (!user?.organizationId) {
        throw new Error("Organization ID not found");
      }

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...taskData,
          organizationId: user.organizationId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create task");
      }

      const data = await res.json();
      const newTask = data.task;

      // Add new task to state
      setAllTasks((prev) => [newTask, ...prev]);

      return newTask;
    } catch (err) {
      console.error("Error creating task:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create task";
      setError(errorMessage);
      throw err; // Re-throw so component can handle it
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const data = await res.json();
      const updatedTask = data.task;

      // Update task in state
      setAllTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task)),
      );

      // If status changed to "Completed", refresh profiles
      if (updates.status === "Completed") {
        await getProfile();
        if (user?.organizationId) {
          await fetchOrganizationUsers();
        }
        console.log("✅ User profiles refreshed after task completion");
      }
    } catch (err) {
      console.error("Error updating task:", err);
      setError(err instanceof Error ? err.message : "Failed to update task");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      // Remove task from state
      setAllTasks((prev) => prev.filter((task) => task.id !== taskId));

      // Refresh profiles after deletion
      await getProfile();
      if (user?.organizationId) {
        await fetchOrganizationUsers();
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err instanceof Error ? err.message : "Failed to delete task");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        allTasks,
        myTasks,
        loading,
        error,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within TaskProvider");
  }
  return context;
};
