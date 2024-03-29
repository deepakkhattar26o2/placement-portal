"use client";
import { useEffect, useState } from "react";
import LineGraph from "./LineGraph";
import axios from "axios";

function Overview() {
  const [data, setData] = useState({ months: {} });
  useEffect(()=>{
    axios.get(`/api/auth/dashboard?overview=true`).then(
      ({data})=>{
        setData(data._data)
      }
    ).catch(
      e=>console.log(e)
    )
  }, [])
  return (
    <div className="border rounded-md w-1/2 p-2 m-2 h-[50vh] shadow-md">
      <div className="ml-2 text-xl mb-2 font-bold">Overview</div>
      <div>
        <LineGraph data={data} />
      </div>
    </div>
  );
}

export default Overview;
