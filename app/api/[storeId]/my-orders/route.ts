import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getUserFromHeaders } from "@/actions/get-user-from-header";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


export async function GET( req: Request) {
  try {
    const { userId } = getUserFromHeaders();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // if (!params.addressId) {
    //   return new NextResponse("Address id is required", { status: 400 });
    // }

    const orders = await  prismadb.order.findMany({
      where: { userId },
      include: {
        address: {
          select: { name: true, phone: true, full_address:true, city: true, state: true, pin: true, }
        },
        orderItems: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log({orders})
  
    return NextResponse.json(orders, {headers: corsHeaders});

  } catch (error: any) {
    console.log('[MY_ORDER_GET]', error);
    return new NextResponse(error || 'Internal server error!', { 
      status: error?.response?.status || 500, 
      headers: corsHeaders
    });;
  }
};