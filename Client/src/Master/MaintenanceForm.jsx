import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MaintenanceForm = () => {
  const { id } = useParams();

  // Initialize state with default values
  const [maintenanceCost, setMaintenanceCost] = useState('');
  const [fuelQuantity, setFuelQuantity] = useState({
    fuelType: '',
    fuelCost: '',
    fuelAmount: '',
  });
  const [maintenanceDate, setMaintenanceDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      maintenanceCost,
      fuelQuantity,
      maintenanceDate,
    };

    try {
      if (isEditing) {
        // Update the maintenance record
        const response = await axios.put(`http://localhost:3001/vehicles/${id}/maintenance`, data);
        console.log('Maintenance updated:', response.data);
        alert('Maintenance details updated successfully!');
      } else {
        // Add a new maintenance record
        const response = await axios.post(`http://localhost:3001/vehicles/${id}/maintenance`, data);
        console.log('Maintenance added:', response.data);
        alert('Maintenance details added successfully!');
      }
    } catch (err) {
      console.error('Error adding/updating maintenance details:', err);
      alert('Failed to save maintenance details. Please try again.');
    }
  };

  // Fetch existing maintenance details when the component mounts or ID changes
  useEffect(() => {
    const fetchMaintenanceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vehicles/${id}/maintenance`);
        if (response.data) {
          const { maintenanceCost, fuelQuantity, maintenanceDate } = response.data;
          setMaintenanceCost(maintenanceCost || '');  // Ensure non-undefined
          setFuelQuantity(fuelQuantity || { fuelType: '', fuelCost: '', fuelAmount: '' });  // Ensure fuelQuantity is always an object
          setMaintenanceDate(maintenanceDate || '');  // Ensure maintenanceDate is always a string
          setIsEditing(true);
        }
      } catch (err) {
        console.error('Error fetching maintenance details:', err.message);
      }
    };

    fetchMaintenanceDetails();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-5 text-center">
          {isEditing ? 'Edit Maintenance Details' : 'Add Maintenance Details'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Maintenance Cost</label>
            <input
              type="number"
              value={maintenanceCost || ''}
              onChange={(e) => setMaintenanceCost(e.target.value)}
              required
              placeholder="Enter maintenance cost"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Fuel Type</label>
            <input
              type="text"
              value={fuelQuantity.fuelType || ''}
              onChange={(e) => setFuelQuantity({ ...fuelQuantity, fuelType: e.target.value })}
              required
              placeholder="Enter fuel type"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Fuel Cost</label>
            <input
              type="number"
              value={fuelQuantity.fuelCost || ''}
              onChange={(e) => setFuelQuantity({ ...fuelQuantity, fuelCost: e.target.value })}
              required
              placeholder="Enter fuel cost"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Fuel Amount</label>
            <input
              type="number"
              value={fuelQuantity.fuelAmount || ''}
              onChange={(e) => setFuelQuantity({ ...fuelQuantity, fuelAmount: e.target.value })}
              required
              placeholder="Enter fuel amount"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Maintenance Date</label>
            <input
              type="date"
              value={maintenanceDate || ''}
              onChange={(e) => setMaintenanceDate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 transition duration-200 w-full"
          >
            {isEditing ? 'Update Maintenance' : 'Add Maintenance'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;
