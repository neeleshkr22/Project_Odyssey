import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const HireCar = () => {
  const [carDetails, setCarDetails] = useState({
    carname: "",
    companyname: "",
    purchasedDate: "",
    bookingDate: "",
    fuelType: "",
    cartype: "",
    modelNumber: "",
    purchasedPrice: "",
    insuranceDetails: {
      provider: "",
      expiryDate: "",
      policyNumber: "",
    },
    color: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields like insuranceDetails
    if (name.includes("insuranceDetails")) {
      const field = name.split(".")[1];  // To get provider, expiryDate, or policyNumber
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        insuranceDetails: {
          ...prevDetails.insuranceDetails,
          [field]: value,
        },
      }));
    } else {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", carDetails);  // Log carDetails to ensure form data is correct

    try {
      const response = await axios.post("http://localhost:3001/addCar", carDetails);
      console.log(response);  // Log the response from the server
      if (response.status === 200) {
        alert("Car added successfully.");
        navigate("/HireCar");
      } else {
        console.error("Failed to add car.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Add Car</h1>
        <form onSubmit={handleSubmit}>
          {[{ name: "carname", placeholder: "Car Name" },
            { name: "companyname", placeholder: "Company Name" },
            { name: "purchasedDate", placeholder: "Purchased Date", type: "date" },
            { name: "bookingDate", placeholder: "Booking Date", type: "date" },
            { name: "fuelType", placeholder: "Fuel Type (e.g., petrol)" },
            { name: "cartype", placeholder: "Car Type (manual/automatic)" },
            { name: "modelNumber", placeholder: "Model Number", type: "number" },
            { name: "purchasedPrice", placeholder: "Purchased Price", type: "number" },
            { name: "color", placeholder: "Color" },
          ].map(({ name, placeholder, type = "text" }) => (
            <div className="mb-4" key={name}>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Insurance Details */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Insurance Details</h3>
            <input
              type="text"
              name="insuranceDetails.provider"
              placeholder="Provider"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="date"
              name="insuranceDetails.expiryDate"
              placeholder="Expiry Date"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="text"
              name="insuranceDetails.policyNumber"
              placeholder="Policy Number"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default HireCar;

