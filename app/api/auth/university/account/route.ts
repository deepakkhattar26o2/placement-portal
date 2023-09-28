import prisma from "@/prisma/PrismaClient";
import { AccountPatchRequest, SignupRequest } from "@/types";
import { University } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";



export async function GET(req: Request) {
  try {
    const session = await getServerSession(authConfig); 
    if(!session || !session.user){
      throw new Error;
    }     
    let uni : University | null = await prisma.university.findFirst({where : {email : String(session.user.email)}})
    if(!uni){
      return NextResponse.json({message : "Invalid Account Token"}, {status : 409});
    }
    return NextResponse.json({acc : uni});
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}


export async function PATCH(req: Request) {
  try {
    const body: AccountPatchRequest = await req.json();
    let update = await prisma.university.update({
      where: { id: body.id },
      data: body,
    });

    return NextResponse.json({message : "success!"})
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
