import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const InvoicePrinting = () => {
  const [partyId, setPartyId] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [error, setError] = useState('');
  const [partySuggestions, setPartySuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const generateInvoiceNumber = () => {
    const timestamp = new Date().getTime();
    return `INV-${timestamp}`;
  };

  const calculateTotalHours = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMilliseconds = end - start;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours.toFixed(2);
  };

  // Fetch party list for suggestions
  const fetchParties = async (query) => {
    try {
      const response = await axios.get('http://localhost:3001/parties', {
        params: { query }
      });
      setPartySuggestions(response.data);
    } catch (err) {
      console.error('Error fetching party data:', err);
    }
  };

  const handleSearch = async () => {
    if (!partyId) {
      setError('Party name is required');
      return;
    }

    try {
      setError('');
      const response = await axios.get(`http://localhost:3001/invoice`, {
        params: { partyName: partyId }  // Passing partyName as a query parameter
      });
      setInvoiceData(response.data);

      const newInvoiceNumber = generateInvoiceNumber();
      setInvoiceNumber(newInvoiceNumber);
    } catch (err) {
      setInvoiceData(null);
      setError(err.response?.data?.message || 'Error fetching data');
    }
  };

  const handlePartyIdChange = (e) => {
    const value = e.target.value;
    setPartyId(value);

    if (value) {
      fetchParties(value);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPartyId(suggestion.name);  // Set the party name
    setIsDropdownOpen(false);
  };

  // Calculate total km and total hours
  const calculateTotalKm = () => {
    return invoiceData.reduce((total, trip) => total + (trip.distance || 0), 0).toFixed(2);
  };

  const calculateTotalHoursFromData = () => {
    return invoiceData.reduce((total, trip) => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      const diffInMilliseconds = end - start;
      const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
      return total + diffInHours;
    }, 0).toFixed(2);
  };

  return (
    <div className=' '>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="container mx-auto p-6 mt-16">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6 border-b border-black w-[50vw] pb-2">Invoice Printing</h1>

          {/* Search Field and Button */}
          <div className="mb-4 flex justify-center relative">
            <input
              type="text"
              value={partyId}
              onChange={handlePartyIdChange}
              placeholder="Enter Party Name"
              className="border p-3 rounded-3xl pl-5 w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
            <button
              onClick={handleSearch}
              className="ml-2 bg-primary  px-4 py-3 rounded-full shadow-md  transition duration-300"
            >
              Search
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {isDropdownOpen && partySuggestions.length > 0 && (
            <div className="absolute w-80 mt-16 right-56 bg-white shadow-lg border border-gray-300 rounded-md z-50">
              <ul className="max-h-60 overflow-y-auto">
                {partySuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}  {/* Displaying party name */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 bg-red-100 border border-red-400 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {/* Invoice Data Display */}
        {invoiceData && (
          <div className="bg-white shadow-lg rounded-lg p-8 mt-6 relative">
            {/* Invoice Number at Top Right */}
            {invoiceNumber && (
              <div className="absolute top-4 right-8 ">
                <p><strong>Invoice Number:</strong> <br />{invoiceNumber}</p>
              </div>
            )}

            {/* Bill Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold border-b border-gray-500 pb-2 mb-2">Party Details</h2>
              <p>Party name: <span className="font-semibold">{invoiceData[0]?.party?.name || 'N/A'}</span></p>
              <p>Contact: {invoiceData[0]?.party?.contactNumber || 'N/A'}</p>
              <p>Email: {invoiceData[0]?.party?.email || 'N/A'}</p>
              <p>Address: {invoiceData[0]?.party?.address || 'N/A'}</p>
            </div>

            {/* Trips Table */}
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-500 pb-2 mt-10">Trip Details</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-400 px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="border border-gray-400 px-6 py-3 text-left text-sm font-semibold text-gray-700">Vehicle ID</th>
                  <th className="border border-gray-400 px-6 py-3 text-left text-sm font-semibold text-gray-700">Driver ID</th>
                  <th className="border border-gray-400 px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Hours</th>
                  <th className="border border-gray-400 px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Km</th>
                  <th className="border border-gray-400 px-6 py-3 text-left text-sm font-semibold text-gray-700">Extra Hours</th>
                  <th className="border border-gray-400 px-6 py-3 text-left text-sm font-semibold text-gray-700">Parking</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.length > 0 ? (
                  invoiceData.map((trip, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-100">
                      <td className="border border-gray-400 px-6 py-3 text-sm">{new Date(trip.startDate).toLocaleDateString()}</td>
                      <td className="border border-gray-400 px-6 py-3 text-sm">{trip.vehicle?._id || 'N/A'}</td>
                      <td className="border border-gray-400 px-6 py-3 text-sm">{trip.driver?.name || 'N/A'}</td>
                      <td className="border border-gray-400 px-6 py-3 text-sm">{calculateTotalHours(trip.startDate, trip.endDate)} hours</td>
                      <td className="border border-gray-400 px-6 py-3 text-sm">{trip.distance || 'N/A'}</td>
                      <td className="border border-gray-400 px-6 py-3 text-sm">{trip.extraHours || '0 : 00'}</td>
                      <td className="border border-gray-400 px-6 py-3 text-sm">{trip.parking || '0.00'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="border border-gray-400 px-6 py-3 text-center text-sm text-gray-500">No trips found.</td>
                  </tr>
                )}
              </tbody>
              {/* Table Footer */}
              <tfoot>
                <tr>
                  <td colSpan="3" className="border border-gray-400 px-6 py-3 text-right font-semibold">Total:</td>
                  <td className="border border-gray-400 px-6 py-3 text-sm bg-gray-200">{calculateTotalHoursFromData()} hours</td>
                  <td className="border border-gray-400 px-6 py-3 text-sm bg-gray-200">{calculateTotalKm()} km</td>
                  <td className="border border-gray-400 px-6 py-3 text-sm bg-gray-200">0 hours</td>
                  <td className="border border-gray-400 px-6 py-3 text-sm bg-gray-200">0 hours</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePrinting;
