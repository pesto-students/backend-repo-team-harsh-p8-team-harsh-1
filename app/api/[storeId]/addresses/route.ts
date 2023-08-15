import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getUserFromHeaders } from "@/actions/get-user-from-header";

interface payload {
  name: string;
  phone: string;
  city: string;
  state: string;
  pin: string;
  full_address: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST( req: Request ) {
  const address:payload = await req.json();
  const { userId } = getUserFromHeaders();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  if (!address?.name) {
    return new NextResponse("Name is required", { status: 400 });
  }
  if (!address?.city) {
    return new NextResponse("City is required", { status: 400 });
  }
  if (!address?.phone) {
    return new NextResponse("Phone is required", { status: 400 });
  }
  if (!address?.state) {
    return new NextResponse("State required", { status: 400 });
  }
  if (!address?.pin) {
    return new NextResponse("Pin required", { status: 400 });
  }
  if (!address?.full_address) {
    return new NextResponse("Full address required", { status: 400 });
  }

  const newAddress = await prismadb.address.create({
    data: {
      userId,
      ...address
    },
  });

  return NextResponse.json(newAddress, {
    headers: corsHeaders
  });
};


export async function GET( req: Request ) {

  try {
    const { userId } = getUserFromHeaders();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    
    const address = await prismadb.address.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(address,  {
      headers: corsHeaders
    });

  } catch (error) {
    console.log('[ADDRESS_GET]', error);
    return new NextResponse("Internal error", { status: 500, headers: corsHeaders });
  }
};