import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import prismadb from '@/lib/prismadb';

export async function POST( req: Request ) {
  try {
    const body = await req.json();

    const { name, email, password } = body;
    if (!name || !email || !password) {
      return new NextResponse("Please provide all fields!", { status: 400 });
    }

    const user = await prismadb.user.findFirst({ where: {email} })
    if(user) {
      return new NextResponse("User already exists!", { status: 400 });
    }
    // has password 
    const salt = await bcryptjs.genSalt(10);
    const hasPassword = await bcryptjs.hash(password, salt);

    const newUser = await prismadb.user.create({
      data: {
        name, 
        email, 
        password: hasPassword
      }
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log('[USER_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
