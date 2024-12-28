
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isEntriesOpen, setIsEntriesOpen] = useState(false);
  const [isListingsOpen, setIsListingsOpen] = useState(false);

  const toggleMasterMenu = () => setIsMasterOpen(!isMasterOpen);
  const toggleReportsMenu = () => setIsReportsOpen(!isReportsOpen);
  const toggleEntriesMenu = () => setIsEntriesOpen(!isEntriesOpen);
  const toggleListingsMenu = () => setIsListingsOpen(!isListingsOpen);

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Main content goes here */}
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

          <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4 flex flex-col items-center space-y-5">
            {/* Sidebar content here */}
            <NavLink to="/" className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base mt-20'>
              <i className="bi bi-house mr-5"></i>Home
            </NavLink>

            {/* Master Menu Item */}
            <li className='flex flex-col'>
              <button
                onClick={toggleMasterMenu}
                className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'
              >
                <i className="bi bi-house mr-5"></i>Master
              </button>
              {isMasterOpen && (
                <ul className='flex flex-col space-y-2 pl-10 mt-2'>
                  <NavLink to="/vehicle-master" className='hover:bg-base-300 p-2 rounded-lg'>Vehicle Details</NavLink>
                  <NavLink to="/driver-master" className='hover:bg-base-300 p-2 rounded-lg'>Driver Details</NavLink>
                  <NavLink to="/party-master" className='hover:bg-base-300 p-2 rounded-lg'>Party Details</NavLink>
                  <NavLink to="/owner-master" className='hover:bg-base-300 p-2 rounded-lg'>Owner Details</NavLink>
                  <NavLink to="/trip-master" className='hover:bg-base-300 p-2 rounded-lg'>Trip Details</NavLink>
                </ul>
              )}
            </li>

            {/* Reports Menu Item */}
            <li className='flex flex-col'>
              <button
                onClick={toggleReportsMenu}
                className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'
              >
                <i className="bi bi-file-earmark-text mr-5"></i>Reports
              </button>
              {isReportsOpen && (
                <ul className='flex flex-col space-y-2 pl-10 mt-2'>
                  <NavLink to="/duty-slip-printing" className='hover:bg-base-300 p-2 rounded-lg'>Duty Slip Printing</NavLink>
                  <NavLink to="/invoice-printing" className='hover:bg-base-300 p-2 rounded-lg'>Invoice Printing</NavLink>
                  <NavLink to="/fuel-filling-report" className='hover:bg-base-300 p-2 rounded-lg'>Fuel Filling Report</NavLink>
                  <NavLink to="/servicing-report" className='hover:bg-base-300 p-2 rounded-lg'>Servicing Report</NavLink>
                  <NavLink to="/daily-duty-chart" className='hover:bg-base-300 p-2 rounded-lg'>Daily Duty Chart</NavLink>
                  <NavLink to="/hire-car" className='hover:bg-base-300 p-2 rounded-lg'>Hire Car</NavLink>
                  <NavLink to="/business-report" className='hover:bg-base-300 p-2 rounded-lg'>Business Report</NavLink>
                  <NavLink to="/pending-bill-report" className='hover:bg-base-300 p-2 rounded-lg'>Pending Bill Report</NavLink>
                  <NavLink to="/hired-vehicle-report" className='hover:bg-base-300 p-2 rounded-lg'>Hired Vehicle Report</NavLink>
                </ul>
              )}
            </li>

            {/* Entries Menu Item */}
            <li className='flex flex-col'>
              <button
                onClick={toggleEntriesMenu}
                className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'
              >
                <i className="bi bi-file-earmark-plus mr-5"></i>Entries
              </button>
              {isEntriesOpen && (
                <ul className='flex flex-col space-y-2 pl-10 mt-2'>
                  {/* Add your entries sub-items here */}
                  <NavLink to="/entry-type1" className='hover:bg-base-300 p-2 rounded-lg'>Entry Type 1</NavLink>
                  <NavLink to="/entry-type2" className='hover:bg-base-300 p-2 rounded-lg'>Entry Type 2</NavLink>
                  {/* Add more entries as needed */}
                </ul>
              )}
            </li>

            {/* Listings Menu Item */}
            <li className='flex flex-col'>
              <button
                onClick={toggleListingsMenu}
                className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-xl text-base'
              >
                <i className="bi bi-list-ul mr5"></i>Listings
              </button>
              {isListingsOpen && (
                <ul className='flex flex-col space-y= 2 pl=10 mt= 2'>
                  {/* Add your listings sub-items here */}
                  <NavLink to="/listing-type1" className='hover:bg-base=300 p= 2 rounded-lg'>Listing Type 1</NavLink>
                  <NavLink to="/listing-type2" className='hover:bg-base=300 p= 2 rounded-lg'>Listing Type 2</NavLink>
                  {/* Add more listings as needed */}
                </ul>
              )}
            </li>

            {/* Logout Button */}
            <div className='absolute bottom=5'>
              <p className='cursor-pointer flex hover:bg-base=300 pl=10 pr=10 pt= 2 pb= 2 rounded-xl text-base'>
                <i className="bi bi-box-arrow-left mr=5"></i>Logout
              </p>
            </div>
          </ul>
        </div>
      </div>

      {/* Second Drawer (if needed) */}
           <div className="drawer drawer-end">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Main content goes here */}
              </div>
              <div className="drawer-side ">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-48 p-4 mr-2">
                  {/* Sidebar content here */}
                  <div className='mt-20'></div>
                  <div className='flex flex-col z-50'>
                    {["login", "register", "Settings"].map((route) => (
                      <NavLink
                        key={route}
                        to={`/${route}`}
                        className={({ isActive }) =>
                          `btn btn-ghost transition duration-200 ${
                            isActive ? "text-primary" : ""
                          }`
                        }
                      >
                        {route.charAt(0).toUpperCase() + route.slice(1)}
                      </NavLink>
                    ))}
                  </div>
                </ul>
              </div>
            </div>
      

    </div>
  );
}

export default Sidebar;
