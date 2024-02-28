import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/", "/index"],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    if (authValue) {
      const [user, pwd] = atob(authValue).split(":");

      if (user === process.env.USERNAME && pwd === process.env.PASSWORD) {
        return NextResponse.next();
      }
    }
  }
  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
}
