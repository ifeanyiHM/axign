import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import { SignJWT } from "jose";
import crypto from "crypto";

import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/users";
import Organization from "@/lib/modals/organization";
import {
  sendVerificationEmail,
  sendEmployeeApprovalRequestToCEO,
} from "@/lib/email";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const {
      email,
      username,
      password,
      userStatus,
      avatar,
      companyName,
      tasksAssigned,
      tasksCompleted,
      performanceRating,
    } = body;

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    let organizationId;
    const hashedPassword = await bcrypt.hash(password, 12);

    if (userStatus === "ceo") {
      if (!body.organizationName) {
        return NextResponse.json(
          { error: "Organization name is required for CEO" },
          { status: 400 },
        );
      }

      // Generate verification token BEFORE creating anything
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // TEST EMAIL SENDING FIRST - Before creating organization or user
      try {
        await sendVerificationEmail(email, verificationToken, username);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        return NextResponse.json(
          {
            error:
              "Failed to send verification email. Please check your email address and try again later.",
            details:
              emailError instanceof Error
                ? emailError.message
                : "Email service unavailable",
          },
          { status: 503 }, // Service Unavailable
        );
      }

      // Only create organization and user AFTER email succeeds
      const organization = await Organization.create({
        name: body.organizationName,
      });

      organizationId = organization._id;

      await User.create({
        email,
        username,
        password: hashedPassword,
        userStatus,
        organizationId,
        avatar,
        companyName,
        tasksAssigned,
        tasksCompleted,
        performanceRating,
        isEmailVerified: false,
        isApproved: true, // CEOs are auto-approved
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires,
      });

      return NextResponse.json(
        {
          message:
            "Registration successful! Please check your email to verify your account.",
          requiresVerification: true,
        },
        { status: 201 },
      );
    }

    if (userStatus === "employee") {
      if (!body.organizationId) {
        return NextResponse.json(
          { error: "Organization selection is required" },
          { status: 400 },
        );
      }

      organizationId = body.organizationId;

      // Find the CEO of the organization
      const ceo = await User.findOne({
        organizationId,
        userStatus: "ceo",
      });

      if (!ceo) {
        return NextResponse.json(
          { error: "Organization CEO not found" },
          { status: 404 },
        );
      }

      // Generate approval token BEFORE creating user
      const approvalToken = crypto.randomBytes(32).toString("hex");
      const approvalExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      // TEST EMAIL SENDING FIRST - Before creating user
      try {
        await sendEmployeeApprovalRequestToCEO(
          ceo.email,
          ceo.username,
          username,
          email,
          approvalToken,
        );
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        return NextResponse.json(
          {
            error:
              "Failed to send approval request to CEO. Please try again later.",
            details:
              emailError instanceof Error
                ? emailError.message
                : "Email service unavailable",
          },
          { status: 503 }, // Service Unavailable
        );
      }

      // Only create user AFTER email succeeds
      await User.create({
        email,
        username,
        password: hashedPassword,
        userStatus,
        organizationId,
        companyName,
        avatar,
        tasksAssigned,
        tasksCompleted,
        performanceRating,
        isEmailVerified: false,
        isApproved: false,
        approvalToken,
        approvalTokenExpires: approvalExpires,
      });

      return NextResponse.json(
        {
          message:
            "Registration successful! An approval request has been sent to your CEO. You will receive an email once approved.",
          requiresApproval: true,
        },
        { status: 201 },
      );
    }

    return NextResponse.json({ error: "Invalid user status" }, { status: 400 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Signup error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";

// import connectToDatabase from "@/lib/db";
// import User from "@/lib/modals/users";
// import Organization from "@/lib/modals/organization";
// import {
//   sendVerificationEmail,
//   sendEmployeeApprovalRequestToCEO,
// } from "@/lib/email";

// export const POST = async (request: Request) => {
//   try {
//     const body = await request.json();
//     const {
//       email,
//       username,
//       password,
//       userStatus,
//       companyName,
//       tasksAssigned,
//       tasksCompleted,
//       performanceRating,
//     } = body;

//     await connectToDatabase();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "Email already in use" },
//         { status: 409 },
//       );
//     }

//     let organizationId;
//     const hashedPassword = await bcrypt.hash(password, 12);

//     if (userStatus === "ceo") {
//       if (!body.organizationName) {
//         return NextResponse.json(
//           { error: "Organization name is required for CEO" },
//           { status: 400 },
//         );
//       }

//       const organization = await Organization.create({
//         name: body.organizationName,
//       });

//       organizationId = organization._id;

//       // Generate verification token
//       const verificationToken = crypto.randomBytes(32).toString("hex");
//       const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

//       await User.create({
//         email,
//         username,
//         password: hashedPassword,
//         userStatus,
//         organizationId,
//         companyName,
//         tasksAssigned,
//         tasksCompleted,
//         performanceRating,
//         isEmailVerified: false,
//         isApproved: true, // CEOs are auto-approved
//         emailVerificationToken: verificationToken,
//         emailVerificationExpires: verificationExpires,
//       });

//       // Send verification email
//       await sendVerificationEmail(email, verificationToken, username);

//       return NextResponse.json(
//         {
//           message:
//             "Registration successful! Please check your email to verify your account.",
//           requiresVerification: true,
//         },
//         { status: 201 },
//       );
//     }

//     if (userStatus === "employee") {
//       if (!body.organizationId) {
//         return NextResponse.json(
//           { error: "Organization selection is required" },
//           { status: 400 },
//         );
//       }

//       organizationId = body.organizationId;

//       // Find the CEO of the organization
//       const ceo = await User.findOne({
//         organizationId,
//         userStatus: "ceo",
//       });

//       if (!ceo) {
//         return NextResponse.json(
//           { error: "Organization CEO not found" },
//           { status: 404 },
//         );
//       }

//       // Generate approval token
//       const approvalToken = crypto.randomBytes(32).toString("hex");
//       const approvalExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

//       await User.create({
//         email,
//         username,
//         password: hashedPassword,
//         userStatus,
//         organizationId,
//         companyName,
//         tasksAssigned,
//         tasksCompleted,
//         performanceRating,
//         isEmailVerified: false,
//         isApproved: false,
//         approvalToken,
//         approvalTokenExpires: approvalExpires,
//       });

//       // Send approval request to CEO
//       await sendEmployeeApprovalRequestToCEO(
//         ceo.email,
//         ceo.username,
//         username,
//         email,
//         approvalToken,
//       );

//       return NextResponse.json(
//         {
//           message:
//             "Registration successful! An approval request has been sent to your CEO. You will receive an email once approved.",
//           requiresApproval: true,
//         },
//         { status: 201 },
//       );
//     }

//     return NextResponse.json({ error: "Invalid user status" }, { status: 400 });
//   } catch (error: unknown) {
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// };
