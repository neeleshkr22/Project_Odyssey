import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import car from '../../assets/car.png'

const VehiclePage = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/vehicles/${id}`);
                console.log('Vehicle:', response.data);
                setVehicle(response.data); // Save the single object
            } catch (err) {
                console.error('Error fetching data:', err.message);
            }
        };
        fetchData();
    }, [id]);
    



  return (
    <div>
      <Navbar></Navbar>
        <Sidebar></Sidebar>

        <div>
    <h1>Vehicle Details</h1>
    {vehicle ? (
    <div>
        <div className=' flex justify-center gap-5 mt-20'>

            <div className="bg-gray-50 shadow-md rounded-2xl w-3/6 p-5 text-base">
                {[
                    { label: "Vehicle Type :", value: vehicle.VehicleType },
                    { label: "Vehicle Number :", value: vehicle.licenceNumber },
                    { label: "Company Name :", value: vehicle.comapnyName },
                    { label: "Color :", value: vehicle.color },
                    { label: "Fuel Type :", value: vehicle.fuelType },
                    { label: "Transmission :", value: vehicle.transmission },
                    { label: "Status", value: vehicle.status },
                    { label: "Last Serviced :", value: new Date(vehicle.lastServiced).toLocaleDateString() },
                    { label: "Registration Date :", value: new Date(vehicle.registrationDate).toLocaleDateString() },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between border-b border-gray-200 py-2"
                    >
                        <h3 className="font-medium text-gray-600">{item.label}</h3>
                        <p className="text-gray-800">{item.value}</p>
                    </div>
                ))}
            </div>

                <div className=" bg-gray-50 shadow-md rounded-2xl w-2/6 ">
                    <img src={car} alt=""  className=' relative top-20'/>
                </div>

        </div>

        <div className="2 flex justify-center gap-5 mt-6">

            <div className="bg-gray-50 shadow-md rounded-2xl w-2/6 p-8 text-base mt-5">
                <h2 className=' text-xl  font-semibold border-b-2 pb-2'>Owner Details</h2>
                <div className=' mt-3'>
                {[
                    { label: "Owner Name :", value: vehicle.ownerName },
                    { label: "Contact Number :", value: vehicle.ownerConntact },
                    { label: "Owner address :", value: vehicle.ownerAddress },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between border-b border-gray-200 py-2"
                    >
                        <h3 className="font-medium text-gray-600">{item.label}</h3>
                        <p className="text-gray-800">{item.value}</p>
                    </div>
                ))}
                </div>

                
            </div>

            <div className="bg-gray-50 shadow-md rounded-2xl w-2/6 p-8 text-base mt-5">
                <h2 className=' text-xl  font-semibold border-b-2 pb-2'>Insurance Details</h2>
                <div className=' mt-3'>
                {[
                    { label: "Insurance Provider :", value: vehicle.insuranceDetails.provider },
                    { label: "Policy Number :", value: vehicle.insuranceDetails.policyNumber },
                    { label: "Expiry Date :", value: new Date(vehicle.insuranceDetails.expiryDate).toLocaleDateString() },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between border-b border-gray-200 py-2"
                    >
                        <h3 className="font-medium text-gray-600">{item.label}</h3>
                        <p className="text-gray-800">{item.value}</p>
                    </div>
                ))}
                </div>

                
            </div>

            <div className=" bg-primary shadow-md rounded-2xl w-[15%] p-5 text-base mt-5">
                <div className='flex text-xl  font-semibold border-b border-black pb-2 justify-between pr-2'>
                <h2 className=' '> Fuel</h2>
                <h2 className=' '> +</h2>
                </div>
            </div>

        </div>
    </div>
    
    ) : (
        <p>Loading vehicle details...</p>
    )}
</div>

    </div>
  )
}

export default VehiclePage
