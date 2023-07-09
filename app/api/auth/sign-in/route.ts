import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import prismadb from '@/lib/prismadb';
import jwt from 'jsonwebtoken';

export async function POST( req: Request ) {
  try {
    const body = await req.json();

    const { email, password } = body;
    if (!email || !password) {
      return new NextResponse("Please provide all fields!", { status: 400 });
    }

    // check user exist
    const user = await prismadb.user.findFirst({ where: {email} })
    if(!user) {
      return new NextResponse("Invalid Credentials!", { status: 400 });
    }

    // check password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if(!validPassword) {
      return new NextResponse("Invalid Credentials!", { status: 400 });
    }

    //create token data
    const tokenDate = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email
    }
    const token = await jwt.sign(tokenDate, process.env.JWT_SECRET!, {expiresIn: '1d'})

    const response = NextResponse.json({
      message: "Login successfully",
      success: true
    })

    // set token to cookies
    response.cookies?.set('token', token, {httpOnly: true})

    return response

  } catch (error) {
    console.log('[USER_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
