import React from 'react'
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

          <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4  flex flex-col items-center space-y-5">
            {/* Sidebar content here */}
            <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base mt-20'><i className="bi bi-house mr-5"></i>Home</p>
            <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i className="bi bi-house mr-5"></i>Home</p>
            <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i className="bi bi-house mr-5"></i>Home</p>
            <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i className="bi bi-house mr-5"></i>Home</p>
            <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i className="bi bi-house mr-5"></i>Home</p>
              <div className=' absolute bottom-5'>
              <p className='cursor-pointer flex hover:bg-base-300 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-base'><i class="bi bi-box-arrow-left mr-5"></i>Logout</p>
              </div>
          </ul>
        </div>
        </div>

        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
    
        </div>
          <div className="drawer-side ">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-48 p-4 mr-2">
              {/* Sidebar content here */}
              <div className='mt-20'></div>
              <div className=' flex flex-col z-50'>
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
  )
}

export default Sidebar
