import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-base-100 shadow-md z-10">
      <div className="navbar container mx-auto">
        {/* Left Icon Button */}
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" aria-label="Open menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Center Brand Name */}
        <div className="flex-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `btn btn-ghost text-xl transition duration-200 ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            Cars
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="flex-none space-x-4">
          {["login", "register", "theme"].map((route) => (
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

        {/* Right Icon Button */}
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" aria-label="More options">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
