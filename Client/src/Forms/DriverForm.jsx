import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DriverForm = () => {
    const [driverDetails, setDriverDetails] = useState({
        name: '',
        contact: '',
        licenseNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriverDetails({ ...driverDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!driverDetails.name || !driverDetails.contact || !driverDetails.licenseNumber) {
            alert("Please fill in all fields.");
            return;
        }

        console.log('Driver Details Submitted:', driverDetails);
        
        // Reset form after submission (optional)
        setDriverDetails({
            name: '',
            contact: '',
            licenseNumber: ''
        });
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
            <form onSubmit={handleSubmit} style={{ maxWidth: '82vw', margin: 'auto' }} className='mt-20 pt-20'>
                <h2 className='text-xl font-semibold pb-3 border-b-2 pt-2'>Add Driver Details</h2>
                <div className='mt-5'>
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
                    <div className='flex justify-between space-x-5'> 
                        <button type="button" className='bg-error text-white w-1/2 hover:bg-red-500' style={{ padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Cancel
                        </button>
                        <button type="submit" className='bg-primary text-white w-1/2 btn btn-primary' style={{ padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DriverForm;
