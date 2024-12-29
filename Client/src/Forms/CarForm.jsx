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
        fuelQuantity: '',
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

            if (response.status === 200) {
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
            } else {
                alert('Error submitting car details');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your details.');
        }
    };

    return (
        <div>
            <Navbar />
            <Sidebar />

            <div className="steps mt-24 z-10">
                <ul className="steps w-[90vw] ml-[5.5rem] overflow-x-auto">
                    <li className="step step-primary flex-shrink-0">Add Vehicle</li>
                    <li className="step step-primary flex-shrink-0">Add Details</li>
                    <li className="step flex-shrink-0">Submit</li>
                </ul>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '82vw', margin: 'auto' }} className="mt-20 pt-20">
                <h2 className="text-xl font-semibold pb-3 border-b-2 pt-2">Add Vehicle Details</h2>

                <div className="mt-5">
                    {/* Vehicle Details */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Vehicle Type:
                            <select
                                name="VehicleType"
                                value={carDetails.VehicleType}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            >
                                <option value="">Select Type</option>
                                <option value="Car">Car</option>
                                <option value="Truck">Truck</option>
                                <option value="Bike">Bike</option>
                            </select>
                        </label>
                    </div>

                    {/* Company Name */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Company Name:
                            <input
                                type="text"
                                name="comapnyName"
                                value={carDetails.comapnyName}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* Model Number */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Model Number:
                            <input
                                type="number"
                                name="modelNumber"
                                value={carDetails.modelNumber}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* Registration Date */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Registration Date:
                            <input
                                type="date"
                                name="registrationDate"
                                value={carDetails.registrationDate}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    {/* License Registry */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            License Registry:
                            <input
                                type="checkbox"
                                name="licenceregistry"
                                checked={carDetails.licenceregistry}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    {/* License Number */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            License Number:
                            <input
                                type="number"
                                name="licenceNumber"
                                value={carDetails.licenceNumber}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    {/* Color */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Color:
                            <input
                                type="text"
                                name="color"
                                value={carDetails.color}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    {/* Fuel Type */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Fuel Type:
                            <select
                                name="fuelType"
                                value={carDetails.fuelType}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            >
                                <option value="">Select Fuel Type</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                            </select>
                        </label>
                    </div>

                    {/* Transmission */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Transmission:
                            <select
                                name="transmission"
                                value={carDetails.transmission}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            >
                                <option value="">Select Transmission</option>
                                <option value="semi-automatic">Semi-Automatic</option>
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                            </select>
                        </label>
                    </div>

                    {/* Last Serviced */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Last Serviced:
                            <input
                                type="date"
                                name="lastServiced"
                                value={carDetails.lastServiced}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    {/* Insurance Details */}
                    <h3 className="text-lg font-semibold">Insurance Details</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Provider:
                            <input
                                type="text"
                                name="insuranceDetails.provider"
                                value={carDetails.insuranceDetails.provider}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Policy Number:
                            <input
                                type="text"
                                name="insuranceDetails.policyNumber"
                                value={carDetails.insuranceDetails.policyNumber}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Expiry Date:
                            <input
                                type="date"
                                name="insuranceDetails.expiryDate"
                                value={carDetails.insuranceDetails.expiryDate}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    {/* Status */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Status:
                            <select
                                name="status"
                                value={carDetails.status}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Sold">Sold</option>
                                <option value="Under Maintenance">Under Maintenance</option>
                            </select>
                        </label>
                    </div>

                    {/* Owner Details */}
                    <h3 className="text-lg font-semibold">Owner Details</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Owner Name:
                            <input
                                type="text"
                                name="ownerName"
                                value={carDetails.ownerName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Owner Contact:
                            <input
                                type="number"
                                name="ownerConntact"
                                value={carDetails.ownerConntact}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Owner Address:
                            <input
                                type="text"
                                name="ownerAddress"
                                value={carDetails.ownerAddress}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between space-x-5">
                        <button
                            type="button"
                            className="bg-error text-white w-1/2 hover:bg-red-500"
                            style={{ padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white w-1/2 btn btn-primary"
                            style={{ padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
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
