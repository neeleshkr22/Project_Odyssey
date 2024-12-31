import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from "axios";
import bman from '../../assets/bman.png';

const OwnerDetails = () => {
  const [vehicles, setVehicles] = useState([]); // State to store vehicle data
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

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

  const filteredVehicles = vehicles.filter(vehicle =>
    (vehicle.ownerName && vehicle.ownerName.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (vehicle._id && vehicle._id.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className='ml-[5.5rem] flex justify-between mr-20 items-baseline mt-24'>
        <h2 className='text-xl font-semibold pb-3 border-b-2 pt-2 w-[60vw]'>Owner Details</h2>
      <div className="flex justify-between ml-[5.5rem] mt-4">
        <input
          type="text"
          placeholder="Search by Owner Name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 p-2 pl-5 w-80 rounded-full border-gray-300"
        />
      </div>
      </div>


      <div className="cards flex flex-wrap gap-6 mt-10 ml-[5.5rem]">
        {/* Display filtered vehicles */}
        {filteredVehicles.length === 0 ? (
          <p>No vehicles found</p>
        ) : (
          filteredVehicles.map((vehicle, index) => (
            <div key={index} className="w-[30%] h-48 bg-white shadow-lg rounded-lg p-4  flex justify-between">
              <div className=' flex flex-col gap-2 pt-4'>
                <h3 className="text-md font-semibold">Name: {vehicle.ownerName}</h3>
                <h3 className="">Id: {vehicle._id}</h3>
                <p className="text-gray-600">Contact: {vehicle.ownerConntact}</p>
                <p className="text-gray-600">Address: {vehicle.ownerAddress}</p>
              </div>
              <img src={bman} alt="man" className="mt-4 w-36 h-auto" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OwnerDetails;
