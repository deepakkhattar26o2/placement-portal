import prisma from "@/prisma/PrismaClient";
import { StudentSignupRequest } from "@/types";
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import * as bcr from "bcrypt";
import { Role, Student } from "@prisma/client";

const validate = (b: StudentSignupRequest): [boolean, string] => {
  var field = "";
  if (!b.first_name) field = "fist name";
  else if (!b.last_name) field = "last name";
  else if (!b.password) field = "password";
  else if (!b.uid) field = "uid";
  else if (!b.university_email || !b.university_email.endsWith("@gmail.com"))
    field = "email";
  if (field) {
    return [false, field];
  }
  return [true, ""];
};

export async function POST(r: Request) {
  try {
    var data: StudentSignupRequest & { role: Role } = await r.json();

    const validation: [boolean, string] = validate(data);

    if (!validation[0]) {
      return NextResponse.json(
        { message: `Missing/Invalid ${validation[1]}` },
        { status: 400 }
      );
    }

    let existingStudent = await prisma.student.findFirst({
      where: {
        OR: [
          {
            university_email: data.university_email,
          },
          {
            uid: data.uid,
          },
        ],
      },
    });

    if (existingStudent) {
      return NextResponse.json(
        {
          message: `An Account with ${data.university_email} already exists`,
        },
        { status: 409 }
      );
    }

    data.password = await bcr.hash(
      data.password,
      Number(process.env.BCR_SALTS)
    );
    data.role = Role.STUDENT;

    let student: Student | null | { password?: string } =
      await prisma.student.create({ data: data });

    delete student.password;

    let token = jwt.sign(student, String(process.env.JWT_SECRET_KEY));
    return NextResponse.json({ token: token, data: student });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
