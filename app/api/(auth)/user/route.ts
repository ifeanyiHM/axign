// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import connectToDatabase from "@/lib/db";
// import User from "@/lib/modals/users";

// interface JWTPayload {
//   userId: string;
//   iat?: number;
//   exp?: number;
// }

// export async function GET() {
//   const token = (await cookies()).get("auth_token")?.value;
//   if (!token) return new Response(null, { status: 401 });

//   const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

//   await connectToDatabase();
//   const user = await User.findById(decoded.userId)
//     .select("-password")
//     .populate("organization");

//   return Response.json(user);
// }

// app/api/auth/me/route.ts
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
