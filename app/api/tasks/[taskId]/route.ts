import connectToDatabase from "@/lib/db";
import Task from "@/lib/modals/task";
import User from "@/lib/modals/users";
import { NextRequest, NextResponse } from "next/server";

// PATCH - Update task
export const PATCH = async (
  request: NextRequest,
  context: { params: Promise<{ taskId: string }> },
) => {
  try {
    await connectToDatabase();

    const { taskId } = await context.params;
    const body = await request.json();

    // Get current task to check status change
    const currentTask = await Task.findById(taskId);

    if (!currentTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
      runValidators: true,
    });

    // ✨ CHECK IF STATUS CHANGED TO "Completed"
    const wasNotCompleted = currentTask.status !== "Completed";
    const isNowCompleted = updatedTask.status === "Completed";

    if (wasNotCompleted && isNowCompleted) {
      // Increment tasksCompleted for all assignees
      const assigneeIds = updatedTask.assignedTo.map(
        (assignee: { id: string }) => assignee.id,
      );

      await User.updateMany(
        { _id: { $in: assigneeIds } },
        { $inc: { tasksCompleted: 1 } }, // Increment tasksCompleted by 1
      );

      // console.log(
      //   `✅ Incremented tasksCompleted for ${assigneeIds.length} users`,
      // );
    }

    // ✨ CHECK IF STATUS CHANGED FROM "Completed" TO SOMETHING ELSE
    const wasCompleted = currentTask.status === "Completed";
    const isNoLongerCompleted = updatedTask.status !== "Completed";

    if (wasCompleted && isNoLongerCompleted) {
      // Decrement tasksCompleted for all assignees
      const assigneeIds = updatedTask.assignedTo.map(
        (assignee: { id: string }) => assignee.id,
      );

      await User.updateMany(
        { _id: { $in: assigneeIds } },
        { $inc: { tasksCompleted: -1 } }, // Decrement tasksCompleted by 1
      );

      // console.log(
      //   `✅ Decremented tasksCompleted for ${assigneeIds.length} users`,
      // );
    }

    // Format response
    const formattedTask = {
      id: updatedTask._id.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      assignedBy: updatedTask.assignedBy,
      assignedTo: updatedTask.assignedTo,
      startDate: updatedTask.startDate,
      dueDate: updatedTask.dueDate,
      priority: updatedTask.priority,
      status: updatedTask.status,
      category: updatedTask.category,
      progress: updatedTask.progress,
      estimatedHours: updatedTask.estimatedHours,
      hoursLogged: updatedTask.hoursLogged,
      tags: updatedTask.tags,
      attachments: updatedTask.attachments,
      notifyAssignees: updatedTask.notifyAssignees,
      recurring: updatedTask.recurring,
      recurringFrequency: updatedTask.recurringFrequency,
      organizationId: updatedTask.organizationId.toString(),
      organizationName: updatedTask.organizationName,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Task updated successfully",
        task: formattedTask,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    // console.error("Error updating task:", errorMessage);
    return NextResponse.json(
      { error: "Error updating task", message: errorMessage },
      { status: 500 },
    );
  }
};

// DELETE - Delete task
export const DELETE = async (
  request: NextRequest,
  context: { params: Promise<{ taskId: string }> },
) => {
  try {
    await connectToDatabase();

    const { taskId } = await context.params;

    // Get task before deletion to update user stats
    const task = await Task.findById(taskId);

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Get assignee IDs
    const assigneeIds = task.assignedTo.map(
      (assignee: { id: string }) => assignee.id,
    );

    // ✨ DECREMENT TASKS ASSIGNED COUNT
    await User.updateMany(
      { _id: { $in: assigneeIds } },
      { $inc: { tasksAssigned: -1 } }, // Decrement tasksAssigned by 1
    );

    // ✨ IF TASK WAS COMPLETED, ALSO DECREMENT TASKS COMPLETED
    if (task.status === "Completed") {
      await User.updateMany(
        { _id: { $in: assigneeIds } },
        { $inc: { tasksCompleted: -1 } }, // Decrement tasksCompleted by 1
      );
    }

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    // console.log(
    //   `✅ Deleted task and updated ${assigneeIds.length} user profiles`,
    // );

    return NextResponse.json(
      {
        success: true,
        message: "Task deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    // console.error("Error deleting task:", errorMessage);
    return NextResponse.json(
      { error: "Error deleting task", message: errorMessage },
      { status: 500 },
    );
  }
};
