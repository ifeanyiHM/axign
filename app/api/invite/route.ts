import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/users";
import { sendEmployeeInvitationEmail } from "@/lib/email";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { inviteeName, inviteeEmail, inviterUsername, organizationName } =
      body;

    // Validate required fields
    if (
      !inviteeName ||
      !inviteeEmail ||
      !inviterUsername ||
      !organizationName
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteeEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: inviteeEmail });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "This email is already registered in the system",
          isRegistered: true,
        },
        { status: 409 },
      );
    }

    // Send invitation email
    try {
      await sendEmployeeInvitationEmail(
        inviteeEmail,
        inviteeName,
        inviterUsername,
        organizationName,
      );
    } catch (emailError) {
      // console.error("Failed to send invitation email:", emailError);
      return NextResponse.json(
        {
          error:
            "Failed to send invitation email. Please check the email address and try again.",
          details:
            emailError instanceof Error
              ? emailError.message
              : "Email service unavailable",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Invitation sent successfully to ${inviteeEmail}`,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    // console.error("Invite employee error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
