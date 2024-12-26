import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-gray-800 h-12 flex flex-row justify-between p-2 text-white'>

      <h1 className='text-xl font-bold'>TaskPulse</h1>
      <div className="w-[300px] flex bg-white rounded-lg flex-row justify-center">
        <input
          type="text"
          className="w-full p-3 border rounded-lg text-black focus:outline-none placeholder-gray-500"
          placeholder="Search"
        />
        <button className='cursor-default mr-2'>
          <CiSearch className='text-black' />
        </button>
      </div>

      <div>+ New</div>

      <div className='p-1 rounded-md text-black bg-white font-semibold'>
        <button>Daily Stand Up</button>
      </div>

      <div className='relative'>
        {/* Profile Icon */}
        <div
          className='p-1 h-8 w-8 rounded-full border-white text-wrap border text-white bg-gray-600 cursor-pointer'
          onClick={toggleMenu}
        >
          HA
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className='absolute right-0 mt-2 w-40 bg-white text-black p-2 rounded-md shadow-lg'>
            <ul className='flex flex-col'>
              <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md'>View Profile</li>
              <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md'>Settings</li>
              <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md'>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
