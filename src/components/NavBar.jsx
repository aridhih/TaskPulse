import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaUserCircle, FaFileAlt, FaTasks, FaBullseye, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoIosAddCircle, IoMdAdd } from 'react-icons/io';
import DailyStandUp from './DailyStandUp';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAddMenu = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
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
      <div className='bg-background h-12 flex flex-row items-center justify-between p-2 text-white'>
        <h1 className='text-xl text-accent font-bold cursor-default'><a href="/login">TaskPulse</a></h1>
        <div className="w-[300px] h-8 flex bg-white rounded-lg flex-row justify-center">
          <input
            type="text"
            className="w-full p-3  rounded-lg text-black focus:outline-none placeholder-gray-500"
            placeholder="Search"
          />
          <button className='cursor-default border-l rounded-r-lg hover:bg-slate-50'>
            <CiSearch className='text-black mx-2' />
          </button>
        </div>

        <div className='relative'>
          <button className='text-textPrimary hover:text-white rounded-full p-1 font-semibold gap-1 flex items-center justify-center' onClick={toggleAddMenu}>
           <IoIosAddCircle  />
            <p>New</p>
          </button>
          {isAddMenuOpen && (
            <div className='absolute right-0 mt-2 w-40 z-50 bg-white text-black p-2 rounded-md shadow-lg'>
              <ul className='flex flex-col'>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                  <FaFileAlt />
                  Add Doc
                </li>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                  <FaTasks />
                  Add Task
                </li>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                  <FaBullseye />
                  Add Goal
                </li>
              </ul>
            </div>
          )}
        </div>


        <div className='p-1 rounded-md   text-textPrimary hover:text-white font-semibold'>
          <button onClick={toggleForm}>Daily Standup</button>
        </div>

        <div className='relative'>
          {/* Profile Icon */}
          <div
            className='p-[3px] h-8 w-8 rounded-full border-white flex text-wrap border text-white bg-gray-600 cursor-pointer'
            onClick={toggleMenu}
          >
            <FaUserCircle size={24} />
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className='absolute right-0 mt-2 mr-[-7px] w-40 z-50 bg-white text-black p-2 rounded-md shadow-lg'>
              <ul className='flex flex-col'>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                  <FaUser />
                  View Profile
                </li>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                  <FaCog />
                  Settings
                </li>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                  <FaSignOutAlt />
                  Logout
                </li>
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

      <div className='fixed left-[89px] top-[44px] bg-background w-[6px] h-[6px] rounded'>
      </div>

      <div className='fixed right-0 top-[44px] bg-background w-[3px] h-[5px] rounded-l-lg'>
      </div>
    </>
  );
};

export default NavBar;
