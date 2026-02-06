import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/users";
import { NextResponse } from "next/server";

//GET ALL USERS
export const GET = async () => {
  try {
    await connectToDatabase();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("Error fetching users" + error.message, {
      status: 500,
    });
  }
};
