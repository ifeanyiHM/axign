import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function authMiddleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  // console.log("Token from cookie:", token);

  if (!token) {
    return { isValid: false };
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    console.log("Token verified:", payload);
    return { isValid: true };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log("Token verification failed:", error);
    return { isValid: false };
  }
}
