import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Import Axios for making HTTP requests

const PartyForm = () => {
    const [partyDetails, setPartyDetails] = useState({
        name: '',
        address: '',
        contactNumber: '',
        email: '',
        dob: '', // Date of Birth
        idNumber: '', // Identification Number
        companyName: '', // Optional field for company name
        registrationNumber: '', // Optional field for company registration number
        notes: '' // Additional notes
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPartyDetails({ ...partyDetails, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!partyDetails.name || !partyDetails.address || !partyDetails.contactNumber || !partyDetails.email) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            // Send partyDetails to the backend using Axios
            const response = await axios.post('http://localhost:3001/partyForm', partyDetails);

            // Handle successful response
            if (response.status === 201) {
                alert('Party details successfully submitted!');
                console.log('Party Details Submitted:', partyDetails);

                // Optionally reset the form after submission
                setPartyDetails({
                    name: '',
                    address: '',
                    contactNumber: '',
                    email: '',
                    dob: '',
                    idNumber: '',
                    companyName: '',
                    registrationNumber: '',
                    notes: ''
                });
            } else {
                alert('There was an issue submitting the party details.');
            }
        } catch (error) {
            console.error('Error submitting party details:', error);
            alert('There was an error submitting the party details. Please try again later.');
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <Navbar />
            <Sidebar />

            {/* Steps Section */}
            <div className="steps mt-24 z-10">
                <ul className="steps w-[90vw] ml-[5.5rem] overflow-x-auto">
                    <li className="step step-primary flex-shrink-0">Add Party</li>
                    <li className="step step-primary flex-shrink-0">Add Details</li>
                    <li className="step flex-shrink-0">Submit</li>
                </ul>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} style={{ maxWidth: '82vw', margin: 'auto' }} className="mt-10 pt-10">
                <h2 className="text-xl font-semibold pb-3 border-b-2">Add Party Details</h2>
                <div className="mt-5">
                    {/* Party Details */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={partyDetails.name}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={partyDetails.address}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Contact Number:
                            <input
                                type="text"
                                name="contactNumber"
                                value={partyDetails.contactNumber}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={partyDetails.email}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Date of Birth:
                            <input
                                type="date"
                                name="dob"
                                value={partyDetails.dob}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            ID Number:
                            <input
                                type="text"
                                name="idNumber"
                                value={partyDetails.idNumber}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between space-x-5">
                        <button
                            type="button"
                            className="bg-error text-white w-1/2 hover:bg-red-500"
                            style={{
                                padding: '10px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                border: 'none',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white w-1/2 btn btn-primary"
                            style={{
                                padding: '10px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                border: 'none',
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

export default PartyForm;
