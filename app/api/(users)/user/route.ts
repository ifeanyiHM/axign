import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/lib/modals/users";
import connectToDatabase from "@/lib/db";

interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export const GET = async (req: NextRequest) => {
  await connectToDatabase();
  try {
    const cookie = req.cookies.get("auth_token")?.value;
    if (!cookie) return NextResponse.json({ user: null });

    const decoded = jwt.verify(cookie, process.env.JWT_SECRET!) as JWTPayload;
    const user = await User.findById(decoded.userId);
    if (!user) return NextResponse.json({ user: null });

    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        userStatus: user.userStatus,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
};
