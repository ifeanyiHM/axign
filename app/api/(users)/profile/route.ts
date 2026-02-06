import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/users";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ user: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    const user = await User.findById(decoded.userId).select(
      "-password -emailVerificationToken -approvalToken",
    );

    if (!user) return NextResponse.json({ user: null });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    // 1️⃣ Get auth token
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    // 3️⃣ Parse body
    const body = await req.json();
    const {
      username,
      email,
      phone,
      location,
      position,
      department,
      bio,
      avatar,
      userActiveStatus,
    } = body;

    // 4️⃣ Update user
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      {
        username,
        email,
        phone,
        location,
        position,
        department,
        bio,
        avatar,
        userActiveStatus,
      },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updatedUser,
      },
      { status: 200 },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update profile" },
      { status: 500 },
    );
  }
};
