import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaUserCircle, FaFileAlt, FaTasks, FaBullseye, FaUser, FaCog, FaSignOutAlt, FaVideo } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import NewClipMenu from '../ToolPages/ClipsPage/NewClipMenu';
import DailyStandUp from './DailyStandUp';
import { LuNotebookPen } from 'react-icons/lu';
import NotePad from './NotePad';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewClipMenuOpen, setIsNewClipMenuOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showClip, setShowClip] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showNotePad, setShowNotePad] = useState(false);

  const toggleNotePad = () => {
    setShowNotePad(!showNotePad);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNewClipMenu = () => {
    setIsNewClipMenuOpen(!isNewClipMenuOpen);
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
      <div className='bg-gradient-to-r from-background via-blue-500 to-purple-500 h-12 flex flex-row items-center justify-between p-2 text-white'>
        <h1 className='text-xl text-white font-bold cursor-default'>TaskPulse</h1>
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
            <IoIosAddCircle />
            <p>New</p>
          </button>
          {isAddMenuOpen && (
            <div className="fixed inset-0  z-50 " onClick={toggleAddMenu}>
              <div className='absolute right-[45%] top-12 w-40 z-50 bg-white text-black p-2 rounded-md shadow-lg' onClick={(e) => e.stopPropagation()}>
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
            </div>
          )}
        </div>


        <div className='p-1 rounded-md   text-textPrimary hover:text-white font-semibold'>
          <button onClick={toggleForm}>Daily Standup</button>
        </div>
        <div className='flex items-center gap-2 justify-center'>
          <div className='p-2 rounded-md  relative text-textPrimary hover:text-white hover:bg-surface cursor-pointer font-semibold'
            onMouseEnter={() => setShowClip(true)}
            onMouseLeave={() => setShowClip(false)}
          >
            <FaVideo onClick={toggleNewClipMenu} />
            {showClip && (
              <div className="absolute z-50 top-[42px] right-[-27px] text-nowrap w-fit p-2 bg-white  border text-surface border-gray-200 rounded-md shadow-lg text-center text-xs flex items-center">
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-200 absolute top-[-10px] right-[40%]"></div>
                Record a Clip
              </div>
            )}
          </div>

          <div className='p-2 rounded-md  relative text-textPrimary hover:text-white hover:bg-surface cursor-pointer font-semibold'
            onMouseEnter={() => setShowNote(true)}
            onMouseLeave={() => setShowNote(false)}
          >
            <LuNotebookPen onClick={toggleNotePad} />
            {showNote && (
              <div className="absolute z-50 top-[42px] right-[-27px] text-nowrap w-fit p-2 bg-white  border text-surface border-gray-200 rounded-md shadow-lg text-center text-xs flex items-center">
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-200 absolute top-[-10px] right-[40%]"></div>
                Write a note
              </div>
            )}
          </div>
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
            <div className="fixed inset-0 z-50 " onClick={toggleMenu}>
              <div className='absolute right-[1px] top-12 w-40 z-50 bg-white text-black p-2 rounded-md shadow-lg' onClick={(e) => e.stopPropagation()}>
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
                    <a href="/login">Logout</a>
                  </li>
                </ul>
              </div>
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

      {/* New Clip Menu */}
      {isNewClipMenuOpen && (
        <NewClipMenu toggleMenu={toggleNewClipMenu} />
      )}

      {/* NotePad */}
      {showNotePad && (
        <NotePad toggleNotePad={toggleNotePad} />
      )}


      {/* <div className='fixed left-[89px] top-[44px] bg-background w-[6px] h-[6px] rounded'>
      </div>

      <div className='fixed right-0 top-[44px] bg-background w-[3px] h-[5px] rounded-l-lg'>
      </div> */}
    </>
  );
};

export default NavBar;
