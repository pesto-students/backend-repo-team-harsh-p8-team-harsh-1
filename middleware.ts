import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest} from "next/server";

export async function middleware (request: NextRequest){
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/sign-in' || path === '/sign-up';
  
  // verify jwt token
  const token = request.cookies.get('token')?.value;
  const verifiedToken = token && (await verifyJwtToken(token))

  if(!verifiedToken && !isPublicPath){
    const response = NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    response.cookies.delete('token')
    return response;
  }

  if(isPublicPath && verifiedToken) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

}

async function verifyJwtToken(token: string): Promise<Boolean> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return !!payload;
  } catch (error) {
    console.log('[jwtVerify]',error);
    return false;
  }
}

export const config = {
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',],
};
