import connectToDatabase from "@/lib/db";
import Organization from "@/lib/modals/organization";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const organization = await Organization.find();
    return new NextResponse(JSON.stringify(organization), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("Error fetching organizations" + error.message, {
      status: 500,
    });
  }
};
