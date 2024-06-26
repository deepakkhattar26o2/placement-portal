import prisma from "@/prisma/PrismaClient";

export const getAllPlacementDrives = async () => {
  let drives = await prisma.placementDrive.findMany({
    select: {
      id: true,
      drive_name: true,
      company_name: true,
      created_at: true,
      _count: { select: { participants: true } },
    },
  });
  return drives;
}

export const getPlacementDrive = async (id: number) => {
  let drive = await prisma.placementDrive.findFirst({
    where: { id: id },
    include: {
      _count: { select: { participants: true } },
    },
  });
  return drive;
}

export const getRecentPlacementDrives = async () => {
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
  return recentDrives;
}
