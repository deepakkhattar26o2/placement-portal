import prisma from "@/prisma/PrismaClient";
import { CurrentUser, StudentPatchRequest } from "@/types";
import { Student } from "@prisma/client";
import { NextResponse } from "next/server";
import { authDetails } from "../../(helpers)/auth";
import { saveFile } from "../../(helpers)/upload";

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
interface FileUploadConfig {
  has_matric_attachment?: boolean;
  has_hsc_attachment?: boolean;
  has_pfp_attachment?: boolean;
  has_resume1_attachment?: boolean;
  has_resume2_attachment?: boolean;
  has_resume3_attachment?: boolean;
}
export async function PATCH(r: Request) {
  try {
    let user: CurrentUser = authDetails(r);
    const fdata = await r.formData();
    let fileConfig : FileUploadConfig = {};
    let resume1: File | null = fdata.get("resume_1") as File;
    let resume2: File | null = fdata.get("resume_2") as File;
    let resume3: File | null = fdata.get("resume_3") as File;
    let matricResult : File | null = fdata.get("matric_result") as File;
    let hscResult : File | null = fdata.get("hsc_result") as File;
    let pfp : File | null = fdata.get("pfp") as File;
    if (resume1) {
      // await saveFile(companyLogo, `D-${drive.id}-logo`);
      // fileUpdateConfig.has_logo_attachment = true;
    }
    if(resume2){

    }
    if(resume3){

    }
    if(matricResult){

    }
    if(hscResult){

    }
    if(pfp){
      
    }
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
