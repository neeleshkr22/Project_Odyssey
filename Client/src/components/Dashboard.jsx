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
          <p className="">Welcome back, Neelesh!</p>
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
      <div className=" w-[89vw] ml-20 mt-6">
        <div className="flex justify-between space-x-5"> 
        <div className="artboard artboard-horizontal phone-4 bg-orange-300 rounded-3xl"></div>
        <div className="artboard artboard-horizontal phone-1 bg-orange-300 rounded-3xl"></div>
        {/* <div className="artboard phone-1 bg-red-400">320×568</div>
        <div className="artboard phone-1 bg-red-400">320×568</div> */}
        </div>
      
      <div className="flex justify-between">
        <div className="stats stats-vertical lg:stats-horizontal mt-5 shadow w-[51.5vw]">
          <div className="stat pl-20 pr-20">
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat pl-20 pr-20"> 
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div> 
          <div className="stat pl-20 pr-20">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>

        <div className="radial flex space-x-5 mr-2 -mt-3">
        <div className="radial-progress" style={{ "--value": "75", "--size": "10rem", "--thickness": "1rem" }} role="progressbar">75%</div>
        <div className="radial-progress" style={{ "--value": "60", "--size": "10rem", "--thickness": "1rem" }} role="progressbar">60%</div>
        <div className="radial-progress" style={{ "--value": "80", "--size": "10rem", "--thickness": "1rem" }} role="progressbar">80%</div>
        </div>
      </div>


      </div>

      
    </div>
  );
};

export default Dashboard;
