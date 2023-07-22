import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import prismadb from '@/lib/prismadb';

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

    const { name, email, password } = body;
    if (!name || !email || !password) {
      return new NextResponse("Please provide all fields!", { status: 400, headers: corsHeaders });
    }

    const user = await prismadb.user.findFirst({ where: {email} })
    if(user) {
      return new NextResponse("User already exists!", { status: 400, headers: corsHeaders });
    }
    // has password 
    const salt = await bcryptjs.genSalt(10);
    const hasPassword = await bcryptjs.hash(password, salt);

    await prismadb.user.create({
      data: {
        name, 
        email, 
        password: hasPassword
      }
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    },{ headers: corsHeaders });
  } catch (error) {
    console.log('[USER_POST]', error);
    return new NextResponse("Internal error", { status: 500, headers: corsHeaders });
  }
};
