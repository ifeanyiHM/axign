import connectToDatabase from "@/lib/db";
import Organization from "@/lib/modals/organization";
import User from "@/lib/modals/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const organizations = await Organization.find();
    return new NextResponse(JSON.stringify(organizations), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("Error fetching organizations" + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newOrganizationName } = body;

    if (!userId || !newOrganizationName) {
      return NextResponse.json(
        { error: "User ID and new organization name are required" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    // Find the user making the request
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user is a CEO
    if (user.userStatus !== "ceo") {
      return NextResponse.json(
        { error: "Only CEOs can update organization name" },
        { status: 403 },
      );
    }

    // Update the organization
    const updatedOrganization = await Organization.findByIdAndUpdate(
      user.organizationId,
      { name: newOrganizationName },
      { new: true, runValidators: true },
    );

    if (!updatedOrganization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Organization name updated successfully",
        organization: updatedOrganization,
      },
      { status: 200 },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handle duplicate organization name error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Organization name already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
