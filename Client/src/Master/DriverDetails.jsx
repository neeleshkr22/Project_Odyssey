

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import man from '../../assets/man.png'

function DriverDetails() {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/drivers');
        setDrivers(response.data);
      } catch (error) {
        setError("Failed to fetch driver details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className='flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24'>
        <h1 className='font-semibold text-xl border-b-2 w-[80vw] pb-2'>
          Driver Details
        </h1>
        <div>
          <NavLink to="/addDriver" className="btn btn-primary text-[15px] pl-7 pr-7">
            <i className="bi bi-plus-lg"></i>yyy Driver
          </NavLink>
        </div>
      </div>

      {drivers.length === 0 ? (
        <p className='text-center mt-10 text-gray-500'>No drivers available. Add a new driver!</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ml-[5.5rem]'>
          {drivers.map((driver, index) => (
            
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex  justify-between">
                
              <div className=' flex flex-col p-4 pb-0'>
              <h3 className="text-lg font-semibold">{driver.name}</h3>
              <p className="text-gray-600">{driver.licenseNumber}</p>
              <button
                className=" btn btn-primary w-52 mt-20"
                onClick={() => navigate(`/driver/${driver.id}`)}
                >
                View Details
              </button>
                </div>

               <img src={man} alt="man" className="mt-4 w-48 h-auto " />


            </div>

          ))}
        </div>
      )}
    </div>
  );
}

export default DriverDetails;
