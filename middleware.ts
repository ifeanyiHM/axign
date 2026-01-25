import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";

export const config = {
  matcher: ["/api/protected/:path*", "/dashboard/:path*"],
};

export default async function middleware(request: NextRequest) {
  console.log("🔍 Middleware running for:", request.nextUrl.pathname);
  console.log("🍪 Cookies:", request.cookies.getAll());

  const authResult = await authMiddleware(request);
  console.log("🔐 Auth result:", authResult);

  if (!authResult.isValid) {
    console.log("❌ Redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("✅ Allowing access");
  return NextResponse.next();
}
