import { getPlacementDrive } from "@/utils/placement";
import Image from "next/image";
export default async function Drive({ params }: any) {
  let drive = await getPlacementDrive(Number(params.id));
  return (
    <div className="flex flex-col h-screen m-10 bg-third p-5 rounded-lg shadow-xl">
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="font-bold leading-7 text-3xl  text-gray-900">
            Drive Information
          </h3>

          <Image
            className="my-10 h-[200px] w-[200px] text-center bg-slate-300 rounded-[50%] overflow-hidden border-2 shadow-lg"
            alt="Logo"
            src={`/D-${drive?.id}-logo.jpg`}
            width={200}
            height={200}
          />
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {drive?.drive_name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Website
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <a
                  href={"https://" + String(drive?.company_website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {drive?.company_website}
                </a>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {drive?.company_website}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 h-44">
                {drive?.job_profile}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
