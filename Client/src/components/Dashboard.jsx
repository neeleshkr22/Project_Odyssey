import React from "react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const dayName = currentDate.toLocaleString("default", { weekday: "short" }); // Short day name

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    updateClock(); // Update immediately on mount
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="maindash h-[100vh] w-[89vw]">

      {/* Part 1 */}
      <div className="w-[89vw] ml-20 pt-3 flex justify-between">

        {/* GREETING */}
        <div className="greet text-base">
          <h1 className="text-4xl font-bold pt-2 border-b pb-2">Dashboard</h1>
          <p className="">Welcome back, Modi!</p>
        </div>

        {/* DATE */}
        <div className=" flex space-x-5 text-base">
          <div className=" relative top-10">
          <div className="text-base  flex  ">{time}</div>
          </div>
          <div className="flex justify-center  flex-row-reverse text-right items-center text-base">
            <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center">
              <span className="text-2xl font-bold">{day}</span>
            </div>
            <div
              className=" pr-2
          "
            >
              <div className="text-sm border-b">{dayName}</div>
              <div className="mt-1 text-sm">{month}</div>
            </div>
          </div>
        </div>


      </div>
    
      {/* Part 2 */}
      <div className=" w-[89vw] ml-20 mt-10">
        <div className="artboard artboard-horizontal phone-2 bg-orange-300 rounded-3xl">
        </div>
      
        <div className="stats stats-vertical lg:stats-horizontal mt-5 shadow">
          <div className="stat pl-16 pr-16">
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat pl-16 pr-16">
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat pl-16 pr-16">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>

      </div>

      
    </div>
  );
};

export default Dashboard;
