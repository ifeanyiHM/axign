import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/users";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 },
      );
    }

    // Update user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Generate JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const jwtToken = await new SignJWT({
      userId: user._id.toString(),
      role: user.userStatus,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .setIssuedAt()
      .sign(secret);

    const response = NextResponse.json(
      {
        message: "Email verified successfully!",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          userStatus: user.userStatus,
          organizationId: user.organizationId,
        },
        token: jwtToken,
      },
      { status: 200 },
    );

    response.cookies.set("auth_token", jwtToken, {
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
