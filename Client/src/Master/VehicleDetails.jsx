import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FuelReport = () => {
  const [vehicle, setVehicle] = useState('');
  const [data, setData] = useState([]); // Initialize data as an array
  const [vehiclesList, setVehiclesList] = useState([]); // Store all vehicle IDs
  const [filteredVehicles, setFilteredVehicles] = useState([]); // Filtered vehicle IDs for suggestions

  // Fetch all vehicles on component mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vehicles');
        setVehiclesList(response.data); // Set the fetched vehicle list
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  // Handle vehicle ID input change and filter suggestions
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setVehicle(inputValue);

    // Filter vehicle IDs based on the input value
    const filtered = vehiclesList.filter(vehicle =>
      vehicle._id.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredVehicles(filtered);
  };

  // Handle submitting the vehicle ID
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/fuelReport', { params: { vehicle } });
      setData(response.data); // Store the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Clear data on error
    }
  };

  // Handle selecting a suggestion
  const handleSuggestionClick = (id) => {
    setVehicle(id); // Set the selected vehicle ID as input value
    setFilteredVehicles([]); // Clear the suggestions
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl text-center font-bold text-gray-800 mb-8">Fuel Report</h1>

      {/* Form to submit vehicle ID */}
      <form onSubmit={handleSubmit} className="flex justify-center mb-10">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Enter Vehicle ID"
            className="input input-bordered w-full"
            value={vehicle}
            onChange={handleInputChange}
          />
          {/* Show suggestions below input */}
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
        <button type="submit" className="btn btn-primary ml-4">Submit</button>
      </form>

      {/* Display vehicle and fuel data */}
      <div>
        {data.length > 0 ? (
          <>
            {/* Vehicle Details */}
            <div className="card shadow-xl mb-10">
              <div className="card-body">
                <h2 className="card-title">Vehicle Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <p><strong>ID:</strong> {data[0].vehicle._id}</p>
                    <p><strong>Type:</strong> {data[0].vehicle.VehicleType}</p>
                    <p><strong>Company:</strong> {data[0].vehicle.comapnyName}</p>
                    <p><strong>Model:</strong> {data[0].vehicle.modelNumber}</p>
                    <p><strong>Color:</strong> {data[0].vehicle.color}</p>
                  </div>
                  <div>
                    <p><strong>Fuel Type:</strong> {data[0].vehicle.fuelType}</p>
                    <p><strong>Transmission:</strong> {data[0].vehicle.transmission}</p>
                    <p><strong>Last Serviced:</strong> {data[0].vehicle.lastServiced}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fuel Data in Tabular Format */}
            <div className="card shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Fuel Reports</h2>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Cost</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.date}</td>
                        <td>{entry.cost}</td>
                        <td>{entry.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-xl">No data yet</p>
        )}
      </div>
    </div>
  );
};

export default FuelReport;
