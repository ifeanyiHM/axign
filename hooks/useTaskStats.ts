import { useTask } from "@/context/TaskContext";
import { useMemo } from "react";

export interface TaskStats {
  total: number;
  inProgress: number;
  notStarted: number;
  completed: number;
  overdue: number;
  pending: number;
}

export function useTaskStats(): TaskStats {
  const { allTasks } = useTask();

  const stats = useMemo(() => {
    return allTasks.reduce(
      (acc, task) => {
        acc.total += 1;
        if (task.status === "In Progress") acc.inProgress += 1;
        if (task.status === "Completed") acc.completed += 1;
        if (task.status === "Not Started") acc.notStarted += 1;
        if (task.status === "Pending Review") acc.pending += 1;

        if (
          new Date(task.dueDate) < new Date() &&
          task.status !== "Completed"
        ) {
          acc.overdue += 1;
        }

        return acc;
      },
      {
        total: 0,
        inProgress: 0,
        notStarted: 0,
        completed: 0,
        overdue: 0,
        pending: 0,
      } as TaskStats,
    );
  }, [allTasks]);

  return stats;
}
