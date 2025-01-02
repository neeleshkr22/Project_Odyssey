import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DutySlipPrint = () => {
  const [vehicle, setVehicle] = useState('');
  const [data, setData] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all vehicles on component mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vehicles');
        setVehiclesList(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);

  // Handle input change for vehicle ID
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setVehicle(inputValue);

    const filtered = vehiclesList.filter((vehicle) =>
      vehicle._id.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredVehicles(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Sending request for vehicle:', vehicle);  // Debugging line

    try {
      const response = await axios.get(`http://localhost:3001/getdutyslips/${vehicle}`);
      console.log('Response data:', response.data);  // Debugging line
      setData(response.data);
    } catch (error) {
      console.error('Error fetching duty slip data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (id) => {
    setVehicle(id);
    setFilteredVehicles([]);
  };

  // Function to handle print
  const handlePrint = () => {
    window.print(); // This triggers the browser's print dialog
  };

  // Calculate total fuel cost
  const totalFuelCost = data.reduce((total, entry) => total + parseFloat(entry.cost || 0), 0).toFixed(2);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container mx-auto p-5 mt-16">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b-2 pb-2 w-[53vw]">Duty Slip</h1>
          <form onSubmit={handleSubmit} className="flex justify-center mb-10">
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Enter Vehicle ID"
                className="input input-bordered w-full"
                value={vehicle}
                onChange={handleInputChange}
              />
              {filteredVehicles.length > 0 && (
                <ul className="absolute w-full bg-white shadow-lg border rounded-md mt-1 max-h-40 overflow-y-auto z-10">
                  {filteredVehicles.map((vehicleItem, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(vehicleItem._id)}
                    >
                      {vehicleItem._id}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className="btn btn-primary ml-4">
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>

        {/* Print Button */}
        {data.length > 0 && (
          <button onClick={handlePrint} className="btn btn-secondary mb-10">
            Print Report
          </button>
        )}

        {/* Duty Slip Table */}
        {data.length > 0 ? 
        <div className="slip overflow-x-auto">
        <table className="table-auto w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Vehicle</th>
              <th className="py-2 px-4">Driver</th>
              <th className="py-2 px-4">Start Time</th>
              <th className="py-2 px-4">End Time</th>
              <th className="py-2 px-4">Start Location</th>
              <th className="py-2 px-4">End Location</th>
              <th className="py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{entry.vehicle}</td>
                <td className="py-2 px-4">{entry.driver}</td>
                <td className="py-2 px-4">{new Date(entry.startTime).toLocaleString()}</td>
                <td className="py-2 px-4">{new Date(entry.endTime).toLocaleString()}</td>
                <td className="py-2 px-4">{entry.startLocation}</td>
                <td className="py-2 px-4">{entry.endLocation}</td>
                <td className="py-2 px-4">{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> :
            <div>
                Data not found
                </div>
        }
      </div>

      <style>
        {`@media print {
          .navbar, .sidebar, .btn-secondary {
            visibility: hidden;
          }
          .container {
            width: 200vw;
            padding: 0;
            margin: 0;
          }
          .card {
            width: 100%;
            margin: 0;
            box-shadow: none;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 4px;
          }
          body {
            transform: scale(0.8);
            transform-origin: top left;
          }
            .slip{
            position : absolute;
            top : 100px;
            z-index : 100;
            width: 120vw;
            }
        }`}
      </style>
    </div>
  );
};

export default DutySlipPrint;
