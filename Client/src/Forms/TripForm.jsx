import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const TripForm = () => {
    const [tripDetails, setTripDetails] = useState({
        vehicleName: '', // Field for the name of the vehicle
        assignedParty: '',
        startDate: '',
        endDate: '',
        distance: '' // Distance for the trip
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetails({ ...tripDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!tripDetails.vehicleName || !tripDetails.assignedParty || !tripDetails.startDate || !tripDetails.endDate || !tripDetails.distance) {
            alert("Please fill in all required fields.");
            return;
        }

        console.log('Trip Details Submitted:', tripDetails);
        
        // Reset form after submission (optional)
        setTripDetails({
            vehicleName: '',
            assignedParty: '',
            startDate: '',
            endDate: '',
            distance: ''
        });
    };

    return (
        <div>
            <Navbar />
            <Sidebar />

            {/* Steps Section */}
            <div className="steps mt-24 z-10">
                <ul className="steps w-[90vw] ml-[5.5rem] overflow-x-auto">
                    <li className="step step-primary flex-shrink-0">Add Trip</li>
                    <li className="step step-primary">Add Details</li>
                    <li className="step">Submit</li>
                </ul>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} style={{ maxWidth: '82vw', margin: 'auto' }} className='mt-10 pt-10'>
                <h2 className='text-xl font-semibold pb-3 border-b-2'>Add Trip Details</h2>
                <div className='mt-5'>
                    {/* Vehicle Name */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Vehicle Name:
                            <input 
                                type="text" 
                                name="vehicleName" 
                                value={tripDetails.vehicleName} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>

                    {/* Assigned Party */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Assigned Party:
                            <input 
                                type="text" 
                                name="assignedParty" 
                                value={tripDetails.assignedParty} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>

                    {/* Time Period */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Start Date:
                            <input 
                                type="date" 
                                name="startDate" 
                                value={tripDetails.startDate} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            End Date:
                            <input 
                                type="date" 
                                name="endDate" 
                                value={tripDetails.endDate} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>

                    {/* Distance */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Distance (in km):
                            <input 
                                type="number" 
                                name="distance" 
                                value={tripDetails.distance} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className='flex justify-between space-x-5'> 
                        <button type="button" className='bg-error text-white w-1/2 hover:bg-red-500' style={{ padding:'10px 15px', borderRadius:'5px', cursor:'pointer', border:'none'}}>
                            Cancel
                        </button>
                        <button type="submit" className='bg-primary text-white w-1/2 btn btn-primary' style={{ padding:'10px 15px', borderRadius:'5px', cursor:'pointer', border:'none'}}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TripForm;
