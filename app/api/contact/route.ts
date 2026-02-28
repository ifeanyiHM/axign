import { NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/email";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { fullName, email, company, subject, message } = body as {
      fullName?: string;
      email?: string;
      company?: string;
      subject?: string;
      message?: string;
    };

    // Validate required fields
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "fullName, email, subject and message are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Basic anti-empty checks
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 },
      );
    }

    // Send email
    try {
      await sendContactFormEmail(
        fullName,
        email,
        company || "",
        subject,
        message,
      );
    } catch (emailError) {
      // console.error("Failed to send contact email:", emailError);
      return NextResponse.json(
        {
          error: "Failed to send message. Please try again.",
          details:
            emailError instanceof Error
              ? emailError.message
              : "Email service unavailable",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    // console.error("Contact API error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
