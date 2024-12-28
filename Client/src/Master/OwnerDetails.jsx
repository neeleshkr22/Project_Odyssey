import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const OwnerDetails = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Sidebar></Sidebar>

        <div className='ml-[5.5rem] mr-20  items-baseline mt-24'>
        <h2 className='text-xl font-semibold pb-3 border-b-2 pt-2'>Owner Details</h2>
        </div>

        <div className="cards flex flex-wrap gap-6 mt-10 ml-[5.5rem] ">
            {/* Example of vehicle cards */}
            {[...Array(5)].map((_, index) => (
            <div key={index} className="artboard artboard-demo w-[30%] h-48 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold">Owner name {index + 1}</h3>
                <p className="text-gray-600">Owner Adress {index + 1}.</p>
                <p className="text-gray-600">Owner Contact {index + 1}.</p>
                <button className="mt-2 btn btn-primary">View Details</button>
            </div>
            ))}
        </div>
      
    </div>
  )
}

export default OwnerDetails
