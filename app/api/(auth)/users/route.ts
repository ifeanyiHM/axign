import connectToDatabase from "@/lib/db";
import Organization from "@/lib/modals/organization";
import User from "@/lib/modals/users";
import { NextResponse } from "next/server";

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

// export const POST = async (request: Request) => {
//   try {
//     const body = await request.json();
//     const { email, username, password, userStatus } = body;
//     console.log("REQUEST BODY:", body);

//     await connectToDatabase();

//     let organizationId;

//     if (userStatus === "ceo") {
//       if (!body.organizationName) {
//         return NextResponse.json(
//           { error: "Organization name is required for CEO" },
//           { status: 400 },
//         );
//       }
//       console.log("ORG MODEL:", Organization);

//       const organization = await Organization.create({
//         name: body.organizationName,
//       });

//       organizationId = organization._id;
//     }

//     if (userStatus === "employee") {
//       if (!body.organizationId) {
//         return NextResponse.json(
//           { error: "Organization selection is required" },
//           { status: 400 },
//         );
//       }

//       organizationId = body.organizationId;
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = await User.create({
//       email,
//       username,
//       password: hashedPassword,
//       userStatus,
//       organizationId,
//     });

//     return NextResponse.json(
//       { message: "User created successfully", user },
//       { status: 201 },
//     );
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

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
