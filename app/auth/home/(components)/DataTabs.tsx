import React from "react";
import { SiProcessingfoundation, SiOnlyoffice } from "react-icons/si";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiArchiveRegister } from "react-icons/gi";

interface props {
  title: string;
  logo: any;
  monthlyStat: string;
  color : string;
}


function DataTab({ title, logo, monthlyStat, color }: props) {
  return (
    <div className={`border rounded-lg w-1/4 p-3 mx-2 h-28 flex flex-col justify-between shadow-md ${color}`}>
      <div className="flex justify-between items-center m-2">
        <div>{title}</div>
        <div>{logo}</div>
      </div>
      <div className="m-2">{monthlyStat}</div>
    </div>
  );
}
let TabDetails: props[] = [
  { title: "Drives", logo: <SiOnlyoffice />, monthlyStat: "0", color :  'bg-red-500'},
  { title: "Registrations", logo: <GiArchiveRegister />, monthlyStat: "0", color : 'bg-green-500' },
  { title: "Placements", logo: <SiProcessingfoundation />, monthlyStat: "0", color : 'bg-blue-500' },
  {
    title: "Active Drives",
    logo: <HiOutlineOfficeBuilding />,
    monthlyStat: "0",
    color : "bg-yellow-500"
  },
];

const DataTabs = () => {
  return (
    <div className="flex justify-between mb-5">
      {TabDetails.map((tab, idx) => {
        return (
          <DataTab
            key={idx}
            title={tab.title}
            logo={tab.logo}
            monthlyStat={tab.monthlyStat}
            color={tab.color}
          />
        );
      })}
    </div>
  );
};

export default DataTabs;
