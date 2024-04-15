import { NextResponse } from "next/server";
import { authDetails } from "../../(helpers)/auth";
import prisma from "@/prisma/PrismaClient";

interface StudentDriveRequest {
  selected_resume: string;
  selected_position: string;
  drive_id: number;
}

export async function POST(r: Request) {
  try {
    const _user = authDetails(r);
    const body: StudentDriveRequest = await r.json();
    const studentDrive = await prisma.studentDrive.create({
      data: {
        student_id: _user.id,
        selected_position: body.selected_position,
        selected_resume: body.selected_resume,
        drive_id: body.drive_id,
      },
    });
    return NextResponse.json({ message: "Registered Successfully!" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function GET(r: Request) {
  try {
    const { searchParams } = new URL(r.url);
    const _user = authDetails(r);
    if (!searchParams.get("type")) {
      return NextResponse.json({ message: "search type query missing!" });
    } else if (searchParams.get("type") == "id") {
      const _drive = await prisma.placementDrive.findFirst({
        where: {
          id: Number(searchParams.get("id")),
        },
      });
      return NextResponse.json({ drive: _drive });
    } else if (searchParams.get("type") == "user") {
      const uid = searchParams.get("id");
      const drives = await prisma.studentDrive.findMany({
        where: {
          student_id: Number(uid),
        },
        include: {
          drive: true,
        },
      });
      return NextResponse.json({drives : drives}, {status: 200})
    } else {
      const allDrives = await prisma.placementDrive.findMany();
      return NextResponse.json({ drives: allDrives }, {status : 200});
    }
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
