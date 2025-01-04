import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts";
import { Gauge } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts";


const Dashboard = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const dayName = currentDate.toLocaleString("default", { weekday: "short" }); 
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [parties, setParties] = useState([]);

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    const fetchData = async () => {
      try {
        const vehiclesResponse = await axios.get("http://localhost:3001/vehicles");
        setVehicles(vehiclesResponse.data);
        console.log(vehiclesResponse.data);
  
        const driversResponse = await axios.get("http://localhost:3001/drivers");
        setDrivers(driversResponse.data);
  
        const partiesResponse = await axios.get("http://localhost:3001/parties");
        setParties(partiesResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetchData();
    

    updateClock(); // Update immediately on mount
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="maindash h-[90vh] w-[89vw]">

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
              <div className="text-sm border-b border-black">{dayName}</div>
              <div className="mt-1 text-sm">{month}</div>
            </div>
          </div>
        </div>


      </div>
    
      {/* Part 2 */}
      <div className=" w-[89vw] ml-20 mt-6">
        <div className="flex justify-between space-x-5"> 

        <div className=" h-[50vh] w-full shadow-lg rounded-3xl">

          <div className=" ml-5">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
                color: "#02b2af",
              },
            ]}
            width={800}
            height={350}
          />

        
          </div>
          
        </div>
        <div className="artboard artboard-horizontal phone-1 shadow-lg rounded-3xl flex">
        <BarChart
        xAxis={[{ scaleType: 'band', data: ['Vehicles', 'Drivers', 'Trips'] }]}
        series={[{ data: [10, 12, 9] }, { data: [13, 8, 10] }, { data: [2, 5, 6] }]}
        width={500}
        height={300}
      />

        </div>

        </div>
      
      <div className="flex justify-between text-neutral ">
        <div className="stats stats-vertical lg:stats-horizontal mt-5 shadow-lg w-[55vw]">
          <div className="stat pl-20 pr-20">
            <div className="stat-title">Total Parties</div>
            <div className="stat-value">{parties.length}</div>
          </div>

          <div className="stat pl-20 pr-20"> 
            <div className="stat-title">Total vehicles</div>
            <div className="stat-value">{vehicles.length}</div>
          </div> 
          <div className="stat pl-20 pr-20">
            <div className="stat-title">Total drivers</div>
            <div className="stat-value">{drivers.length}</div>
          </div>
        </div>


        <div className=" shadow-lg w-[33vw] rounded-3xl h-[21vh]">
        <div className="radial flex space-x-5 mr-2 ">
        <Gauge width={150} height={150} value={vehicles.length} valueMax={vehicles.length*1.25} color= "#02b2af"/>
        <Gauge width={150} height={150} value={drivers.length} valueMax={drivers.length*1.75} />
        <Gauge width={150} height={150} value={parties.length}  valueMax={parties.length*1.5} />
        </div>
      </div>
        </div>


      </div>

      
    </div>
  );
};

export default Dashboard;
