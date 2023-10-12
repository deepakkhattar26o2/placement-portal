import { getAllPlacementDrives } from "@/utils/getPlacementDriveDetails";
import { PlacementDrive } from "@prisma/client";
import moment from "moment";
import Link from "next/link";
interface DriveProps {
  drive: PlacementDrive;
}

const DriveTab = ({ drive }: DriveProps) => {
  return (
    <Link
      href={`/auth/drives/${drive.id}`}
      className="bg-secondary p-3 rounded-md text-white flex mb-5 justify-between"
    >
      <div>
        <div className="text-lg font-bold">{drive.company_name}</div>
        <div className="text-sm font-semibold text-slate-800">
          {drive.drive_name}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="font-bold">Created At</div>
        <div className="font-sm font-semibold text-slate-800">
          {moment(drive.created_at).format("DD/MM/YY")}
        </div>
      </div>
    </Link>
  );
};

export default async function Drives() {
  let drives: PlacementDrive[] = await getAllPlacementDrives();
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
