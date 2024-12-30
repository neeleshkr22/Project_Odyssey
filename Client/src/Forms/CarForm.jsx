import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';  // Import axios

const CarForm = () => {
    const [carDetails, setCarDetails] = useState({
        VehicleType: '',
        comapnyName: '',
        modelNumber: '',
        registrationDate: '',
        licenceregistry: false,
        licenceNumber: '',
        color: '',
        fuelType: '',
        transmission: '',
        lastServiced: '',
        insuranceDetails: {
            provider: '',
            policyNumber: '',
            expiryDate: ''
        },
        status: 'Active',
        ownerName: '',
        ownerConntact: '',
        ownerAddress: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested insurance details
        if (name.startsWith('insuranceDetails.')) {
            const key = name.split('.')[1];
            setCarDetails(prev => ({
                ...prev,
                insuranceDetails: { ...prev.insuranceDetails, [key]: value }
            }));
        } else if (name === 'licenceregistry') {
            // Handle checkbox for license registry
            setCarDetails({ ...carDetails, [name]: e.target.checked });
        } else {
            setCarDetails({ ...carDetails, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!carDetails.VehicleType || !carDetails.comapnyName || !carDetails.modelNumber || !carDetails.licenceNumber ||
            !carDetails.color || !carDetails.fuelType || !carDetails.transmission || !carDetails.lastServiced ||
            !carDetails.ownerName || !carDetails.ownerConntact || !carDetails.ownerAddress) {
            alert("Please fill in all fields.");
            return;
        }

        console.log('Car Details Submitted:', carDetails);

        try {
            const response = await axios.post('http://localhost:3001/vehicleForm', carDetails, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            alert('Car details successfully submitted!');
            // Reset form after submission
            setCarDetails({
                VehicleType: '',
                comapnyName: '',
                modelNumber: '',
                registrationDate: '',
                licenceregistry: false,
                licenceNumber: '',
                color: '',
                fuelType: '',
                transmission: '',
                lastServiced: '',
                insuranceDetails: {
                    provider: '',
                    policyNumber: '',
                    expiryDate: ''
                },
                status: 'Active',
                ownerName: '',
                ownerConntact: '',
                ownerAddress: ''
            });
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your details.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <Sidebar />


            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-20 p-8 bg-white shadow-md rounded-lg">

            <div className="steps mt-5 z-10">
                <ul className="steps w-[60vw] -ml-10 overflow-x-auto">
                    <li className="step step-primary flex-shrink-0">Add Vehicle</li>
                    <li className="step step-primary flex-shrink-0">Add Details</li>
                    <li className="step flex-shrink-0">Submit</li>
                </ul>
            </div>
                <h2 className="text-2xl font-semibold pb-3 border-b-2 mt-10">Add Vehicle Details</h2>

                <div className="mt-5 space-y-4">
                    {/* Vehicle Details */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Vehicle Type:
                            <select
                                name="VehicleType"
                                value={carDetails.VehicleType}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border-2 border-gray-200 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            >
                                <option value="">Select Type</option>
                                <option value="Car">Car</option>
                                <option value="Truck">Truck</option>
                                <option value="Bike">Bike</option>
                            </select>
                        </label>
                    </div>

                    {/* Company Name */}
                    <div>
                     <label className="block text-sm font-medium text-gray-700">
                            Company Name:
                            <input
                                type="text"
                                name="comapnyName"
                                value={carDetails.comapnyName}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Model Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Model Number:
                            <input
                                type="number"
                                name="modelNumber"
                                value={carDetails.modelNumber}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Registration Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Registration Date:
                            <input
                                type="date"
                                name="registrationDate"
                                value={carDetails.registrationDate}
                                onChange={handleChange}
                                className="mt-1 p-1  block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* License Registry */}
                    <div>
                        <label className="flex items-center">
                            License Registry
                            <input
                                type="checkbox"
                                name="licenceregistry"
                                checked={carDetails.licenceregistry}
                                onChange={handleChange}
                                className="mr-2"
                            />
                        </label>
                    </div>

                    {/* License Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            License Number:
                            <input
                                type="number"
                                name="licenceNumber"
                                value={carDetails.licenceNumber}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Color:
                            <input
                                type="text"
                                name="color"
                                value={carDetails.color}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Fuel Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Fuel Type:
                            <select
                                name="fuelType"
                                value={carDetails.fuelType}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-200 border-2 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            >
                                <option value="">Select Fuel Type</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                            </select>
                        </label>
                    </div>

                    {/* Transmission */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Transmission:
                            <select
                                name="transmission"
                                value={carDetails.transmission}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-200 border-2 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            >
                                <option value="">Select Transmission</option>
                                <option value="semi-automatic">Semi-Automatic</option>
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                            </select>
                        </label>
                    </div>

                    {/* Last Serviced */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Last Serviced:
                            <input
                                type="date"
                                name="lastServiced"
                                value={carDetails.lastServiced}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Insurance Details */}
                    <h2 className="text-2xl font-semibold pb-3 border-b-2 mt-24 pt-10">Add Insurance Details</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Provider:
                            <input
                                type="text"
                                name="insuranceDetails.provider"
                                value={carDetails.insuranceDetails.provider}
                                onChange={handleChange}
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Policy Number:
                            <input
                                type="text"
                                name="insuranceDetails.policyNumber"
                                value={carDetails.insuranceDetails.policyNumber}
                                onChange={handleChange}
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Expiry Date:
                            <input
                                type="date"
                                name="insuranceDetails.expiryDate"
                                value={carDetails.insuranceDetails.expiryDate}
                                onChange={handleChange}
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Status:
                            <select
                                name="status"
                                value={carDetails.status}
                                onChange={handleChange}
                                className="mt-1 p-1 block w-full border-gray-200 border-2 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Sold">Sold</option>
                                <option value="Under Maintenance">Under Maintenance</option>
                            </select>
                        </label>
                    </div>

                    {/* Owner Details */}
                    <h2 className="text-2xl font-semibold pb-3 border-b-2 mt-10 pt-10">Add Owner Details</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Owner Name:
                            <input
                                type="text"
                                name="ownerName"
                                value={carDetails.ownerName}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Owner Contact:
                            <input
                                type="number"
                                name="ownerConntact"
                                value={carDetails.ownerConntact}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Owner Address:
                            <input
                                type="text"
                                name="ownerAddress"
                                value={carDetails.ownerAddress}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between space-x-5 mt-6">
                        <button
                            type="button"
                            className="bg-red-500 text-white w-1/2 hover:bg-red-600 rounded-md py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white w-1/2 hover:bg-blue-600 rounded-md py-2"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CarForm;