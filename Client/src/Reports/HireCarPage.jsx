import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';

function HireCarPage() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getCars');
        setVehicles(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setError('Failed to fetch vehicles. Please try again later.');
      }
    };
    fetchCars();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24">
        <h1 className="font-semibold text-xl border-b-2 w-[55vw] pb-2">
          Vehicle Details
        </h1>
        <NavLink to="/HireCarForm">
          <button className="bg-primary  font-medium p-2 rounded-full pl-3 pr-3 hover:bg-primary-dark">
            + Purchased Vehicle
          </button>
        </NavLink>
      </div>

      <div className="mt-10 ml-[5.5rem] mr-20">
        {error && <p className="text-red-500">{error}</p>}
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-xl text-gray-800">
                    {vehicle.carname}
                  </h2>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {vehicle.cartype.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>ID:</strong> {vehicle._id}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Company:</strong> {vehicle.companyname}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Fuel:</strong> {vehicle.fuelType}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Color:</strong> {vehicle.color}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Price:</strong> ₹{vehicle.purchasedPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Purchased On:</strong>{" "}
                  {new Date(vehicle.purchasedDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Insurance:</strong> {vehicle.insuranceDetails?.provider} (Expires on{" "}
                  {new Date(vehicle.insuranceDetails?.expiryDate).toLocaleDateString()})
                </p>

                
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No vehicles available.</p>
        )}
      </div>
    </div>
  );
}

export default HireCarPage;
