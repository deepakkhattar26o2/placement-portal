"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaRegChartBar, FaPlus, FaHome, FaUserAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

function SideBarIcon({ icon, text, selectedProp }: any) {
  return (
    <div
      className={`relative flex items-center justify-center
      ${
        selectedProp
          ? "bg-third text-secondary rounded-xl"
          : "bg-secondary text-third rounded-3xl"
      }
     h-12 my-3 w-12 mx-auto shadow-xl 
     hover:rounded-xl hover:bg-third hover:text-secondary
     transition-all duration-300 cursor-pointer group`}
    >
      {icon}
      <span
        className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
    text-white bg-gray-900 
    text-xs font-bold 
    transition-all duration-100 scale-0 origin-center group-hover:scale-100"
      >
        {text}
      </span>
    </div>
  );
}

let temp = [
  [<FaHome size="22" />, "Home", "home"],
  [<FaPlus size="22" />, "Create Drive", "create"],
  [<FaRegChartBar size="22" />, "Current Drive", "current"],
  [<FaUserAlt size="22" />, "Profile", "profile"],
];
function setValidId(path: string, setId: any) {
  if(path.includes('home')) setId(0);
  else if(path.includes('create')) setId(1);
  else if(path.includes('current')) setId(2);
  else if(path.includes('profile')) setId(3);
}
function SideBar() {
  const [id, setId] = useState<number>();
  const pathname = usePathname();
  if (id==undefined) {
    setValidId(pathname, setId);
  }
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 m-0
        flex flex-col bg-black shadow-sm shadow-white 
        "
    >
      {temp.map((ele, idx) => {
        return (
          <Link
            href={`/auth/${ele[2]}`}
            key={idx}
            onClick={() => {
              console.log(idx);
              setId(idx);
            }}
          >
            <SideBarIcon icon={ele[0]} text={ele[1]} selectedProp={id == idx} />
          </Link>
        );
      })}
    </div>
  );
}
export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col pl-16 h-screen w-auto bg-gray-200">
      <SideBar />
      {children}
    </div>
  );
}
