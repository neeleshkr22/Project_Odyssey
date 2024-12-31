import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function PartyDetails() {
  const [partyList, setPartyList] = useState([]); // State to store fetched party details
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

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

  // Filtering parties based on search query
  const filteredParty = partyList.filter(party =>
    party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    party._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="flex justify-between ml-[5.5rem] mr-20 items-baseline mt-24">
        <h1 className="font-semibold text-xl border-b-2 w-[58vw] pb-2">
          Party Details
        </h1>

        <div>
          <input
            type="text"
            placeholder="Search by Party ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 p-2 pl-5 w-80 rounded-full border-gray-300"
          />
        </div>
        
        <div>
          <NavLink to="/addparty" className="btn btn-primary text-[15px] pl-7 pr-7">
            <i className="bi bi-plus-lg"></i> Party
          </NavLink>
        </div>
      </div>

      {filteredParty.length === 0 ? (
        <h1>No parties found matching the search query.</h1>
      ) : (
        <div className="cards flex flex-wrap gap-6 mt-10 ml-[5.5rem]">
          {filteredParty.map((party, index) => (
            <div
              key={index}
              className="w-[30%] h-48 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold">{party.name}</h3>
              <h3 className="">{party._id}</h3>
              <p className="text-grey-600">Address: {party.address}</p>
              <p className="text-grey-600">Contact: {party.contactNumber}</p>
              <NavLink to={`/party/${party._id}`}>
                <button className="mt-2 btn btn-primary">View Details</button>
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PartyDetails;
