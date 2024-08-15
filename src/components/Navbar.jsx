import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick, onLogout }) => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsAvatarOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full h-20 flex justify-between items-center border-b-2 border-gray-200 px-4 shadow-md">
      <button onClick={onMenuClick} className="md:hidden text-gray-500">
        {/* Hamburger Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className="hidden sm:flex"></div>
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-500">
          {/* Logo */}
          Prediction
        </h1>
      </div>

      {/* Avatar and Dropdown */}
      <div className="relative">
        <button onClick={handleAvatarClick} className="text-gray-500">
          {/* Avatar Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </button>
        {isAvatarOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-full text-center px-1 py-2 hover:bg-gray-100">
              Home
            </button>
            <button
              onClick={onLogout}
              className="w-full text-center px-1 py-2 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
