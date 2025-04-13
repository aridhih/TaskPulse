import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaUserCircle, FaFileAlt, FaTasks, FaBullseye, FaUser, FaCog, FaSignOutAlt, FaVideo } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import NewClipMenu from '../ToolPages/ClipsPage/NewClipMenu';
import DailyStandUp from './DailyStandUp';
import { LuNotebookPen } from 'react-icons/lu';
import NotePad from './NotePad';
import { signOut } from "firebase/auth";
import { useUser } from '../Layout/UserContext';
import { BsListTask } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import Profile from './Profile';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase';
import { PiBellLight } from "react-icons/pi";

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
  const [isPersonalListOpen, setIsPersonalListOpen] = useState(false);
  const [isNewPopupOpen, setIsNewPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('task'); // default to 'task' or null


  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleNewPopup = () => {
    setIsNewPopupOpen(!isNewPopupOpen);
  };

  const toggleNotePad = () => {
    setShowNotePad(!showNotePad);
  };

  const togglePersonalList = () => {
    setIsPersonalListOpen(!isPersonalListOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNewClipMenu = () => {
    setIsNewClipMenuOpen(!isNewClipMenuOpen);
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

        <div className="relative">
  <button
    className="text-textPrimary hover:text-white rounded-full p-1 font-semibold gap-1 flex items-center justify-center"
    onClick={toggleNewPopup}
  >
    <IoIosAddCircle />
    <p>New</p>
  </button>

  {isNewPopupOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative">
        <button
          onClick={toggleNewPopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
        >
          ×
        </button>

        {/* Tabs */}
        <div className="flex items-center border-b mb-4">
          {['Task', 'Doc', 'Chat', 'Whiteboard'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none border-b-2 ${
                activeTab === tab.toLowerCase()
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent'
              }`}
              onClick={() => {
                setActiveTab(
                  (prev) => (prev === tab.toLowerCase() ? null : tab.toLowerCase())
                );
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'task' && (
  <div className="p-4 bg-gray-50 rounded-md shadow-inner mb-4">
    <div className="mt-4 relative">
      <button
        className="flex items-center bg-gray-100 px-3 py-2 rounded text-gray-700 hover:bg-gray-200 w-full"
        onClick={togglePersonalList}
      >
        <span className="font-medium">📂 Personal List</span>
        <span className="ml-2">▼</span>
      </button>
      {isPersonalListOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50">
          <h3 className="font-medium text-black border-b pb-2">Your Personal Lists</h3>
          <ul className="mt-2">
            <li className="px-3 py-2 flex justify-between text-black items-center bg-gray-100 rounded">
              📂 Personal List <span>✔</span>
            </li>
            <p className="text-gray-500 px-3 pt-2 text-sm">Recents</p>
            <li className="px-3 py-2 flex items-center text-black cursor-pointer hover:bg-gray-100">
              <BsListTask className="mr-2" />
              Project 2
            </li>
            <p className="text-gray-500 px-3 pt-2 text-sm">Spaces</p>
            <li className="px-3 py-2 flex items-center text-black cursor-pointer hover:bg-gray-100">
              <FaUsers className="mr-2" />
              Team Space
            </li>
          </ul>
        </div>
      )}
    </div>

    {/* Task Name */}
    <input
      type="text"
      placeholder="Task Name"
      className="w-full text-xl font-semibold border-none outline-none mb-2 placeholder-gray-500"
    />

    {/* Description */}
    <textarea
      placeholder="Add description"
      className="w-full border border-gray-200 rounded-md p-2 mb-4 text-sm resize-none"
      rows={3}
    ></textarea>

    {/* Options */}
    <div className="flex flex-wrap gap-2 mb-4">
      {['TO DO', 'Assignee', 'Due date', 'Priority', 'Tags'].map((label) => (
        <button
          key={label}
          className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-100"
        >
          {label}
        </button>
      ))}
    </div>

    {/* Bottom Actions */}
    <div className="flex justify-between items-center border-t pt-4">
      <button className="text-sm text-gray-500">📄 Templates</button>
      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-sm">
          <PiBellLight />
        </span>
        <button
          onClick={toggleNewPopup}
          className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 text-sm"
        >
          Create Task
        </button>
      </div>
    </div>
  </div>
)}

        {activeTab === 'doc' && (
          <div className="p-4 bg-gray-50 text-black rounded-md shadow-inner mb-4">
            <p>This is the Doc tab content.</p>
          </div>
        )}
        {activeTab === 'chat' && (
          <div className="p-4 bg-gray-50 text-black rounded-md shadow-inner mb-4">
            <p>This is the Chat tab content.</p>
          </div>
        )}
        {activeTab === 'whiteboard' && (
          <div className="p-4 bg-gray-50 text-black rounded-md shadow-inner mb-4">
            <p>This is the Whiteboard tab content.</p>
          </div>
        )}
      </div>
    </div>
  )}
</div>

        <div className='p-1 rounded-md text-textPrimary hover:text-white font-semibold'>
          <button onClick={toggleForm}>Daily Standup</button>
        </div>

        <div className='flex items-center gap-2 justify-center'>
          <div className='p-2 rounded-md relative text-textPrimary hover:text-white hover:bg-surface cursor-pointer font-semibold'
            onMouseEnter={() => setShowClip(true)}
            onMouseLeave={() => setShowClip(false)}
          >
            <FaVideo onClick={toggleNewClipMenu} />
            {showClip && (
              <div className="absolute z-50 top-[42px] right-[-27px] text-nowrap w-fit p-2 bg-white border text-surface border-gray-200 rounded-md shadow-lg text-center text-xs flex items-center">
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-200 absolute top-[-10px] right-[40%]"></div>
                Record a Clip
              </div>
            )}
          </div>

          <div className='p-2 rounded-md relative text-textPrimary hover:text-white hover:bg-surface cursor-pointer font-semibold'
            onMouseEnter={() => setShowNote(true)}
            onMouseLeave={() => setShowNote(false)}
          >
            <LuNotebookPen onClick={toggleNotePad} />
            {showNote && (
              <div className="absolute z-50 top-[42px] right-[-27px] text-nowrap w-fit p-2 bg-white border text-surface border-gray-200 rounded-md shadow-lg text-center text-xs flex items-center">
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-200 absolute top-[-10px] right-[40%]"></div>
                Write a note
              </div>
            )}
          </div>
        </div>

        <div className='relative'>
          <div
            className='p-[3px] h-8 w-8 rounded-full border-white flex text-wrap border text-white bg-gray-600 cursor-pointer'
            onClick={toggleMenu}
          >
            <FaUserCircle size={24} />
          </div>

          {isMenuOpen && (
            <div className="fixed inset-0 z-50" onClick={toggleMenu}>
              <div className='absolute right-[1px] top-12 w-40 z-50 bg-white text-black p-2 rounded-md shadow-lg' onClick={(e) => e.stopPropagation()}>
                <ul className='flex flex-col'>
                  <li onClick={toggleProfile} className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                    <FaUser />
                    {user.name}
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                    <FaCog />
                    Settings
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'>
                    <FaSignOutAlt />
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white h-[80%] p-2 rounded-md shadow-lg w-[90%] max-w-md flex items-center justify-center">
            <DailyStandUp closeForm={closeForm} />
          </div>
        </div>
      )}

      {isprofileOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <Profile toggleProfile={toggleProfile} toggleMenu={toggleMenu} />
        </div>
      )}

      {isNewClipMenuOpen && <NewClipMenu toggleMenu={toggleNewClipMenu} />}

      {showNotePad && <NotePad toggleNotePad={toggleNotePad} />}
    </>
  );
};

export default NavBar;
