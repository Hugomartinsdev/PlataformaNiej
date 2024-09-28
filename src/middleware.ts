import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./server/jwt";
import { USER_TOKEN } from "./lib/constants";

const PUBLIC_ROUTES = ["/not-found", "/auth/sign-up-temporario"];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const urlSignIn = new URL(`/auth/sign-in`, request.url);

  if (pathname === "/") {
    return NextResponse.redirect(urlSignIn);
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return;
  }

  const sessionTokenCookie = request.cookies.get(USER_TOKEN);

  if (!sessionTokenCookie) {
    if (pathname.includes("/auth")) {
      return;
    }

    return NextResponse.redirect(urlSignIn);
  }

  const sessionToken = decodeToken(sessionTokenCookie.value);

  if (!sessionToken) {
    return NextResponse.redirect(urlSignIn);
  }

  const currentTime = Date.now() / 1000;

  if (sessionToken.exp < currentTime) {
    return NextResponse.redirect(urlSignIn);
  }

  if (pathname.includes("/auth")) {
    return NextResponse.redirect(new URL(`/plataforma`, request.url));
  }

  //TODO: PROTECTED ROUTES BASED ON ROLE OR PERMISSIONS GOES HERE
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
