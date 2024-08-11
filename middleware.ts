import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request: NextRequest) {
  const cookies = request.cookies.get("token");
  console.log("cookies==>", cookies);
  if (request.url.includes("/login")) {
    if (cookies && cookies.value) {
      try {
        const { payload } = await jwtVerify(
          cookies!.value,
          new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY!)
        );
        if (payload.email) {
          return NextResponse.redirect(new URL("/overview", request.url));
        }
      } catch (error) {
        return;
      }
    }
    return;
  } else {
    try {
      const { payload } = await jwtVerify(
        cookies!.value,
        new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY!)
      );

      if (!payload.email) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (!cookies || !cookies.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|register).*)",
  ],
};
