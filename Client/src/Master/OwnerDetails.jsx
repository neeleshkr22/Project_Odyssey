import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import bman from '../../assets/bman.png';

const OwnerDetails = () => {
  const [vehicles, setVehicles] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vehicles
        const vehiclesResponse = await axios.get('http://localhost:3001/vehicles');
        setVehicles(vehiclesResponse.data);
        console.log('Vehicles:', vehiclesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
    };
    fetchData();
  }, []);

  
  return (
    <div>
        <Navbar></Navbar>
        <Sidebar></Sidebar>

        <div className='ml-[5.5rem] mr-20  items-baseline mt-24'>
        <h2 className='text-xl font-semibold pb-3 border-b-2 pt-2'>Owner Details</h2>
        </div>

        <div className="cards flex flex-wrap gap-6 mt-10 ml-[5.5rem] ">
            {/* Example of vehicle cards */}
            {vehicles.map((_, index) => (
            
            <div key={index} className=" w-[30%] h-48 bg-white shadow-lg rounded-lg p-4 flex justify-between ">
              <div>
                <h3 className="text-md font-semibold">Name : {_.ownerName}</h3>
                <p className="text-gray-600">Contact {_.ownerConntact}.</p>
                <button className=" btn btn-primary mt-16 w-2/3 ">View Details</button>
              </div>
              <img src={bman} alt="man" className="mt-4 w-36 h-auto " />
            </div>
            ))}
        </div>
      
    </div>
  )
}

export default OwnerDetails
