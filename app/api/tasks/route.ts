import connectToDatabase from "@/lib/db";
import Task from "@/lib/modals/task";
import Organization from "@/lib/modals/organization";
import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/modals/users";
import { sendTaskAssignmentEmails } from "@/lib/email";

// GET tasks for a specific organization ONLY
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 },
      );
    }

    const assignedToId = searchParams.get("assignedToId");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");

    const filter: Record<string, unknown> = {
      organizationId, // 🔒 always scoped
    };

    if (assignedToId) {
      filter["assignedTo.id"] = assignedToId;
    }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 }).lean();

    const formattedTasks = tasks.map((task) => ({
      id: task._id.toString(),
      ...task,
      organizationId: task.organizationId.toString(),
    }));

    return NextResponse.json(
      {
        success: true,
        tasks: formattedTasks,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    // console.error("Error fetching tasks:", errorMessage);
    return NextResponse.json(
      { error: "Error fetching tasks", message: errorMessage },
      { status: 500 },
    );
  }
}

// POST - Create new task
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      title,
      description,
      assignedBy,
      assignedTo,
      startDate,
      dueDate,
      priority,
      status,
      category,
      progress,
      estimatedHours,
      tags,
      attachments,
      notifyAssignees,
      recurring,
      recurringFrequency,
      organizationId,
    } = body;

    // Validate required fields
    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 },
      );
    }

    if (!title || !description || !assignedBy) {
      return NextResponse.json(
        { error: "Title, description, and assignedBy are required" },
        { status: 400 },
      );
    }

    if (!assignedTo || assignedTo.length === 0) {
      return NextResponse.json(
        { error: "At least one assignee is required" },
        { status: 400 },
      );
    }

    // Fetch organization name
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 },
      );
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      assignedBy,
      assignedTo,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
      priority,
      status: status || "Not Started",
      category,
      progress: progress || 0,
      estimatedHours: estimatedHours ? Number(estimatedHours) : undefined,
      hoursLogged: 0,
      tags: tags || [],
      attachments: attachments || [],
      notifyAssignees: notifyAssignees !== undefined ? notifyAssignees : true,
      recurring: recurring || false,
      recurringFrequency: recurringFrequency || "",
      organizationId,
      organizationName: organization.name,
    });

    // Format response
    const formattedTask = {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      assignedBy: task.assignedBy,
      assignedTo: task.assignedTo,
      startDate: task.startDate,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      category: task.category,
      progress: task.progress,
      estimatedHours: task.estimatedHours,
      hoursLogged: task.hoursLogged,
      tags: task.tags,
      attachments: task.attachments,
      notifyAssignees: task.notifyAssignees,
      recurring: task.recurring,
      recurringFrequency: task.recurringFrequency,
      organizationId: task.organizationId.toString(),
      organizationName: task.organizationName,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };

    // ✅ Fetch assignee id
    const assigneeIds = assignedTo.map(
      (assignee: { id: string }) => assignee.id,
    );

    // ✅ Fetch assignee emails
    const assignees = await User.find(
      { _id: { $in: assigneeIds } },
      { email: 1, username: 1 },
    );

    const assigneeEmails = assignees.map((user) => ({
      email: user.email,
      username: user.username,
    }));

    // 📧 Send email notifications
    if (notifyAssignees) {
      await sendTaskAssignmentEmails(assigneeEmails, formattedTask);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Task created successfully",
        task: formattedTask,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    // console.error("Error creating task:", errorMessage);
    return NextResponse.json(
      { error: "Error creating task", message: errorMessage },
      { status: 500 },
    );
  }
}
