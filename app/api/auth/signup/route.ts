import prisma from "@/prisma/PrismaClient";
import { Company } from "@prisma/client";
import * as bcr from "bcrypt";
import { NextResponse } from "next/server";
interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

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
    const acc: Company | null = await prisma.company.findFirst({
      where: { email: body.email },
    });

    if (acc) {
      return NextResponse.json(
        { message: `An Account with this email/name already exists` },
        { status: 409 }
      );
    }
    body.password = await bcr.hash(body.password, 13);
    let _acc: Company | { password?: any } = await prisma.company.create({
      data: body,
    });
    return NextResponse.json({ message: "Account created" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
