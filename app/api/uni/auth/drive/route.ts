import prisma from "@/prisma/PrismaClient";
import { DrivePatchRequest, PlacementDriveRequest } from "@/types";
import { NextResponse } from "next/server";

function validate(body: PlacementDriveRequest): [boolean, string] {
  if (!body.company_name) return [false, "company name"];
  if (!body.company_about) return [false, "about company"];
  if (!body.company_website) return [false, "company website"];
  if (!body.drive_name) return [false, "name"];
  if (!body.batch_requried) return [false, "batch"];
  if (!body.bond) return [false, "bond"];
  if (!body.closes_at) return [false, "closing time"];
  if (!body.date_of_drive) return [false, "date of drive"];
  if (!body.current_cgpa_cutoff) return [false, "current cgpa cutoff"];
  if (!body.matric_result_cutoff) return [false, "matric cgpa cutoff"];
  if (!body.hsc_result_cutoff) return [false, "hsc cgpa cutoff"];
  if (body.allowed_backlogs === undefined)
    return [false, "current cgpa cutoff"];
  if (!body.job_location) return [false, "job location"];
  if (!body.job_profile) return [false, "job profile"];
  if (!body.pay_package) return [false, "pay package"];
  if (!body.placement_process) return [false, "placement process"];
  if (!body.positions) return [false, "positions"];
  if (!body.skills_required) return [false, "skills required"];
  if (!body.stream_required) return [false, "stream required"];
  if (!body.type_of_drive) return [false, "type of drive"];
  return [true, "success"];
}

export async function POST(req: Request) {
  try {
    const body: PlacementDriveRequest = await req.json();
    const validation = validate(body);
    if (!validation[0]) {
      return NextResponse.json(
        { message: `Missing/Invalid ${validation[1]}` },
        { status: 400 }
      );
    }
    let drive = await prisma.placementDrive.create({ data: body });
    return NextResponse.json({ message: "Drive created successfully!" });
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body: DrivePatchRequest = await req.json();
    let update = await prisma.placementDrive.update({
      where: { id: body.id },
      data: body,
    });
    return NextResponse.json({ message: "Drive Updated Successfully" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");
    if (Number(id)) {
      //case for a selective drive
      let drive = await prisma.placementDrive.findFirst({
        where: { id: Number(id) },
      });
      return NextResponse.json({ drive: drive });
    } else if (id == "all") {
      //drive history
      let drives = await prisma.placementDrive.findMany();
      return NextResponse.json({ drives: drives });
    } else {
      //latest drive
      let drives = await prisma.placementDrive.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 1,
      });
      return NextResponse.json({ drive: drives[0] });
    }
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
