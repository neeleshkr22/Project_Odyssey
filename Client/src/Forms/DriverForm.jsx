import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';  // To make HTTP requests

const DriverForm = () => {
    const [driverDetails, setDriverDetails] = useState({
        name: '',
        contact: '',  // Change 'contact' to 'contactNumber'
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
        <div>
            <Navbar />
            <Sidebar />

            <div className="steps mt-24 z-10 ">
                <ul className="steps w-[90vw] ml-[5.5rem] overflow-x-auto">
                    <li className="step step-primary flex-shrink-0">Add Driver</li>
                    <li className="step step-primary flex-shrink-0">Add Details</li>
                    <li className="step flex-shrink-0">Submit</li>
                </ul>
            </div>

            <form
                onSubmit={handleSubmit}
                style={{ maxWidth: '82vw', margin: 'auto' }}
                className="mt-20 pt-20"
            >
                <h2 className="text-xl font-semibold pb-3 border-b-2 pt-2">Add Driver Details</h2>
                <div className="mt-5">
                    {/* Name */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={driverDetails.name}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* Contact Number */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Contact Number:
                            <input
                                type="text"
                                name="contact"
                                value={driverDetails.contact}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={driverDetails.email}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* Address */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={driverDetails.address}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* License Number */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            License Number:
                            <input
                                type="text"
                                name="licenseNumber"
                                value={driverDetails.licenseNumber}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* License Expiry Date */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            License Expiry Date:
                            <input
                                type="date"
                                name="licenseExpiryDate"
                                value={driverDetails.licenseExpiryDate}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* Driving Experience */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Driving Experience (Years):
                            <input
                                type="number"
                                name="drivingExperience"
                                value={driverDetails.drivingExperience}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* Certifications */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Certifications (comma-separated):
                            <input
                                type="text"
                                name="certifications"
                                value={driverDetails.certifications.join(', ')}
                                onChange={handleCertificationsChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* Status */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Status:
                            <select
                                name="status"
                                value={driverDetails.status}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            >
                                <option value="Available">Available</option>
                                <option value="On Duty">On Duty</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </label>
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-between space-x-5">
                        <button
                            type="button"
                            className="bg-error text-white w-1/2 hover:bg-red-500"
                            style={{
                                padding: '10px 15px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white w-1/2 btn btn-primary"
                            style={{
                                padding: '10px 15px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
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
