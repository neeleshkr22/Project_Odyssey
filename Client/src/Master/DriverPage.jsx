import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DriverPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true); // For loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/driver/${id}`);
                console.log('Driver:', response.data);
                setDriver(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Show loading state while data is being fetched
    if (loading) {
        return <div>Loading driver details...</div>;
    }

    // Render the driver details if available
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <Sidebar />
            <button
          onClick={() => navigate(-1)}
          className="btn btn-primary text-[15px] px-6 py-2 absolute right-20 top-20"
        >
          <i className="bi bi-arrow-left"></i> Back
        </button>

            <div className="p-5">
                {driver ? (
                    <div className="flex justify-center gap-5 mt-10">
                        <div className="bg-white shadow-md rounded-2xl w-3/6 p-5 text-base mt-20">
                            <h1 className="text-3xl font-semibold text-gray-800 border-b-2 pb-2">Driver Details</h1>
                            <div className='mt-3'>
                                {[{
                                    label: "Name:", value: driver.DriverData.name
                                }, {
                                    label: "License Number:", value: driver.DriverData.licenseNumber
                                }, {
                                    label: "Contact Number:", value: driver.DriverData.contact
                                }, {
                                    label: "Address:", value: driver.DriverData.address
                                }, {
                                    label: "Driving Experience:", value: driver.DriverData.drivingExperience
                                }, {
                                    label: "Status:", value: driver.DriverData.status
                                }, {
                                    label: "Certifications:", value: driver.DriverData.certifications
                                }].map((item, index) => (
                                    <div key={index} className="flex justify-between border-b border-gray-200 py-2">
                                        <h3 className="font-medium text-gray-600">{item.label}</h3>
                                        <p className="text-gray-800">{item.value || 'Not available'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-2xl w-2/5 p-5 text-base mt-20">
                            <h1 className="text-3xl font-semibold text-gray-800 border-b-2 pb-2">
                                Assigned Vehicles
                            </h1>
                            {driver.TripData && driver.TripData.length > 0 ? (
                                driver.TripData.map((trip, index) => (
                                    <div key={index} className="border-b pt-5 pb-5 border-gray-200 py-2">
                                        <div className="flex justify-between text-gray-800">
                                            <span className="font-semibold">Model Number:</span>
                                            <span>{trip.vehicle.modelNumber}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-800">
                                            <span className="font-semibold">Color:</span>
                                            <span>{trip.vehicle.color}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-800">
                                            <span className="font-semibold">Company Name:</span>
                                            <span>{trip.vehicle.comapnyName}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-800">
                                            <span className="font-semibold">Vehicle ID:</span>
                                            <span>{trip.vehicle._id}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No assigned vehicles.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>No driver details available.</p>
                )}
            </div>

            <div className=' flex justify-center mb-10 '>
                <div className="bg-white shadow-lg rounded-2xl w-[88%] p-5 text-base mt-6">
                    <h1 className="text-3xl font-semibold text-gray-800 border-b-2 pb-2">
                        Trips
                    </h1>
                    {driver.TripData && driver.TripData.length > 0 ? (
                        driver.TripData.map((trip, index) => (
                            <div key={index} className="border-b pt-5 pb-5 border-gray-200 py-2">
                                <div className="flex justify-between text-gray-800 pt-2">
                                    <span className="font-semibold">Party ID:</span>
                                    <span>{trip.party}</span>
                                </div>
                                <div className="flex justify-between text-gray-800 pt-2">
                                    <span className="font-semibold">Vehicle ID:</span>
                                    <span>{trip.vehicle._id}</span>
                                </div>
                                <div className="flex justify-between text-gray-800 pt-2">
                                    <span className="font-semibold">Start Date</span>
                                    <span>{trip.startDate}</span>
                                </div>
                                <div className="flex justify-between text-gray-800 pt-2">
                                    <span className="font-semibold">End Date</span>
                                    <span>{trip.endDate}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No trips available.</p>
                    )}
                </div>
            </div>

        </div>
    );
}

export default DriverPage;
