import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';


function HireCarPage() {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch vehicles
//         const vehiclesResponse = await axios.get('http://localhost:3001/vehicles');
//         setVehicles(vehiclesResponse.data);
//         console.log('Vehicles:', vehiclesResponse.data);
//       } catch (err) {
//         console.error('Error fetching data:', err.message);
//       }
//     };
//     fetchData();
//   }, []);

  // Filter vehicles based on the search query
//   const filteredVehicles = vehicles.filter(vehicle =>
//     vehicle._id.toLowerCase().includes(searchQuery.toLowerCase()) 
//     || vehicle.fuelType.toLowerCase().includes(searchQuery.toLowerCase())
//   );

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24">
        <h1 className="font-semibold text-xl border-b-2 w-[55vw] pb-2">Vehicle Details</h1>
        
        <NavLink to="/HireCarForm">
        <button className=' bg-primary  p-2 rounded-full pl-3 pr-3'>Add Purchased Vehicle</button>
        </NavLink>

        {/* Search Bar */}
 
    </div>
    </div>
  );
}

export default HireCarPage;
