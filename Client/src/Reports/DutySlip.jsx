import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DutySlipForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    driver: "",
    startTime: "",
    endTime: "",
    startLocation: "",
    endLocation: "",
    description: "",
  });

  const [drivers, setDrivers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/drivers");
        setDrivers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        setErrorMessage("Failed to load drivers. Please try again later.");
      }
    };

    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`http://localhost:3001/createDuty/${id}`, formData);

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Duty slip created successfully!");
        setFormData({
          driver: "",
          startTime: "",
          endTime: "",
          startLocation: "",
          endLocation: "",
          description: "",
        });
      } else {
        setErrorMessage("Failed to create duty slip.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md  pt-28">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Duty Slip</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Success & Error Messages */}
        {successMessage && (
          <p className="mt-2 text-green-600 text-sm">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
        )}
        {/* Driver */}
        <div>
          <label
            htmlFor="driver"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Driver
          </label>
          <select
            id="driver"
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a driver
            </option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Time */}
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* End Time */}
        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Start Location */}
        <div>
          <label
            htmlFor="startLocation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Location
          </label>
          <input
            type="text"
            id="startLocation"
            name="startLocation"
            value={formData.startLocation}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* End Location */}
        <div>
          <label
            htmlFor="endLocation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Location
          </label>
          <input
            type="text"
            id="endLocation"
            name="endLocation"
            value={formData.endLocation}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>

        {/* Success & Error Messages */}
        {successMessage && (
          <p className="mt-2 text-green-600 text-sm">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
        )}
      </form>
    </div>
    </div>
  );
};

export default DutySlipForm;
