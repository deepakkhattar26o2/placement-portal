import { getAllPlacementDrives } from "@/utils/placement";
import { PlacementDrive } from "@prisma/client";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

interface DriveProps {
  drive: {
    id : number,
    drive_name : string,
    company_name : string,
    created_at : Date
  } & {
    _count: {
      participants: number;
    };
  };
}

const DriveTab = ({ drive }: DriveProps) => {
  return (
    <Link
      href={`/auth/drives/${drive.id}`}
      className="hover:shadow-xl shadow-md bg-gray-100 transition-all duration-300  p-3 rounded-md border flex mb-5 justify-between"
    >
      <div className="flex">
        <Image
          className="mx-2 text-center bg-slate-300 rounded-[50%] overflow-hidden border shadow-lg"
          alt="Logo"
          src={`/D-${drive?.id}-logo.jpg`}
          width={50}
          height={50}
        />
        <div>
          <div className="text-lg font-bold text-gray-900">
            {drive.company_name}
          </div>
          <div className="text-sm font-semibold text-gray-500">
            {drive.drive_name}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="font-sm font-semibold text-gray-900">
          {moment(drive.created_at).format("DD/MM/YY")}
        </div>
        <div className="font-bold text-gray-500">
          {drive._count?.participants || 0} Students
        </div>
      </div>
    </Link>
  );
};

export default async function Drives() {
  let drives = await getAllPlacementDrives();
  return (
    <div className="flex flex-col items-center w-full h-screen m-10 bg-third p-5 rounded-lg shadow-xl">
      <div className="font-bold leading-7 text-3xl  text-gray-900">
        All Drives
      </div>
      <div className="w-1/2 p-12">
        {drives.map((drive) => (
          <div key={drive.id}>
            <DriveTab drive={drive} />
          </div>
        ))}
      </div>
    </div>
  );
}
