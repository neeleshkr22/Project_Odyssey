import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function PartyDetails() {
  const [partyList, setPartyList] = useState([]); // State to store fetched party details

  useEffect(() => {
    
    const fetchParties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/parties'); 
        if (response.status === 200) {
          setPartyList(response.data); 
        } else {
          console.log('Error fetching party details');
        }
      } catch (error) {
        console.error('Error in fetching party details:', error);
      }
    };
    fetchParties();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24">
        <h1 className="font-semibold text-xl border-b-2 w-[80vw] pb-2">
          Party Details
        </h1>
        <div>
          <NavLink to="/addparty" className="btn btn-primary text-[15px] pl-7 pr-7">
            <i className="bi bi-plus-lg"></i> Party
          </NavLink>
        </div>
      </div>

      <div className="cards flex flex-wrap gap-6 mt-10 ml-[5.5rem]">
        {partyList.length > 0 ? (
          partyList.map((party, index) => (
            <div
              key={index}
              className=" w-[30%] h-48 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold">{party.name}</h3>
              <p className="text-grey-600">Address: {party.address}</p>
              <p className="text-grey-600">Contact: {party.contactNumber}</p>
              <NavLink to={`/party/${party._id}`}>
              <button className="mt-2 btn btn-primary">View Details</button>
              </NavLink>
            </div>
          ))
        ) : (
          <p>No details available</p>
        )}
      </div>
    </div>
  );
}

export default PartyDetails;
