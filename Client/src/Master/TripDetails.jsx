// import React, {useState, useEffect} from 'react'
// import Navbar from '../components/Navbar'
// import Sidebar from '../components/Sidebar'
// import { NavLink } from 'react-router-dom'
// import axios from "axios";


// const TripDetails = () =>{
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(()=>{
//     const fetchTrips = async()=>{
//       try{
//         const response  = await axios.get('http://localhost:3001/trips');
//         setTrips(response.data);
//       }catch(error){
//         console.error("error in fetching", error);
//       }finally{
//         setLoading(false);
//       }
//     };
//     fetchTrips();
//   },[]);
//   return (
//     <div>
//         <Navbar></Navbar>
//         <Sidebar></Sidebar>

//         <div className='flex justify-between ml-[5.5rem] mr-20  items-baseline mt-24 '>
//                     <h1 className=' font-semibold text-xl border-b-2 w-[80vw] pb-2 '>
//                     Trip Details
//                     </h1>
//                     <div>
//                     <NavLink to="/addtrip" className="btn btn-primary text-[15px] pl-7 pr-7">
//                       <i class="bi bi-plus-lg"></i> Trip
//                     </NavLink>
//                     </div>
//                 </div>

//         <div className="cards flex flex-wrap gap-6 mt-10 ml-[5.5rem] ">
//             {loading ? (
//               <p>Loading....</p>
//             ): trips.length > 0 ? (
//               trips.map((trip, index)=>(
//                 <div key={trip._id} className='artboard artboard-demo w-[30%] h-48 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between'>
//                   <p className='font-bold'>Vehicle: {trip.vehicle}</p>
//                   <p className='font-bold'>Party: {trip.party}</p>
//                   <p className='font-bold'>Date: {new Date(trip.startDate).toLocaleDateString()} -{ ' '}
//                     {new Date(trip.endDate).toLocaleDateString()}
//                   </p>
//                   <button className="mt-2 btn btn-rpimary">View</button>
//                 </div>
//               ))
//             ):(
//               <p>No trip</p>
//             )} 
//         </div>
      
//     </div>
//   )
// }

// export default TripDetails

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';   
import Sidebar from '../components/Sidebar';  
import { NavLink } from 'react-router-dom';
import axios from "axios";

const TripDetails = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trips');
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Sidebar />

      <div className='flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24'>
        <h1 className='font-semibold text-2xl border-b-2 w-[80vw] pb-2'>
          Trip Details
        </h1>
        <div>
          <NavLink to="/addtrip" className="btn btn-primary text-[15px] px-6 py-2">
            <i className="bi bi-plus-lg"></i> Add Trip
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 ml-[5.5rem] mr-20">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p> {/* Replace with spinner or skeleton loader */}
          </div>
        ) : trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip._id} className='bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300'>
              <p className='font-bold text-lg'>Vehicle: {trip.vehicle}</p>
              <p className='font-semibold'>Party: {trip.party}</p>
              <p className='text-sm text-gray-600'>Date: {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
              <button className="mt-2 btn btn-primary">View</button>
            </div>
          ))
        ) : (
          <p>No trips available.</p>
        )}
      </div>

      {/* Pagination or load more button can be added here */}
    </div>
  );
}

export default TripDetails;


