"use client";
import { PlacementDriveRequest } from "@/types";
import { useState } from "react";

interface HTPROPS {
  text: string;
}
function HelpText({ text }: HTPROPS) {
  return <p className="text-gray-600 text-xs italic">{text}</p>;
}

interface IFPROPS{
  placeholder : string
  type : string
  text : string
}

function InputContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-around  py-3">{children}</div>;
}


export default function CreatePage() {
  const [data, setData] = useState<PlacementDriveRequest>();
  return (
    <div className="flex flex-col h-auto m-10 bg-third p-5 rounded-xl shadow-xl">
      <div className="text-3xl font-bold">Create Drive</div>
      <form className=" p-10 flex flex-col">
        <InputContainer>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Name" type="text" className="!outline-none p-1"/>
            <HelpText text="Name for this placement drive" />
          </div>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Positions" type="text" className="!outline-none p-1"/>
            <HelpText text="Posititons Offered (Comma Seperated)" />
          </div>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Skills" type="text" className="!outline-none p-1"/>
            <HelpText text="Good to have skills (Comma Seperated)" />
          </div>
        </InputContainer>

        <InputContainer>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="CGPA" type="number" className="!outline-none p-1"/>
            <HelpText text="CGPA Cutoff" />
          </div>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Matric Cutoff" type="number" className="!outline-none p-1"/>
            <HelpText text="10th Class Result Cutoff" />
          </div>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="HSC Cutoff" type="number" className="!outline-none p-1"/>
            <HelpText text="12th Class Result Cutoff" />
          </div>
        </InputContainer>

        <InputContainer>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Batch" type="number" className="!outline-none p-1"/>
            <HelpText text="Batch Required" />
          </div>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Process" type="text"className="!outline-none p-1" />
            <HelpText text="Placement Process" />
          </div>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Pay" type="text" className="!outline-none p-1" />
            <HelpText text="Pay Package Description" />
          </div>
        </InputContainer>

        <InputContainer>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Stream" type="text" className="!outline-none p-1"/>
            <HelpText text="Stream Required" />
          </div>
          <div className="shadow-lg border-2 rounded-lg" >
            <input placeholder="Backlogs" type="number" className="!outline-none p-1"/>
            <HelpText text="Number of Backlogs allowed" />
          </div>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Criteria" type="text" className="!outline-none p-1"/>
            <HelpText text="Other Eligibility Criteria" />
          </div>
        </InputContainer>

        <InputContainer>
          <div className="shadow-lg border-2 rounded-lg ">
            <input placeholder="Drive Type" type="text" className="!outline-none p-1" />
            <HelpText text="Virtual/On-Campus" />
          </div>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="Location" type="text" className="!outline-none p-1" />
            <HelpText text="Job Locations Available" />
          </div>
          <div className="shadow-lg border-2 rounded-lg">
            <input placeholder="bond" type="text" className="!outline-none p-1"/>
            <HelpText text="Bond Description (if any)" />
          </div>
        </InputContainer>

        <div className="my-5 w-fit self-center shadow-lg border-2 rounded-lg">
          <input placeholder="Date" type="date" className="!outline-none p-1"/>
          <HelpText text="Start Date of Drive" />
        </div>

        <div className="flex justify-center py-5">
          <textarea
            placeholder="Job Profile/Description"
            className="!outline-none h-28 w-[75%] shadow-lg border-2 rounded-lg p-1 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          />
        </div>
        <button type="submit" className="bg-secondary text-third hover:bg-[#0073ff] h-10 w-20 rounded-lg m-2 self-center">Create</button>
      </form>
    </div>
  );
}
