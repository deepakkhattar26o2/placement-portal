'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
export const revalidate = 0;
function setAccount(setAcc: any) {
  axios
    .get(`/api/auth/account?id=${1}`)
    .then(({ data }) => {
      setAcc(data.acc);
    })
    .catch((e: Error) => {
      console.log(e.message);
    });
}


export default function Profile() {
  const [acc, setAcc] = useState<any>()
  useEffect(()=>{
    setAccount(setAcc)
  }, [])
  return (
    <div className="flex flex-col h-auto m-10 bg-third p-5 rounded-xl">
      <Link href="/auth/profile/edit">
        <button className="fixed bg-secondary text-third hover:bg-[#0073ff] top-12 right-12 h-10 w-20 rounded-lg m-2">
          Edit
        </button>
      </Link>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="font-bold leading-7 text-3xl  text-gray-900">
            Organization Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
          <div className="my-10 h-[100px] w-[100px] bg-slate-300 rounded-[50%] overflow-hidden">
            Logo Goes Here
          </div>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {acc?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Website
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <a
                  href={"https://"+String(acc?.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {acc?.website}
                </a>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {acc?.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {acc?.about}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
