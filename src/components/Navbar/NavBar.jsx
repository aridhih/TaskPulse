import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileAlt, FaTasks, FaUser, FaCog, FaSignOutAlt, FaVideo, FaUserCircle } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import NewClipMenu from '../ToolPages/ClipsPage/NewClipMenu';
import DailyStandUp from './DailyStandUp';
import { LuNotebookPen } from 'react-icons/lu';
import NotePad from './NotePad';
import { signOut } from "firebase/auth";
import { useUser } from '../Layout/UserContext';
import Profile from './Profile';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase';

const NavBar = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [isprofileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewClipMenuOpen, setIsNewClipMenuOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showClip, setShowClip] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showNotePad, setShowNotePad] = useState(false);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


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

  const toggleProfile = () => {
    setIsProfileOpen(!isprofileOpen);
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
          <div
            className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer"
            onClick={toggleMenu}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-violet-600 blur-sm opacity-100 animate-customPulse"></div>
            <div className="relative z-10 text-white font-semibold">
              {user ? user.name.slice(0, 2).toUpperCase() : (<FaUserCircle className='h-10 w-10' />)}
            </div>
          </div>




          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 " onClick={toggleMenu}>
              <div className='absolute right-[1px] top-12 w-40 z-50 bg-white text-black p-2 rounded-md shadow-lg' onClick={(e) => e.stopPropagation()}>
                <ul className='flex flex-col'>
                  <li onClick={toggleProfile} className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                    <FaUser />
                    {user.name.slice(0, 1).toUpperCase() + user.name.slice(1)}
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                    <FaCog />
                    Settings
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2' onClick={handleLogout}>
                    <FaSignOutAlt />
                    <p>Logout</p>
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
      {/* profile with Blur Effect */}
      {isprofileOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <Profile toggleProfile={toggleProfile} toggleMenu={toggleMenu} />

        </div>
      )}

      {/* New Clip Menu */}
      {isNewClipMenuOpen && (
        <NewClipMenu toggleMenu={toggleNewClipMenu} />
      )}

      {/* NotePad */}
      {showNotePad && (
        <NotePad toggleNotePad={toggleNotePad}  user={user}/>
      )}
    </>
  );
};

export default NavBar;
