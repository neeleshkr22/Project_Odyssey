import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';   
import Sidebar from '../components/Sidebar';  
import { NavLink } from 'react-router-dom';
import axios from "axios";

const TripDetails = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trips');
        setTrips(response.data);
        setFilteredTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = trips.filter(trip => 
        trip.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.party.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTrips(filtered);
    } else {
      setFilteredTrips(trips);
    }
  }, [searchQuery, trips]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Sidebar />

      <div className='flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24'>
        <h1 className='font-semibold text-2xl border-b-2 w-[58vw] pb-2'>
          Trip Details
        </h1>
        {/* Search Bar */}
        <div className=" w-40 ">
          <input
            type="text"
            placeholder="Search by vehicle or party"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-60 p-2 border border-gray-300 rounded-full pl-5"
          />
        </div>
        <div>
          <NavLink to="/addtrip" className="btn btn-primary text-[15px] px-6 py-2">
            <i className="bi bi-plus-lg"></i> Add Trip
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10 ml-[5.5rem] mr-20">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        ) : filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <div key={trip._id} className='bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 mb-2'>
              {/* Vehicle */}
              <div className="flex justify-between mb-2">
                <p className='font-semibold'>Vehicle:</p>
                <p>{trip.vehicle}</p>
              </div>
              {/* Party */}
              <div className="flex justify-between mb-2">
                <p className='font-semibold'>Party:</p>
                <p>{trip.party}</p>
              </div>
              {/* Date Range */}
              <div className="flex justify-between mb-2">
                <p className='font-semibold'>Date:</p>
                <p>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
              </div>
              <NavLink to={`/trip/${trip._id}`}>
                <button className="mt-5 w-full btn btn-primary">View Details</button>
              </NavLink>
            </div>
          ))
        ) : (
          <p>No trips available.</p>
        )}
      </div>

    </div>
  );
}

export default TripDetails;
