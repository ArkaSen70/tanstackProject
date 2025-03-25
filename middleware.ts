import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  console.log(token, "dsfghj");
  if (!token) {
    console.log("cxvbhnjkl,");

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  console.log("Token found, proceeding to next response");

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cms/list",
    "/cms/create_product",
    "/auth/profile",
    "/auth/update_password",
  ],
};