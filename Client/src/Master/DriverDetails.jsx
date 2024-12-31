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
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter drivers based on the search query (by driver ID)
  const filteredDrivers = drivers.filter(driver =>
    driver._id.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <div>
      <Navbar />
      <Sidebar />
      

      <div className='flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24'>
        <h1 className='font-semibold text-xl border-b-2 w-[58vw] pb-2'>
          Driver Details
        </h1>

        <div>
          <input
            type="text"
            placeholder="Search by Driver ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 p-2 pl-5 w-80 rounded-full border-gray-300 "
          />
        </div>
        
        <div>
          <NavLink to="/addDriver" className="btn btn-primary text-[15px] pl-7 pr-7">
            <i className="bi bi-plus-lg"></i>Driver
          </NavLink>
        </div>
      </div>

      {filteredDrivers.length === 0 ? (
        <p className='text-center mt-10 text-gray-500'>No drivers available. Add a new driver!</p>
      ) : (
        <div className='flex flex-wrap gap-6 mt-10 ml-[5.5rem]'>
          {filteredDrivers.map((driver, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-3 flex justify-between">
              <div className='flex flex-col p-4 pb-0'>
                <h3 className="text-lg font-semibold">{driver.name}</h3>
                <p className="text-gray-600">{driver.licenseNumber}</p>
                <p className="text-gray-600">{driver._id}</p>
                <button
                  className="btn btn-primary w-52 mt-10"
                  onClick={() => navigate(`/driver/${driver._id}`)}
                >
                  View Details
                </button>
              </div>
              <img src={man} alt="man" className="mt-4 w-40 h-40" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DriverDetails;
