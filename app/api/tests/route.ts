import { NextRequest, NextResponse } from "next/server";
import data from "@/data/test.json";

export async function GET() {
  return NextResponse.json(data.users);
}

// export async function POST(request: Request) {
//   const newUser = await request.json();
//   data.users.push(newUser);
//   return NextResponse.json(newUser, { status: 201 });
// }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newUser = {
      id: data.users.length + 1,
      name: body.name,
      email: body.email,
      role: body.role,
    };

    // ⚠️ mock only — not persistent
    data.users.push(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    }

    const user = data.users.find((user) => user.id === body.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    if (body.role) user.role = body.role;

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const index = data.users.findIndex((user) => user.id === id);
  if (index !== -1) {
    data.users.splice(index, 1);
    return NextResponse.json({ message: "User deleted successfully" });
  }
  return NextResponse.json({ error: "User not found" }, { status: 404 });
}
