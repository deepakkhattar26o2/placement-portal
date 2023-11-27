import prisma from "@/prisma/PrismaClient";
import { Student } from "@prisma/client";
import { cache } from "react";

export const revalidate = 600;

export const getAllStudentDetails = cache(async () => {
  let details = await prisma.student.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      uid: true,
      university_email: true,
      created_at: true,
      _count: {
        select: {
          drives: true,
        },
      },
    },
  });
  return details;
});

export const getStudentDetailsById = cache(async (id: number) => {
  let student: Student | null = await prisma.student.findFirst({
    where: { id: id },
  });
  return student;
});
