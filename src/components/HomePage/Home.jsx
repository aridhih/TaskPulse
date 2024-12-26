import React, { useState } from 'react'
import { CiHome, CiSettings } from 'react-icons/ci';

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isToggled, setIsToggled] = useState(true);  // Toggle state

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
   
      <div className='h-[calc(100vh-55px)]  w-full border-2 border-[#a2a7b0]  shadow-lg m-[1px] mx-[2px] rounded'>
        <div className="h-[54px] w-full  justify-between rounded flex items-center">
          <div className="flex items-cente ml-2">
            <CiHome className="h-4 w-6" />
            <p>Home</p>
          </div>

          <div className="flex items-center relative">
            <button className="border-blue-700 rounded h-8 p-1 mr-2 bg-blue-700 text-white">
              Manage cards
            </button>

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
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                    peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


        <div
          className="h-[calc(100vh-113px)] w-full p-4 border-t border-[#56595e] bg-[#f5f5f5] overflow-y-scroll"
        >


          < p className='text-2xl font-semibold'>Good Morning, Hamad</p>
          < p className='text-2xl font-semibold'>Good Morning, Hamad</p>
          < p className='text-2xl font-semibold'>Good Morning, Hamad</p>
          < p className='text-2xl font-semibold'>Good Morning, Hamad</p>
          < p className='text-2xl font-semibold'>Good Morning, Hamad</p>
        </div>

      </div>
   
  )
}

export default Home