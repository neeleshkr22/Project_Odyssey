// import React from 'react'
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div>
//       <div className="drawer">
//         <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//         </div>

//         <div className="drawer-side">
//           <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

//           <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4  flex flex-col items-center space-y-5">
//             {/* Sidebar content here */}
//             <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base mt-20'><i className="bi bi-house mr-5"></i>Home</p>
//             <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i className="bi bi-house mr-5"></i>Master</p>
//             <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i className="bi bi-house mr-5"></i>Reports</p>
//             <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i className="bi bi-house mr-5"></i>Listing</p>
//             <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i className="bi bi-house mr-5"></i>Maintenance</p>
//               <div className=' absolute bottom-5'>
//               <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i class="bi bi-box-arrow-left mr-5"></i>Logout</p>
//               </div>
//           </ul>
//         </div>
//         </div>

//         <div className="drawer drawer-end">
//             <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//                 <div className="drawer-content">
    
//         </div>
//           <div className="drawer-side ">
//             <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//             <ul className="menu bg-base-200 text-base-content min-h-full w-48 p-4 mr-2">
//               {/* Sidebar content here */}
//               <div className='mt-20'></div>
//               <div className=' flex flex-col z-50'>
//                 {["login", "register", "Settings"].map((route) => (
//                   <NavLink
//                   key={route}
//                   to={`/${route}`}
//                   className={({ isActive }) =>
//                     `btn btn-ghost transition duration-200 ${
//                         isActive ? "text-primary" : ""
//                     }`
//                 }
//                 >
//               {route.charAt(0).toUpperCase() + route.slice(1)}
//             </NavLink>
//           ))}
//           </div>
//             </ul>
//           </div>
//         </div>


//     </div>
//   )
// }

// export default Sidebar

import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isMasterOpen, setIsMasterOpen] = useState(false); // State to manage Master submenu visibility

  const toggleMasterMenu = () => {
    setIsMasterOpen(!isMasterOpen);
  };

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
                  <NavLink to="/model-master" className='hover:bg-base-300 p-2 rounded-lg'>Model Master</NavLink>
                  <NavLink to="/trip-master" className='hover:bg-base-300 p-2 rounded-lg'>Trip Master</NavLink>
                  <NavLink to="/vehicle-master" className='hover:bg-base-300 p-2 rounded-lg'>Vehicle Master</NavLink>
                  <NavLink to="/party-master" className='hover:bg-base-300 p-2 rounded-lg'>Party Master</NavLink>
                  <NavLink to="/owner-master" className='hover:bg-base-300 p-2 rounded-lg'>Owner Master</NavLink>
                </ul>
              )}
            </li>

            <NavLink to="/reports" className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'>
              <i className="bi bi-house mr-5"></i>Reports
            </NavLink>

            <NavLink to="/listing" className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'>
              <i className="bi bi-house mr-5"></i>Listing
            </NavLink>

            <NavLink to="/maintenance" className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'>
              <i className="bi bi-house mr-5"></i>Enteries
            </NavLink>

            <div className='absolute bottom-5'>
              <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'>
                <i className="bi bi-box-arrow-left mr-5"></i>Logout
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
