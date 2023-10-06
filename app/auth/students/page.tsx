import prisma from "@/prisma/PrismaClient";
import { Student } from "@prisma/client";
import React from "react";

const getStudentDetails = async () => {
  let students = await prisma.student.findMany();
  return students as Student[];
};

export default async function StudentDetails() {
  const students = await getStudentDetails();
  return (
    <div className="flex flex-col h-screen m-10 bg-third p-5 rounded-lg shadow-xl">
      Student Detail Page!
    </div>
  );
}
