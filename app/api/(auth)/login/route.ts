import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/users";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Check if CEO has verified email
    if (user.userStatus === "ceo" && !user.isEmailVerified) {
      return NextResponse.json(
        {
          error:
            "Please verify your email address before logging in. Check your inbox.",
        },
        { status: 403 },
      );
    }

    // Check if employee is approved
    if (user.userStatus === "employee" && !user.isApproved) {
      return NextResponse.json(
        {
          error:
            "Your account is pending approval from your CEO. You will receive an email once approved.",
        },
        { status: 403 },
      );
    }

    // Check if employee has verified email
    if (user.userStatus === "employee" && !user.isEmailVerified) {
      return NextResponse.json(
        {
          error:
            "Your account has been approved. Please check your email for the activation link.",
        },
        { status: 403 },
      );
    }

    // Generate JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({
      userId: user._id.toString(),
      role: user.userStatus,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .setIssuedAt()
      .sign(secret);

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          userStatus: user.userStatus,
          organizationId: user.organizationId,
        },
        token,
      },
      { status: 200 },
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { SignJWT } from "jose";

// import connectToDatabase from "@/lib/db";
// import User from "@/lib/modals/users";

// export const POST = async (request: Request) => {
//   try {
//     const body = await request.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required" },
//         { status: 400 },
//       );
//     }

//     await connectToDatabase();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 },
//       );
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 },
//       );
//     }

//     // Use jose for JWT
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
//     const token = await new SignJWT({
//       userId: user._id.toString(),
//       role: user.userStatus,
//     })
//       .setProtectedHeader({ alg: "HS256" })
//       .setExpirationTime("1d")
//       .setIssuedAt()
//       .sign(secret);

//     const response = NextResponse.json(
//       {
//         message: "Login successful",
//         user: {
//           id: user._id,
//           email: user.email,
//           username: user.username,
//           userStatus: user.userStatus,
//           organizationId: user.organizationId,
//         },
//         token,
//       },
//       { status: 200 },
//     );

//     response.cookies.set("auth_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24,
//     });

//     return response;
//   } catch (error: unknown) {
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// };
