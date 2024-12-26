import React, { useState } from "react";
import { CiHome, CiSettings } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isToggled, setIsToggled] = useState(true); // Toggle state
  const [isSliderOpen, setIsSliderOpen] = useState(false); // Slider state

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <div className="h-[calc(100vh-52px)] w-full border-2 border-[#d1d6e0] shadow-lg m-[1px] mx-[2px] rounded">
      <div className="h-[54px] w-full border-b border-gray-200 justify-between rounded flex items-center">
        <div className="flex items-center gap-1 ml-2 ">
          <CiHome className="h-4 w-4"/>
          <p className="text-sm">Home</p>
        </div>

        <div className="flex items-center relative">
          {/* Manage Cards Button */}
          <button
            className="border-blue-700 rounded h-8 p-1 mr-2 bg-blue-700 text-white"
            onClick={toggleSlider}
          >
            Manage cards
          </button>

          {/* Settings Icon */}
          <div
            className="border-gray-200 border-l-2 pl-2 pr-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <CiSettings className="h-4 w-6" />
          </div>

          {showDropdown && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4">
                <p className="text-sm text-gray-600">Layout</p>
                <div className="flex justify-between items-center mt-2">
                  <span>Page greeting</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isToggled}
                      onChange={handleToggle}
                    />
                    <div
                      className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                    peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                    ></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-113px)] w-full p-4  bg-[#fafafa] overflow-y-scroll">
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
        <p className="text-2xl font-semibold">Good Evening, Hamad</p>
      
        
      </div>

      {/* Slider Panel */}
      <div
        className={`fixed top-[52px] right-1 h-[calc(100vh-58px)]  w-64 bg-white shadow-md rounded-r-lg border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isSliderOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b h-[53px] border-gray-200">
          <h2 className="text-lg font-semibold">Manage Cards</h2>
          <button
            onClick={toggleSlider}
            className="text-gray-600 hover:text-gray-800"
          >
            <RxCross2 className="h-7 w-7 p-1 hover:bg-gray-100 rounded" />

          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-600">Here are some options for managing cards:</p>
          <ul className="mt-2 space-y-2">
            <li className="p-2 bg-gray-100 rounded-lg">Card 1</li>
            <li className="p-2 bg-gray-100 rounded-lg">Card 2</li>
            <li className="p-2 bg-gray-100 rounded-lg">Card 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
