import prisma from "@/prisma/PrismaClient";
import { SignupRequest } from "@/types";
import { Company } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcr from 'bcrypt'
import * as jwt from 'jsonwebtoken'

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
      delete _acc.password;
      let token = jwt.sign(_acc, String(process.env.JWT_SECRET));
      
      return NextResponse.json({ token : token , message: "Account created" }, { status: 200 });
    } catch (e: any) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }
  