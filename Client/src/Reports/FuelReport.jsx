import React, { useState } from 'react';
import axios from 'axios';

const FuelReport = () => {
  const [vehicle, setVehicle] = useState('');
  const [data, setData] = useState(null); // State to store the response data

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/fuelReport', { params: { vehicle } });
      setData(response.data); // Store the response data
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData({ error: 'Unable to fetch data' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="vehicle"
          placeholder="Enter vehicle ID"
          onChange={(e) => setVehicle(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Render fetched data */}
      <div>
        {data ? (
          typeof data.error === 'string' ? (
            <p>{data.error}</p>
          ) : (
            <div>
              <h3>Vehicle Information</h3>
              <ul>
                {Object.entries(data).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                  </li>
                ))}
              </ul>
            </div>
          )
        ) : (
          <p>No data yet</p>
        )}
      </div>
    </div>
  );
};

export default FuelReport;
