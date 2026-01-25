import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  return NextResponse.json({ message: "Logged out successfully" });
};
