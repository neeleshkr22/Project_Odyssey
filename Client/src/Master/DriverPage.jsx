import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DriverPage = () => {
    const { id } = useParams();
    const [driver, setDriver] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/driver/${id}`);
                console.log('Driver:', response.data);
                setDriver(response.data); // Save the single object
            } catch (err) {
                console.error('Error fetching data:', err.message);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <Sidebar />

            <div className="p-5">
                {driver ? (
                    <div className="flex justify-center gap-5 mt-10">
                        <div className="bg-white shadow-md rounded-2xl w-3/6 p-5 text-base mt-20">
                            <h1 className="text-3xl font-semibold text-gray-800 border-b-2 pb-2">Driver Details</h1>
                            <div className='mt-3'>

                                {[
                                    { label: "Name:", value: driver.name },
                                    { label: "License Number:", value: driver.licenseNumber },
                                    { label: "Contact Number:", value: driver.contact },
                                    { label: "Address:", value: driver.address },
                                    {label: "Driving Experience: ", value: driver.drivingExperience},
                                    {label: "status: ", value: driver.status },
                                    {label: "certifications: ", value: driver.certifications },
                                    
                                ].map((item, index) => (
                                    <div key={index} className="flex justify-between border-b border-gray-200 py-2">
                                        <h3 className="font-medium text-gray-600">{item.label}</h3>
                                        <p className="text-gray-800">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-2xl w-1/4 p-5 text-base mt-20">
                            <h1 className="text-3xl font-semibold text-gray-800 border-b-2 pb-2">Assigned Vehicles</h1>
                            {driver.assignedVehicles.length > 0 ? (
                                driver.assignedVehicles.map(vehicle => (
                                    <div key={vehicle._id} className="flex justify-between border-b border-gray-200 py-2">
                                        <h3 className="font-medium text-gray-600">{vehicle.VehicleType} - {vehicle.licenceNumber}</h3>
                                        <p className="text-gray-800">{vehicle.status}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No assigned vehicles.</p>
                            )}
                        </div>

                        
                    </div>
                    

                ) : (
                    <p>Loading driver details...</p>
                )}
            </div>
        </div>
    );
}

export default DriverPage;
