import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';  // To make HTTP requests

const DriverForm = () => {
    const [driverDetails, setDriverDetails] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
        licenseNumber: '',
        licenseExpiryDate: '',
        drivingExperience: '',
        certifications: [],
        status: 'Available',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriverDetails({ ...driverDetails, [name]: value });
    };

    const handleCertificationsChange = (e) => {
        const { value } = e.target;
        setDriverDetails({
            ...driverDetails,
            certifications: value.split(',').map(item => item.trim()), // Split by commas, trim spaces
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (
            !driverDetails.name ||
            !driverDetails.contact ||
            !driverDetails.email ||
            !driverDetails.licenseNumber ||
            !driverDetails.licenseExpiryDate ||
            !driverDetails.address
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            // Send data to backend using axios
            const response = await axios.post('http://localhost:3001/driverForm', driverDetails);

            if (response.status === 201) {
                alert('Driver details successfully added!');
                setDriverDetails({
                    name: '',
                    contact: '',
                    email: '',
                    address: '',
                    licenseNumber: '',
                    licenseExpiryDate: '',
                    drivingExperience: '',
                    certifications: [],
                    status: 'Available',
                });
            } else {
                alert('Error adding driver details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the driver details.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <Sidebar />


            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto mt-20 p-8 bg-white shadow-md rounded-lg"
            >
            <div className="steps mt-5 -ml-10 z-10">
                <ul className="steps w-[60vw] overflow-x-auto">
                    <li className="step step-primary flex-shrink-0">Add Driver</li>
                    <li className="step step-primary flex-shrink-0">Add Details</li>
                    <li className="step flex-shrink-0">Submit</li>
                </ul>
            </div>

                <h2 className="text-2xl font-semibold pb-3 border-b-2 mt-8">Add Driver Details</h2>
                <div className="mt-5 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={driverDetails.name}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Contact Number:
                            <input
                                type="text"
                                name="contact"
                                value={driverDetails.contact}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={driverDetails.email}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={driverDetails.address}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* License Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            License Number:
                            <input
                                type="text"
                                name="licenseNumber"
                                value={driverDetails.licenseNumber}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* License Expiry Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            License Expiry Date:
                            <input
                                type="date"
                                name="licenseExpiryDate"
                                value={driverDetails.licenseExpiryDate}
                                onChange={handleChange}
                                required
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Driving Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Driving Experience (Years):
                            <input
                                type="number"
                                name="drivingExperience"
                                value={driverDetails.drivingExperience}
                                onChange={handleChange}
                                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {/* Certifications */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Certifications (comma-separated):
                            <input
                                type="text"
                                name="certifications"
                                value={driverDetails.certifications.join(', ')}
                                onChange={handleCertificationsChange}
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
                                value={driverDetails.status}
                                onChange={handleChange}
                                className="mt-1 p-1 block w-full border-gray-200 border-2 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            >
                                <option value="Available">Available</option>
                                <option value="On Duty">On Duty</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </label>
                    </div>

                    {/* Submit and Cancel Buttons */}
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

export default DriverForm;