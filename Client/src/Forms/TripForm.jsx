import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Import Axios for making HTTP requests

const TripForm = () => {
    const [tripDetails, setTripDetails] = useState({
        vehicle: '',
        driver: '',
        party: '',
        tripStartLocation: '',
        tripEndLocation: '',
        startDate: '',
        endDate: '',
        distance: '',
        fareDetails: {
            baseFare: 0,
            additionalCharges: 0,
            totalFare: 0,
            paymentStatus: 'Pending',
        },
        tripStatus: 'Scheduled',
        notes: ''
    });

    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [parties, setParties] = useState([]);

    const PRICE_PER_KM = 10;

    // Fetch data for vehicles, drivers, and parties (You can modify this according to your API)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch vehicles
                const vehiclesResponse = await axios.get('http://localhost:3001/vehicles');
                setVehicles(vehiclesResponse.data);
                console.log('Vehicles:', vehiclesResponse.data);
    
                // Fetch drivers
                const driversResponse = await axios.get('http://localhost:3001/drivers');
                setDrivers(driversResponse.data);
                console.log('Drivers:', driversResponse.data);
    
                // Fetch parties
                const partiesResponse = await axios.get('http://localhost:3001/parties');
                setParties(partiesResponse.data);
                console.log('Parties:', partiesResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err.message);
            }
        };
        fetchData();
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('fareDetails.')) {
            const fareField = name.split('.')[1];
            setTripDetails({
                ...tripDetails,
                fareDetails: {
                    ...tripDetails.fareDetails,
                    [fareField]: value
                }
            });
        } else {
            setTripDetails({ ...tripDetails, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tripDetails.vehicle || !tripDetails.driver || !tripDetails.party || !tripDetails.tripStartLocation || !tripDetails.tripEndLocation || !tripDetails.startDate || !tripDetails.distance) {
            alert("Please fill in all required fields.");
            return;
        }

        const totalFare = (PRICE_PER_KM * tripDetails.distance) + parseFloat(tripDetails.fareDetails.additionalCharges);
        
        setTripDetails(prevState => ({
            ...prevState,
            fareDetails: {
                ...prevState.fareDetails,
                baseFare: PRICE_PER_KM * tripDetails.distance,
                totalFare: totalFare
            }
        }));

        try {
            // Send tripDetails to the backend using Axios
            const response = await axios.post('http://localhost:3001/tripForm', tripDetails);

            if (response.status === 201) {
                alert('Trip details successfully submitted!');
                console.log('Trip Details Submitted:', tripDetails);
                
                // Optionally reset the form after submission
                setTripDetails({
                    vehicle: '',
                    driver: '',
                    party: '',
                    tripStartLocation: '',
                    tripEndLocation: '',
                    startDate: '',
                    endDate: '',
                    distance: '',
                    fareDetails: {
                        baseFare: 0,
                        additionalCharges: 0,
                        totalFare: 0,
                        paymentStatus: 'Pending',
                    },
                    tripStatus: 'Scheduled',
                    notes: ''
                });
            } else {
                alert('There was an issue submitting the trip details.');
            }
        } catch (error) {
            console.error('Error submitting trip details:', error);
            alert('There was an error submitting the trip details. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <Sidebar />

            <div className="container mx-auto mt-10 p-5 pt-10 bg-white shadow-lg rounded-lg w-4/5">
                <h2 className='text-2xl font-bold text-center mb-6'>Add Trip Details</h2>
                
                
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Vehicle */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Driver ID:</label>
                            <select 
                                name="vehicle" 
                                value={tripDetails.vehicle} 
                                onChange={handleChange} 
                                required
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'>
                                <option value="">Select Driver</option>
                                {vehicles.map(veh => (
                                    <option key={veh._id} value={veh._id}>
                                        {veh._id}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Driver */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Driver ID:</label>
                            <select 
                                name="driver" 
                                value={tripDetails.driver} 
                                onChange={handleChange} 
                                required
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'>
                                <option value="">Select Driver</option>
                                {drivers.map(driver => (
                                    <option key={driver._id} value={driver._id}>
                                        {driver.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Assigned Party */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Party ID:</label>
                            <select 
                                name="party" 
                                value={tripDetails.party} 
                                onChange={handleChange} 
                                required
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'>
                                <option value="">Select Party</option>
                                {parties.map(party => (
                                    <option key={party._id} value={party._id}>
                                        {party.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Trip Start Location */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Trip Start Location:</label>
                            <input 
                                type="text" 
                                name="tripStartLocation" 
                                value={tripDetails.tripStartLocation} 
                                onChange={handleChange} 
                                required 
                                placeholder="Enter Start Location"
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
                            />
                        </div>

                        {/* Trip End Location */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Trip End Location:</label>
                            <input 
                                type="text" 
                                name="tripEndLocation" 
                                value={tripDetails.tripEndLocation} 
                                onChange={handleChange} 
                                required 
                                placeholder="Enter End Location"
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
                            />
                        </div>

                        {/* Time Period */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Start Date:</label>
                            <input 
                                type="date" 
                                name="startDate" 
                                value={tripDetails.startDate} 
                                onChange={handleChange} 
                                required
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>End Date:</label>
                            <input 
                                type="date" 
                                name="endDate" 
                                value={tripDetails.endDate} 
                                onChange={handleChange} 
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
                            />
                        </div>

                        {/* Distance */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Distance (in km):</label>
                            <input 
                                type="number" 
                                name="distance" 
                                value={tripDetails.distance} 
                                onChange={handleChange} 
                                required
                                placeholder="Enter Distance"
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
                            />
                        </div>

                    </div>

                    {/* Fare Details */}
                    <h3 className='text-lg font-semibold mt-6'>Fare Details</h3>

                    {/* Base Fare */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Base Fare (auto-calculated):</label>
                        <input
                          type="number"
                          name="fareDetails.baseFare"
                          value={(PRICE_PER_KM * tripDetails.distance).toFixed(2)}
                          readOnly
                          className='mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm p-2'
                        />
                    </div>

                    {/* Additional Charges */}
                    <div style={{ marginBottom:'15px'}}>
                        <label className='block text-sm font-medium text-gray-700'>Additional Charges:</label>
                        <input
                          type="number"
                          name="fareDetails.additionalCharges"
                          value={tripDetails.fareDetails.additionalCharges}
                          onChange={handleChange}
                          placeholder="Enter Additional Charges"
                          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
                        />
                    </div>

                    {/* Total Fare Display */}
                    <div style={{ marginBottom:'15px', fontWeight:'bold'}}>
                        Total Cost (in Rupees): ₹{(PRICE_PER_KM * tripDetails.distance + parseFloat(tripDetails.fareDetails.additionalCharges)).toFixed(2)}
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

                </form>
            </div>
        </div>
    );
};

export default TripForm;
