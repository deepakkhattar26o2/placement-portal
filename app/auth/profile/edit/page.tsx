"use client";
import { Company } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AccountPatchRequest } from "@/types";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

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

function updateAccount(data: AccountPatchRequest, router: AppRouterInstance) {
  axios
    .patch("/api/auth/account", data)
    .then(() => {
      router.push('/auth/profile');
    })
    .catch((e: Error) => {
      console.log(e.message);
      toast.error("Something went wrong", { autoClose: 1000 });
    });
}

export default function Profile() {
  const [acc, setAcc] = useState<Company | any>();
  const router = useRouter();
  useEffect(() => {
    setAccount(setAcc);
  }, []);
  return (
    <div className="flex flex-col h-auto m-10 bg-third p-5 rounded-xl">
      <div className="fixed top-12 right-12 flex flex-col ">
        <button
          className="bg-secondary text-third hover:bg-[#0073ff] h-10 w-20 rounded-lg m-2"
          onClick={() => {
            updateAccount(acc, router);
          }}
        >
          Save
        </button>
        <button
          className="bg-red-500 text-third hover:bg-[#ff6464] h-10 w-20 rounded-lg m-2"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </button>
      </div>
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
              <input
                className="mt-1 p-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                defaultValue={acc?.name}
                required
                onChange={(e)=>{setAcc({...acc, name : e.target.value})}}
                placeholder="Organization's Name"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Website
              </dt>
              <input
                className="mt-1 p-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                defaultValue={acc?.website}
                onChange={(e)=>{setAcc({...acc, website : e.target.value})}}
                placeholder="Organization's Website"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <input
                className="p-1 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                defaultValue={acc?.email}
                placeholder="Email"
                required
                onChange={(e)=>{setAcc({...acc, email : e.target.value})}}
                type="email"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 h-16">
                About
              </dt>
              <textarea
                className="p-1 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                defaultValue={acc?.about || ""}
                onChange={(e)=>{setAcc({...acc, about : e.target.value})}}
                placeholder="About your Organization"
              />
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
