import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { NavLink } from 'react-router-dom'

function DriverDetails() {
  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>

        <div className='flex justify-between ml-[5.5rem] mr-20  items-baseline mt-24 '>
            <h1 className=' font-semibold text-xl border-b-2 w-[80vw] pb-2 '>
            Vehicle Details
            </h1>
            <div>
            <NavLink to="/addDriver" className="btn btn-primary text-[15px] pl-7 pr-7">
              <i class="bi bi-plus-lg"></i> Driver
            </NavLink>
            </div>
        </div>

        <div className="cards flex flex-wrap gap-6 mt-10 ml-[5.5rem] ">
    {/* Example of vehicle cards */}
    {[...Array(5)].map((_, index) => (
        <div key={index} className="artboard artboard-demo w-80 h-48 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
            <h3 className="text-lg font-semibold">Driver {index + 1}</h3>
            <p className="text-gray-600">Details about driver {index + 1}.</p>
            <button className="mt-2 btn btn-primary">View Details</button>
        </div>
    ))}
</div>



    </div>
  )
}

export default DriverDetails
