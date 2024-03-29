'use client'
import React, { useEffect, useState } from "react";
import { SiProcessingfoundation, SiOnlyoffice } from "react-icons/si";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiArchiveRegister } from "react-icons/gi";
import prisma from "@/prisma/PrismaClient";
import axios from "axios";

interface props {
  title: string;
  logo: any;
  monthlyStat: number;
  color: string;
}

function DataTab({ title, logo, monthlyStat, color }: props) {
  return (
    <div
      className={`border  rounded-lg w-1/4 p-3 mx-2 h-32 flex flex-col justify-between shadow-md ${color}`}
    >
      <div className="flex justify-between items-center m-2">
        <div>{title}</div>
        <div>{logo}</div>
      </div>
      <div className="m-2">{monthlyStat}</div>
    </div>
  );
}

const DataTabs = () => {
  const [TabDetails, setTabDetails] = useState<props[]>([
    {
      title: "Drives",
      logo: <SiOnlyoffice />,
      monthlyStat: 0,
      color: "bg-red-400",
    },
    {
      title: "Registrations",
      logo: <GiArchiveRegister />,
      monthlyStat: 0,
      color: "bg-green-400",
    },
    {
      title: "Open Drives",
      logo: <SiProcessingfoundation />,
      monthlyStat: 0 ,
      color: "bg-blue-400",
    },
    {
      title: "Ongoing Drives",
      logo: <HiOutlineOfficeBuilding />,
      monthlyStat: 0,
      color: "bg-yellow-400",
    },
  ])

  useEffect(()=>{
    axios.get(`/api/auth/dashboard`).then(
      ({data})=>{
        let {drives, registrations, openDrives, ongoingDrives} = data;
        setTabDetails([
          {
            title: "Drives",
            logo: <SiOnlyoffice />,
            monthlyStat: drives,
            color: "bg-red-400",
          },
          {
            title: "Registrations",
            logo: <GiArchiveRegister />,
            monthlyStat: registrations,
            color: "bg-green-400",
          },
          {
            title: "Open Drives",
            logo: <SiProcessingfoundation />,
            monthlyStat: openDrives ,
            color: "bg-blue-400",
          },
          {
            title: "Ongoing Drives",
            logo: <HiOutlineOfficeBuilding />,
            monthlyStat: ongoingDrives,
            color: "bg-yellow-400",
          },
        ])

      }
    ).catch()

  }, [])

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
