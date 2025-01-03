import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import carImage from '../../assets/car.png';
function VehicleDetails() {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter vehicles based on the search query
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle._id.toLowerCase().includes(searchQuery.toLowerCase()) 
    || vehicle.fuelType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24">
        <h1 className="font-semibold text-xl border-b-2 w-[55vw] pb-2">Vehicle Details</h1>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search by Vehicle ID or Fuel type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 p-2 pl-5 w-80 rounded-full border-gray-300 "
          />
        </div>
        
        

        <div>
          <NavLink to="/addCar" className="btn btn-primary text-[15px] pl-7 pr-7">
            <i className="bi bi-plus-lg"></i> Car
          </NavLink>
        </div>
        
      </div>

      {/* Card Layout */}
      <div className="cards flex flex-wrap gap-6 mt-10 ml-[5.5rem]">
        {filteredVehicles.map((vehicle, index) => (
          <div key={index} className="p-6 flex w-[30%] h-48 bg-white shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            <div>
              <h3 className="text-md font-semibold">{vehicle._id}</h3>
              <p className="text-gray-600">{vehicle.licenceNumber}</p>
              <p className="text-gray-600">{vehicle.fuelType}</p>
              <div>
                <NavLink to={`/vehicle/${vehicle._id}`}>
                  <button className="mt-2 btn btn-primary relative top-5 w-2/3">View Details</button>
                </NavLink>
              </div>
            </div>

            {vehicle.VehicleType === 'Car' && (
              <img src={carImage} alt="Car" className="mt-4 w-52 h-auto " />
            )}
            {vehicle.VehicleType === 'Bike' && (
              <img src={carImage} alt="car" className="mt-4 w-52 h-auto " />
            )}
            {vehicle.VehicleType === 'Truck' && (
              <img src={carImage} alt="Truck" className="mt-4 w-52 h-auto " />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleDetails;
