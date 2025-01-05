import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import DailyStandUp from './DailyStandUp';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      {/* NavBar */}
      <div className='bg-gray-800 h-12 flex flex-row justify-between p-2 text-white'>
        <h1 className='text-xl font-bold'>TaskPulse</h1>
        <div className="w-[300px] flex bg-white rounded-lg flex-row justify-center">
          <input
            type="text"
            className="w-full p-3  rounded-lg text-black focus:outline-none placeholder-gray-500"
            placeholder="Search"
          />
          <button className='cursor-default border-l rounded-r-lg hover:bg-slate-50'>
            <CiSearch className='text-black mx-2' />
          </button>
        </div>

        <div>+ New</div>

        <div className='p-1 rounded-md text-black hover:bg-slate-50 bg-white font-semibold'>
          <button onClick={toggleForm}>Daily Stand Up</button>
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

      {/* Modal Form with Blur Effect */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white h-[80%]  p-2 rounded-md shadow-lg w-[90%] max-w-md flex items-center justify-center">
           
             <DailyStandUp closeForm={closeForm} />
          </div>
        </div>
      )}

      <div className='fixed left-[90px] top-[45px] bg-gray-800 w-1 h-1 rounded'>
      </div>
    </>
  );
};

export default NavBar;
