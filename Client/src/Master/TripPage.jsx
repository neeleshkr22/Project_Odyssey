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
  const [paymentStatus, setPaymentStatus] = useState('');
  const [tripStatus, setTripStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/trips/${id}`);
        setTrip(response.data);
        setPaymentStatus(response.data.fareDetails.paymentStatus);
        setTripStatus(response.data.tripStatus);
      } catch (error) {
        console.error('Error fetching trip details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleUpdatePaymentStatus = async () => {
    setUpdating(true);
    try {
      const response = await axios.put(
        `http://localhost:3001/trips/${id}/payment-status`,
        { paymentStatus , tripStatus }
      );
      setTrip(response.data);
      alert('Payment status updated successfully!');
    } catch (error) {
      console.error('Error updating payment status', error);
      alert('Failed to update payment status.');
    } finally {
      setUpdating(false);
    }
  };



  return (
    <div className="bg-gray-100 min-h-[110vh]">
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

      <div className="mt-5 ml-[5.5rem] mr-20 bg-white shadow-lg rounded-lg p-6 ">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        ) : trip ? (
          <div>
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
                <p>{trip.driver.name}</p> {/* Replace with driver's name if available */}
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
                <select
                  className="form-select border rounded p-2"
                  value={tripStatus}
                  onChange={(e) => setTripStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Payment Status:</p>
                <p> <select
                  className="form-select border rounded p-2"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select></p>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold">Created At:</p>
                <p>{new Date(trip.createdAt).toLocaleString()}</p>
              </div>
              {/* Trip details */}
              <div className="flex justify-between">
                <p className="font-semibold">Vehicle:</p>
                <p>{trip.vehicle}</p>
              </div>


              {/* Trip Status Update */}
              <div className="flex items-center space-x-4 mt-6">
               
                
              </div>

              {/* Payment Status Update */}

              <div className="flex items-center space-x-4 mt-6 ml-[73vw]">
               
                <button
                  onClick={handleUpdatePaymentStatus}
                  className="btn btn-primary px-4 py-2"
                  disabled={updating}
                >
                  {updating ? 'Updating...' : 'Update Payment Status'}
                </button>
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
