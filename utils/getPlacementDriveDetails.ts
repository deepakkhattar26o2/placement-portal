import prisma from "@/prisma/PrismaClient";
import { cache } from "react";

export const revalidate = 600;

export const getAllPlacementDrives = cache(async () => {
    let drives = await prisma.placementDrive.findMany();
    return drives;
});

export const getPlacementDrive = cache(async (id : number)=>{
    let drive = await prisma.placementDrive.findFirst({where : {id : id}})
    return drive;
})