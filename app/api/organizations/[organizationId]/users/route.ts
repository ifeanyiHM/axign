import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/users";
import { NextRequest, NextResponse } from "next/server";

// GET all users from a specific organization
export const GET = async (
  request: NextRequest,
  context: { params: Promise<{ organizationId: string }> },
) => {
  try {
    await connectToDatabase();

    // Await params in Next.js 15+
    const { organizationId } = await context.params;

    console.log("Received organizationId:", organizationId);

    // Validate organizationId
    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 },
      );
    }

    // Find all users belonging to this organization
    const users = await User.find({ organizationId })
      .select("-password") // Exclude password field for security
      .sort({ createdAt: -1 }); // Sort by newest first

    console.log(
      `Found ${users.length} users for organization ${organizationId}`,
    );

    // Return count along with users
    return NextResponse.json(
      {
        success: true,
        count: users.length,
        organizationId,
        users,
      },
      { status: 200 },
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error in GET /api/organizations/[organizationId]/users:",
      error,
    );
    return NextResponse.json(
      {
        error: "Error fetching users for organization",
        message: error.message,
      },
      { status: 500 },
    );
  }
};
