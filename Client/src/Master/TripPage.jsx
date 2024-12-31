import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const TripPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/trips/${id}`);
        setTrip(response.data);
      } catch (error) {
        console.error("Error fetching trip details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Sidebar />

      <div className="flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24">
        <h1 className="font-semibold text-2xl border-b-2 w-[80vw] pb-2">
          Trip Details
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary text-[15px] px-6 py-2"
        >
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </div>

      <div className="mt-10 ml-[5.5rem] mr-20 bg-white shadow-lg rounded-lg p-6">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p> {/* Replace with spinner or skeleton loader */}
          </div>
        ) : trip ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Trip Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Vehicle:</p>
                <p>{trip.vehicle}</p>
              </div>
              <div>
                <p className="font-semibold">Party:</p>
                <p>{trip.party}</p>
              </div>
              <div>
                <p className="font-semibold">Start Date:</p>
                <p>{new Date(trip.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold">End Date:</p>
                <p>{new Date(trip.endDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold">Description:</p>
                <p>{trip.description || "No description provided"}</p>
              </div>
              <div>
                <p className="font-semibold">Cost:</p>
                <p>${trip.cost || "N/A"}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Trip details not available.</p>
        )}
      </div>
    </div>
  );
};

export default TripPage;
