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
  const [isEditing, setIsEditing] = useState(false);  // State to track if we're editing
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/trips/${id}`);
        setTrip(response.data);
        setNewPaymentStatus(response.data.fareDetails.paymentStatus); // Set the current payment status
        console.log('Trip:', response.data);
      } catch (error) {
        console.error("Error fetching trip details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handlePaymentStatusChange = async (event) => {
    const updatedStatus = event.target.value;
    setNewPaymentStatus(updatedStatus);

    try {
      await axios.put(`http://localhost:3001/trips/${id}`, {
        fareDetails: { paymentStatus: updatedStatus },
      });
      setStatusUpdateSuccess(true); // Success feedback
      setTimeout(() => setStatusUpdateSuccess(false), 3000); // Hide success feedback after 3 seconds
    } catch (error) {
      console.error("Error updating payment status", error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);  // Toggle the edit mode
  };

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
            <p>Loading...</p>
          </div>
        ) : trip ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Trip Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="font-semibold">Vehicle:</p>
                <p>{trip.vehicle}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Party:</p>
                <p>{trip.party}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Driver:</p>
                <p>{trip.driver}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Start Date:</p>
                <p>{new Date(trip.startDate).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">End Date:</p>
                <p>{new Date(trip.endDate).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Description:</p>
                <p>{trip.description || "No description provided"}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Cost:</p>
                <p>{trip.fareDetails.totalFare || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Trip Start Location:</p>
                <p>{trip.tripStartLocation}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Trip End Location:</p>
                <p>{trip.tripEndLocation}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Distance:</p>
                <p>{trip.distance} km</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Trip Status:</p>
                <p>{trip.tripStatus}</p>
              </div>

              {/* Payment Status Section */}
              <div className="flex justify-between">
                <p className="font-semibold">Payment Status:</p>
                <div>
                  {!isEditing ? (
                    <p>{trip.fareDetails.paymentStatus}</p> // Show current payment status
                  ) : (
                    <select
                      value={newPaymentStatus}
                      onChange={handlePaymentStatusChange}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  )}
                </div>
                <button
                  onClick={toggleEdit}
                  className="ml-4 text-blue-500"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold">Created At:</p>
                <p>{new Date(trip.createdAt).toLocaleString()}</p>
              </div>

              {statusUpdateSuccess && (
                <div className="mt-4 text-green-500 font-semibold">
                  Payment status updated successfully!
                </div>
              )}
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
