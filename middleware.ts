import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/register"],
};
