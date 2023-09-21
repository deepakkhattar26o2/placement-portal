"use client";

import { PlacementDriveRequest } from "@/types";
import { FormEvent, useState } from "react";

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
};

const _format = (text : string) : string[]=>{
  let arr = text.split(',').map(ele=>ele.replace(/ /g, ""))
  return arr;
}

export default function CreateDrivePage() {
  const [driveData, setDriveData] = useState<PlacementDriveRequest | any>();
  const [positions, setPositions] = useState("");
  const [skills, setSkills] = useState("");
  return (
    <div className="flex flex-col h-auto m-10 bg-third p-5 rounded-lg shadow-xl">
      <div className="text-3xl font-bold">Create Drive</div>
      <form className="p-10 flex flex-col" onSubmit={handleSubmit}>
        <div className="shadow-lg rounded-lg p-6 border-2 bg-slate-100 mb-4">
          <div className="mb-4 font-semibold text-slate-500">
            Company Details
          </div>
          <div className="flex justify-evenly">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Company Name
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Company Name"
                onChange={(e) => {
                  setDriveData({ ...driveData, company_name: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                About Company
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Company About"
                onChange={(e) => {
                  setDriveData({ ...driveData, company_about: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Company Website
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Company Website"
                onChange={(e) => {
                  setDriveData({
                    ...driveData,
                    company_website: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="shadow-lg rounded-lg p-6 border-2 bg-slate-100 mb-4">
          <div className="mb-4 font-semibold text-slate-500">Drive Details</div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Drive Name
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Drive Name"
                onChange={(e) => {
                  setDriveData({ ...driveData, drive_name: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Type of Drive
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Type"
                onChange={(e) => {
                  setDriveData({ ...driveData, type_of_drive: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Drive Start Date
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="date"
                placeholder="Date"
                onChange={(e) => {
                  setDriveData({ ...driveData, date_of_drive: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Bond
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Bond Description"
                onChange={(e) => {
                  setDriveData({ ...driveData, bond: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Placement Process
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                onChange={(e) => {
                  setDriveData({
                    ...driveData,
                    placement_process: e.target.value,
                  });
                }}
                placeholder="Brief Description"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Form Close Date
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="date"
                placeholder="Close Date"
                onChange={(e) => {
                  setDriveData({ ...driveData, closes_at: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Positions
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Positions offered"
                onChange={(e) => {
                  setDriveData({ ...driveData, positions: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Skills Required
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Good to have skills"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Stream Required
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Stream"
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                CGPA Cutoff
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="number"
                placeholder="Current CGPA Cutoff"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Matric Cutoff
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="number"
                placeholder="10th Result in %"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Intermediate Cutoff
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="number"
                placeholder="12th Result in %"
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Other Eligibilty Criteria
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Criteria"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Allowed Backlogs
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="number"
                placeholder="No. of Backlogs"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Batch
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Batch Required(year)"
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Job Locations
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Job Locations"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Job Profile
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Job Profile"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Pay Package
              </label>
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Pay Package Description"
              />
            </div>
          </div>
        </div>
        <div className="shadow-lg rounded-lg p-6 border-2 bg-slate-100 mb-4">
          <div className="mb-4 font-semibold text-slate-500">Attachments</div>
          <div className="flex justify-evenly">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Company Logo
              </label>

              <input
                type="file"
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight bg-white"
                accept=".jpg, .jpeg, .png"
                placeholder="Company Logo"
                onChange={(e) => {
                  if (e.target.files) {
                    // setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Job Description
              </label>

              <input
                type="file"
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight bg-white"
                accept=".pdf"
                placeholder="Job Description"
                onChange={(e) => {
                  if (e.target.files) {
                    // setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          
          </div>
        </div>
        <button
          type="submit"
          className="flex w-auto self-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#0073ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </form>
    </div>
  );
}
