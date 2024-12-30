import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PartyPage = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const [isPaymentHistoryOpen, setPaymentHistoryOpen] = useState(false); // State to toggle payment history dropdown
  const [isRentalHistoryOpen, setRentalHistoryOpen] = useState(false); // State to toggle rental history dropdown
  const [selectedPayment, setSelectedPayment] = useState(null); // State to track selected payment for fare details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/party/${id}`);
        console.log('Party:', response.data);
        setParty(response.data);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
    };
    fetchData();
  }, [id]);

  const togglePaymentHistory = () => {
    setPaymentHistoryOpen(!isPaymentHistoryOpen); // Toggle payment history dropdown
  };

  const toggleRentalHistory = () => {
    setRentalHistoryOpen(!isRentalHistoryOpen); // Toggle rental history dropdown
  };

  const handlePaymentClick = (payment) => {
    setSelectedPayment(payment); // Set selected payment to show its fare details
  };

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="flex justify-center gap-5 mt-20">
        <div className="content bg-gray-50 shadow-md rounded-2xl w-[70%] p-5 text-base">
          <h1 className="text-2xl font-semibold mb-5">Party Details</h1>
          {party ? (
            <div className="party-details">
              {[ 
                { label: 'Name', value: party.party.name },
                { label: 'Contact Number', value: party.party.contactNumber },
                { label: 'Email', value: party.party.email },
                { label: 'Address', value: party.party.address },
                { label: 'Status', value: party.party.status },
                { label: 'Created At', value: new Date(party.party.createdAt).toLocaleString() },
                { label: 'Updated At', value: new Date(party.party.updatedAt).toLocaleString() },
                {
                  label: 'Payment History',
                  value: (
                    <div className="cursor-pointer" onClick={togglePaymentHistory}>
                      <span className="font-bold text-gray-800">
                        {isPaymentHistoryOpen ? 'Hide Payment History ▲' : 'View Payment History ▼'}
                      </span>
                    </div>
                  ),
                },
                {
                  label: 'Rental History',
                  value: (
                    <div className="cursor-pointer" onClick={toggleRentalHistory}>
                      <span className="font-bold text-gray-800">
                        {isRentalHistoryOpen ? 'Hide Rental History ▲' : `View Rental History ▼`}
                      </span>
                    </div>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                  <span className="font-medium text-gray-600">{item.label}:</span>
                  <span className="text-gray-800">{item.value}</span>
                </div>
              ))}

              {/* Trip History Section with Smoother Transition */}
              <div
                className={`mt-5 pl-5 text-gray-600 transition-all duration-500 ease-out ${
                  isPaymentHistoryOpen ? 'height-auto opacity-100' : 'height-0 opacity-0'
                } overflow-hidden`}
                style={{
                  height: isPaymentHistoryOpen ? 'auto' : '0',
                  paddingBottom: isPaymentHistoryOpen ? '1rem' : '0',
                }}
              >
                {isPaymentHistoryOpen && (
                  <>
                    <h3 className="font-semibold pt-5">Payment History:</h3>
                    {party.trips?.length > 0 ? (
                      party.trips.map((trip, index) => (
                        <div key={index} className="py-2 border-b-2 pt-5">
                          <div className="flex justify-between">
                            <strong>Trip ID:</strong>
                            <span>{trip._id}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong>Start Location:</strong>
                            <span>{trip.tripStartLocation}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong>End Location:</strong>
                            <span>{trip.tripEndLocation}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong>Start Date:</strong>
                            <span>{new Date(trip.startDate).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong>End Date:</strong>
                            <span>{new Date(trip.endDate).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong>Total Fare:</strong>
                            <span>₹ {trip.fareDetails?.totalFare}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong>Payment Status:</strong>
                            <span>{trip.fareDetails?.paymentStatus}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No payment history found.</p>
                    )}
                  </>
                )}
              </div>

              {/* Rental History Section with Smoother Transition */}
              <div
                className={`mt-5 pl-5 text-gray-600 transition-all duration-500 ease-out ${
                  isRentalHistoryOpen ? 'height-auto opacity-100' : 'height-0 opacity-0'
                } overflow-hidden`}
                style={{
                  height: isRentalHistoryOpen ? 'auto' : '0',
                  paddingBottom: isRentalHistoryOpen ? '1rem' : '0',
                }}
              >
                {isRentalHistoryOpen && (
                  <>
                    <h3 className="font-semibold">Vehicle Details:</h3>
                    {party.trips?.length > 0 ? (
                      party.trips.map((trip, index) => (
                        <div key={index} className="py-2 border-b">
                          <div className="flex justify-between">
                            <strong>Vehicle ID:</strong>
                            <span>{trip.vehicle._id}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong>Model:</strong>
                            <span>{trip.vehicle.modelNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong>Color:</strong>
                            <span>{trip.vehicle.color}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong>Company:</strong>
                            <span>{trip.vehicle.companyName}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No vehicles found in rental history.</p>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <p>Loading party details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartyPage;
