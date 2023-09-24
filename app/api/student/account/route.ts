import prisma from "@/prisma/PrismaClient";
import { Student } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
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
