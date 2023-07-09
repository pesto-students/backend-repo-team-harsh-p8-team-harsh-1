import { NextResponse } from "next/server";
import type { NextRequest} from "next/server";

export function middleware (request: NextRequest){
  const path = request.nextUrl.pathname
  console.log("middleware", path);

  const isPublicPath = path === '/sign-in' || path === '/sign-up';
  const token = request.cookies.get('token')?.value || '';

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if(!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',],
};
