import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import prismadb from '@/lib/prismadb';
import jwt from 'jsonwebtoken';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST( req: Request ) {
  try {
    const body = await req.json();

    const { email, password } = body;
    if (!email || !password) {
      return new NextResponse("Please provide all fields!", { status: 400, headers: corsHeaders });
    }

    // check user exist
    const user = await prismadb.user.findFirst({ where: {email} })
    if(!user) {
      return new NextResponse("Invalid Credentials!", { status: 400, headers: corsHeaders });
    }

    // check password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if(!validPassword) {
      return new NextResponse("Invalid Credentials!", { status: 400, headers: corsHeaders });
    }

    //create token data
    const tokenDate = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      isAdmin: user.isAdmin
    }
    const token = await jwt.sign(tokenDate, process.env.JWT_SECRET!, {expiresIn: '1d'})

    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
      isAdmin: user.isAdmin,
      token,
    },{headers: corsHeaders})

    // set token to cookies
    response.cookies?.set('token', token, {httpOnly: true, expires: Date.now() + 24 * 60 * 60 * 1000})

    return response

  } catch (error) {
    console.log('[USER_POST]', error);
    return new NextResponse("Internal error", { 
      status: 500, 
      headers: corsHeaders
    });
  }
};
