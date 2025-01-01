import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MaintenanceReport = () => {
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/maintainReport', {
        params: { vehicle }
      });
      setData(response.data);

    } catch (error) {
      console.error('Error fetching fuel data:', error);
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
  const totalMaintainCost = data.reduce((total, entry) => total + parseFloat(entry.cost || 0), 0).toFixed(2);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container mx-auto p-5 mt-16">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b-2 pb-2 w-[53vw]">Maintenance Report</h1>
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

        {/* Vehicle and Fuel Report */}
        <div>
          {data.length > 0 ? (
            <>
              <div className="card shadow-lg mb-10">
                <div className="card-body ">
                  <h2 className="card-title border-b-2 pb-2">Vehicle Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex justify-end">
                      <p><strong>ID:</strong></p>
                    </div>
                    <div>
                      <p>{data[0].vehicle._id}</p>
                    </div>
                    <div className="flex justify-end">
                      <p><strong>Type:</strong></p>
                    </div>
                    <div>
                      <p>{data[0].vehicle.VehicleType}</p>
                    </div>
                    <div className="flex justify-end">
                      <p><strong>Company:</strong></p>
                    </div>
                    <div>
                      <p>{data[0].vehicle.comapnyName}</p>
                    </div>
                    <div className="flex justify-end">
                      <p><strong>Model:</strong></p>
                    </div>
                    <div>
                      <p>{data[0].vehicle.modelNumber}</p>
                    </div>
                    <div className="flex justify-end">
                      <p><strong>Color:</strong></p>
                    </div>
                    <div>
                      <p>{data[0].vehicle.color}</p>
                    </div>
                    <div className="flex justify-end">
                      <p><strong>Fuel Type:</strong></p>
                    </div>
                    <div>
                      <p>{data[0].vehicle.fuelType}</p>
                    </div>
                    <div className="flex justify-end">
                      <p><strong>Transmission:</strong></p>
                    </div>
                    <div>
                      <p>{data[0].vehicle.transmission}</p>
                    </div>
                    <div className="flex justify-end">
                      <p><strong>Last Serviced:</strong></p>
                    </div>
                    <div>
                      <p>{new Date(data[0].vehicle.lastServiced).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card card2 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title border-b-2 pb-2">Maintenance Reports</h2>
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Cost</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((entry, index) => (
                        <tr key={index}>
                          <td>{new Date(entry.date).toLocaleDateString()}</td>
                          <td>₹{entry.cost}</td>
                          <td>{entry.type}</td>
                        </tr>
                      ))}
                    </tbody>
                      
                      {/* Total Fuel Cost */}
                      <div className=' ml-4 mt-2'>
                        <p>Total Maintenance Cost : <span className=' font-medium ml-2'>₹{totalMaintainCost}</span> </p>
                      </div>

                  </table>
                </div>
              </div>

              
            </>
          ) : (
            <p className="text-center text-xl">No data yet</p>
          )}
        </div>
      </div>

      <style>
        {`@media print {

          .navbar, .sidebar, .btn-secondary {
            visibility: hidden;
          }
          .container {
            width: 100vw;
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
          .card2 {
            margin-top: -120px;
          }

          .container {
            width: 100vw;
            padding: 0;
            margin: 0;
          }

          .card {
            width: 100vw;
            margin: 0;
            box-shadow: none;
          }

          .grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .flex {
            margin-bottom: 5px;
          }
          body {
            transform: scale(0.8); /* 60% scaling */
            transform-origin: top left;
          }

          /* Ensure the layout fits within the printable area */
          .container {
            width: 100vw;
            padding: 0;
            margin: 0;
          }

          .card {
            width: 200vw;
            margin: 0;
            box-shadow: none;
          }

          .grid {
            grid-template-columns: 1fr 1fr; /* Adjust the grid layout for printing */
            gap: 10px;
          }

          .flex {
            margin-bottom: 5px;
          }

          .card2{
                  width: 125vw;
          }


          /* Ensure no content overflows */
          * {
            overflow: visible;
          }
        }`}
      </style>
    </div>
  );
};

export default MaintenanceReport;
