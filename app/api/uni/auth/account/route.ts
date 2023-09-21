import prisma from "@/prisma/PrismaClient";
import { AccountPatchRequest, SignupRequest } from "@/types";
import { University } from "@prisma/client";
import * as bcr from "bcrypt";
import * as jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";

function validate(body: SignupRequest): [boolean, string] {
  if (!body.email || !body.email.endsWith("gmail.com")) return [false, "email"];
  if (!body.password) return [false, "password"];
  if (!body.name) return [false, "name"];
  return [true, "success"];
}

export async function POST(req: Request) {
  try {
    const body: SignupRequest = await req.json();
    //validate request body
    const validation = validate(body);
    if (!validation[0]) {
      return NextResponse.json(
        { message: `Missing/Invalid ${validation[1]}` },
        { status: 400 }
      );
    }
    //check for existing account
    const acc: University | null = await prisma.university.findFirst({
      where: { email: body.email },
    });

    if (acc) {
      return NextResponse.json(
        { message: `An Account with this email/name already exists` },
        { status: 409 }
      );
    }
    body.password = await bcr.hash(body.password, 13);
    let _acc: University | { password?: any } = await prisma.university.create({
      data: body,
    });
    delete _acc.password;
    let token = jwt.sign(_acc, String(process.env.JWT_SECRET));
    
    return NextResponse.json({ token : token , message: "Account created" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

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