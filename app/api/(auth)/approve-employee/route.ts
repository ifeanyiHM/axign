import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/users";
import {
  sendEmployeeApprovalNotification,
  sendEmployeeRejectionNotification,
} from "@/lib/email";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { token, action } = body;

    if (!token || !action) {
      return NextResponse.json(
        { error: "Token and action are required" },
        { status: 400 },
      );
    }

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await connectToDatabase();

    const employee = await User.findOne({
      approvalToken: token,
      approvalTokenExpires: { $gt: new Date() },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Invalid or expired approval token" },
        { status: 400 },
      );
    }

    if (action === "approve") {
      // Generate activation token
      const activationToken = crypto.randomBytes(32).toString("hex");
      const activationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      employee.isApproved = true;
      employee.approvalToken = undefined;
      employee.approvalTokenExpires = undefined;
      employee.activationToken = activationToken;
      employee.activationTokenExpires = activationExpires;
      await employee.save();

      // Send activation email to employee
      await sendEmployeeApprovalNotification(
        employee.email,
        employee.username,
        activationToken,
      );

      return NextResponse.json(
        { message: "Employee approved successfully! Activation email sent." },
        { status: 200 },
      );
    } else {
      // Reject - delete the user
      await User.findByIdAndDelete(employee._id);

      // Send rejection email
      await sendEmployeeRejectionNotification(
        employee.email,
        employee.username,
      );

      return NextResponse.json(
        { message: "Employee registration rejected." },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
