import prisma from "@/prisma/PrismaClient";
import { AccountPatchRequest, SignupRequest } from "@/types";
import { University } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");
    if (Number(id) || Number(id)==0) {
      let acc = await prisma.university.findFirst({ where: { id: Number(id) } });
      return NextResponse.json({ acc: acc });
    } else {
      return NextResponse.json(
        { message: "Invalid Account Id" },
        { status: 400 }
      );
    }
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
