import prisma from "@/prisma/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(r: Request) {
  try {
    const { searchParams } = new URL(r.url);
    if (searchParams.get("overview") == "true") {
      const monthlyDrives = await prisma.placementDrive.groupBy({
        by: ["created_at"],
        _count: {
          created_at: true,
        },
      });

      var _data: { months: any } = {
        months: {
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
        },
      };

      for (const drive of monthlyDrives) {
        const month: string = new Date(drive.created_at).toLocaleString(
          "en-us",
          {
            month: "long",
          }
        );
        _data.months[month]++;
        // data.count.push(drive._count.created_at);
      }
      return NextResponse.json({ _data }, { status: 200 });
    }
    if(searchParams.get("recent")=="true"){
      let recentDrives = await prisma.placementDrive.findMany({
        orderBy: {
          created_at: "desc",
        },
        take : 5,
        include : {
          _count : {
            select : {
              participants : true
            }
          }
        }
      });
      return NextResponse.json({recentDrives}, {status:200});    
    }
    let drives = await prisma.placementDrive.count();
    let registrations = await prisma.studentDrive.count();
    let openDrives = await prisma.placementDrive.count({
      where: {
        closes_at: {
          gt: new Date(),
        },
      },
    });
    let ongoingDrives = await prisma.placementDrive.count({
      where: {
        date_of_drive: {
          gte: new Date(),
        },
      },
    });
    return NextResponse.json(
      { drives, registrations, openDrives, ongoingDrives },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
