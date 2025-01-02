import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';

const PendingBillReport = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await axios.get('http://localhost:3001/trips');
      setTrips(response.data);
      console.log(response.data);
    };

    fetchTrips();
  }, []); 

  const print = () => {
    window.print();
  }

  const pendingTrips = trips.filter((trip) => trip.fareDetails.paymentStatus === 'Pending');

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="h-screen w-[86vw] pt-20 ml-[8rem]">
        <h1 className="text-3xl font-semibold border-b border-black pb-3">Pending Bill Report</h1>
        
        <div className="text-right mt-4">
          <button 
            onClick={print}
            className="bg-green-500 rounded-full text-white py-2 px-4 hover:bg-green-600 mb-4"
          >
            Print Report
          </button>
        </div>

        <div className="report mt-10">
          {pendingTrips.length > 0 ? (
            pendingTrips.map((trip) => (
              <div key={trip._id} className="mb-8 p-6 rounded-2xl bg-white shadow-lg">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Trip ID: {trip._id}</h2>
                  <p className="font-semibold text-lg text-red-600">Pending Payment</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p><strong>Start Location:</strong> {trip.tripStartLocation}</p>
                    <p><strong>End Location:</strong> {trip.tripEndLocation}</p>
                    <p><strong>Distance:</strong> {trip.distance} km</p>
                    <p><strong>Start Date:</strong> {new Date(trip.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(trip.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p><strong>Fare:</strong> ₹{trip.fareDetails.totalFare}</p>
                    <p><strong>Status:</strong> {trip.fareDetails.paymentStatus}</p>
                    <p><strong>Notes:</strong> {trip.notes || 'No notes'}</p>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <NavLink to={`/trip/${trip._id}`}>
                    <button className="bg-blue-500 rounded-full text-white py-2 px-4 hover:bg-blue-600">
                      View Details
                    </button>
                  </NavLink>
                </div>
              </div>
            ))
          ) : (
            <p>No pending bills found.</p>
          )}
        </div>
      </div>

      {/* Printable content */}
      <div id="printableArea" className="print-content" style={{ display: 'none' }}>
        <h2 className="text-center text-2xl mb-4">Pending Bill Report</h2>
        <table className="min-w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Trip ID</th>
              <th className="border border-gray-300 p-2">Start Location</th>
              <th className="border border-gray-300 p-2">End Location</th>
              <th className="border border-gray-300 p-2">Distance</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Fare</th>
              <th className="border border-gray-300 p-2">Payment Status</th>
              <th className="border border-gray-300 p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {pendingTrips.map((trip) => (
              <tr key={trip._id}>
                <td className="border border-gray-300 p-2">{trip._id}</td>
                <td className="border border-gray-300 p-2">{trip.tripStartLocation}</td>
                <td className="border border-gray-300 p-2">{trip.tripEndLocation}</td>
                <td className="border border-gray-300 p-2">{trip.distance} km</td>
                <td className="border border-gray-300 p-2">{new Date(trip.startDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{new Date(trip.endDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">₹{trip.fareDetails.totalFare}</td>
                <td className="border border-gray-300 p-2">{trip.fareDetails.paymentStatus}</td>
                <td className="border border-gray-300 p-2">{trip.notes || 'No notes'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>
        {`/* Print-specific styles */
      @media print {
        body {
          font-family: Arial, sans-serif;
        }
              
        .print-content {
          padding: 20px;
          max-width: 100%;
        }
              
        .text-center {
          text-align: center;
        }
              
        .min-w-full {
          width: 100%;
        }
              
        table {
          border: 1px solid #000;
          width: 100%;
          margin-bottom: 20px;
        }
              
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
              
        th {
          background-color: #f2f2f2;
        }
              
        button {
          display: none; /* Hide buttons on print */
        }
              
        /* Remove unnecessary UI elements */
        .navbar, .sidebar {
          display: none;
        }
              
        .h-screen, .pt-20, .ml-[8rem], .w-[86vw] {
          display: none;
        }

        /* Apply scale */
        html, body {
          transform: scale(1);  /* Reduced scale to 60% */
          transform-origin: top left;
        }

        @page {
          margin: 10mm; /* Adjust page margin */
        }
      }
      `}
      </style>
    </div>
  );
};

export default PendingBillReport;
