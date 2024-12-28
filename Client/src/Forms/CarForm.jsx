import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const CarForm = () => {
    const [carDetails, setCarDetails] = useState({
        make: '',
        model: '',
        year: '',
        licensePlate: '',
        ownerName: '',
        ownerContact: '',
        ownerAddress: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({ ...carDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!carDetails.make || !carDetails.model || !carDetails.year || !carDetails.licensePlate ||
            !carDetails.ownerName || !carDetails.ownerContact || !carDetails.ownerAddress) {
            alert("Please fill in all fields.");
            return;
        }

        console.log('Car Details Submitted:', carDetails);
        
        // Reset form after submission (optional)
        setCarDetails({
            make: '',
            model: '',
            year: '',
            licensePlate: '',
            ownerName: '',
            ownerContact: '',
            ownerAddress: ''
        });
    };

    return (
        <div>
            <Navbar />
            <Sidebar />

            <div className="steps mt-24 z-10 ">
                <ul className="steps w-[90vw] ml-[5.5rem] overflow-x-auto">
                    <li className="step step-primary flex-shrink-0">Add Car</li>
                    <li className="step step-primary flex-shrink-0">Add Details</li>
                    <li className="step flex-shrink-0">Submit</li>
                </ul>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '82vw', margin: 'auto' }} className='mt-20 pt-20'>
                <h2 className='text-xl font-semibold pb-3 border-b-2 pt-2'>Add Car Details</h2>
                <div className='mt-5'>
                    {/* Car Details */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Company:
                            <input 
                                type="text" 
                                name="make" 
                                value={carDetails.make} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Model:
                            <input 
                                type="text" 
                                name="model" 
                                value={carDetails.model} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Year:
                            <input 
                                type="number" 
                                name="year" 
                                value={carDetails.year} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            License Plate:
                            <input 
                                type="text" 
                                name="licensePlate" 
                                value={carDetails.licensePlate} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>

                    {/* Owner Details */}
                    <h2 className='text-xl font-semibold pb-3 border-b-2 pt-2'>Add OWner Details</h2>
                    <div style={{ marginBottom: '15px' }} className=' mt-5'>
                        <label>
                            Owner Name:
                            <input 
                                type="text" 
                                name="ownerName" 
                                value={carDetails.ownerName} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            Owner Contact:
                            <input 
                                type="text" 
                                name="ownerContact" 
                                value={carDetails.ownerContact} 
                                onChange={handleChange} 
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
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
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            />
                        </label>
                    </div>

                    {/* Buttons */}
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

export default CarForm;
