import prisma from "@/prisma/PrismaClient";
import { StudentPatchRequest } from "@/types";
import { Student } from "@prisma/client";
import { NextResponse } from "next/server";
import { authDetails } from "../../../(helpers)/auth";

export async function GET(r: Request) {
  try {
    const { searchParams } = new URL(r.url);
    if (!searchParams.has("type")) {
      return NextResponse.json(
        { message: "Missing Request Type" },
        { status: 400 }
      );
    }
    if (searchParams.get("type") == "id") {
      let _id = Number(searchParams.get("id"));
      let _acc: Student | null | { password?: string } =
        await prisma.student.findFirst({ where: { id: _id } });
      delete _acc?.password;
      return NextResponse.json({ acc: _acc });
    } else {
      let _accs = await prisma.student.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          uid: true,
          password: false,
        },
      });

      return NextResponse.json({ accs: _accs });
    }
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PATCH(r : Request){
  try{
    const body : StudentPatchRequest = await r.json();
    const _user = authDetails(r);
    let _update = await prisma.student.update({where : {id : _user.id}, data : body});
    return NextResponse.json({message : "Data updated successfully!"}) 
  }
  catch(e : any){
    return NextResponse.json({message : e.message}, {status : 500});
  }
}