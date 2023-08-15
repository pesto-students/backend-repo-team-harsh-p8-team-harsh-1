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


export async function DELETE( req: Request, { params }: { params: { addressId: string } } ) {
  try {
    const { userId } = getUserFromHeaders();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.addressId) {
      return new NextResponse("Address id is required", { status: 400 });
    }

    const address = await prismadb.address.delete({
      where: {
        id: params.addressId,
      }
    });
  
    return NextResponse.json(address, {headers: corsHeaders});
  } catch (error: any) {
    console.log('[ADDRESS_DELETE]', error);
    return new NextResponse(error || 'Internal server error!', { 
      status: error?.response?.status || 500, 
      headers: corsHeaders
    });;
  }
};


export async function PATCH( req: Request, { params }: { params: { addressId: string } } ) {
  try {   
    const { userId } = getUserFromHeaders();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    if (!params.addressId) {
      return new NextResponse("Address id is required", { status: 400 });
    }
    // TODO: Validate the request data
    const payload = await req.json();
    
    if (!payload?.name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!payload?.city) {
      return new NextResponse("City is required", { status: 400 });
    }
    if (!payload?.phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }
    if (!payload?.state) {
      return new NextResponse("State required", { status: 400 });
    }
    if (!payload?.pin) {
      return new NextResponse("Pin required", { status: 400 });
    }
    if (!payload?.full_address) {
      return new NextResponse("Full address required", { status: 400 });
    }

    const address = await prismadb.address.update({
      where: {
        id: params.addressId,
      },
      data: {
        ...payload
      }
    });
  
    return NextResponse.json(address, {headers: corsHeaders});
  } catch (error: any) {
    console.log('[ADDRESS_PATCH]', error.status);
    return new NextResponse(error || 'Internal server error!', { 
      status: error?.response?.status || 500, 
      headers: corsHeaders
    });
  }
};
