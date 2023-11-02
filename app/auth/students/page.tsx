import prisma from "@/prisma/PrismaClient";
import { Student } from "@prisma/client";
import Image from "next/image";
import React from "react";

const getStudentDetails = async () => {
  let students = await prisma.student.findMany();
  return students as Student[];
};

export default async function StudentDetails() {
  const students = await getStudentDetails();
  if (students.length == 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen m-10 bg-third p-5 rounded-lg shadow-xl">
        No Students Registered!
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center h-screen m-10 bg-third p-5 rounded-lg shadow-xl">
      <div className="font-bold mb-5 leading-7 text-3xl  text-gray-900">
        Student Details
      </div>  

      <ul role="list" className="divide-y overflow-auto w-1/2 divide-gray-100">
        {students.map((student) => (
          <li
            key={student.id}
            className="flex hover:bg-hover_secondary shadow-md bg-secondary text-white transition-all duration-300  p-3 rounded-2xl hover:rounded-lg border mt-2 justify-between gap-x-6 "
          >
            <div className="flex min-w-0 gap-x-4">
              {/* <img
                width={100}
                height={100}
                className="flex-none rounded-full bg-gray-50"
                src={person.imageUrl}
                alt=""
              /> */}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 ">
                  {student.first_name + " " + student.last_name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 ">
                  {student.university_email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 ">{student.uid}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
