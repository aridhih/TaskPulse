import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { LuNotebookPen } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import DailyStandUp from './DailyStandUp';
import NotePad from './NotePad';
import Profile from './Profile';
import Setting from './Setting';
import NewPopUp from './NewPopUp';
import { useUser } from '../Layout/UserContext';
import { auth, db } from '../../firebase';
import SearchModel from '/src/components/Navbar/SearchModel.jsx';
import { getDocs, collection, query, where } from 'firebase/firestore';

const Modal = ({ children }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
    {children}
  </div>
);

const NavBar = () => {
  const user = useUser();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modals, setModals] = useState({
    profile: false, settings: false, form: false, notePad: false, newPopup: false
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('task');
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredTasks = tasks.filter(t =>
    t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.description && t.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  
  const filteredUsers = users.filter(u =>
    (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  const hasResults = filteredTasks.length > 0 || filteredUsers.length > 0;

  const toggleModal = (key) => setModals(prev => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.uid) return;

      try {
        // Fetch users
        const usersSnap = await getDocs(collection(db, "users"));
        const userList = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);

        // Fetch tasks where user is either creator or assigned
        const [createdSnap, assignedSnap] = await Promise.all([
          getDocs(query(collection(db, "tasks"), where("createdBy", "==", user.uid))),
          getDocs(query(collection(db, "tasks"), where("assignedTo", "array-contains", user.uid)))
        ]);

        const combinedTasks = [
          ...createdSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
          ...assignedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        ];

        // Remove duplicates
        const uniqueTasks = Array.from(new Map(combinedTasks.map(task => [task.id, task])).values());
        setTasks(uniqueTasks);

      } catch (err) {
        console.error("Error fetching Firebase data:", err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <div className='bg-gradient-to-r from-background via-blue-500 to-purple-500 h-12 flex items-center justify-between p-2 text-white'>
        <h1 className='text-xl font-bold'>TaskPulse</h1>

        {/* Search Bar */}
        <div className="w-[300px] h-8 flex bg-white rounded-lg relative">
          <input
            type="text"
            className="w-full px-3 rounded-lg text-black focus:outline-none placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setShowResults(true); }}
            onBlur={() => setTimeout(() => { setShowResults(false); setSearchTerm(''); }, 200)}
            placeholder="Search"
          />
          <button className='border-l rounded-r-lg hover:bg-slate-50'>
            <CiSearch className='text-black mx-2' />
          </button>
          {showResults && (
            <SearchModel
              showResults={showResults}
              searchTerm={searchTerm}
              hasResults={hasResults}
              filteredUsers={filteredUsers}
              filteredTasks={filteredTasks}
            />
          )}
        </div>

        {/* New popup */}
        <div className="relative">
          <button
            onClick={() => toggleModal("newPopup")}
            className="flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 shadow-sm"
          >
            <IoIosAddCircle className="text-white" />
            <span className="font-semibold">New</span>
          </button>
          {modals.newPopup && (
            <NewPopUp toggleNewPopup={() => toggleModal("newPopup")} activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </div>

        <button className='p-1 rounded-md text-textPrimary hover:text-white font-semibold' onClick={() => toggleModal("form")}>Daily Standup</button>

        <div className='p-2 rounded-md relative text-textPrimary hover:text-white cursor-pointer' title='Write a note'>
          <LuNotebookPen onClick={() => toggleModal("notePad")} />
        </div>

        <div className='relative'>
          <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-violet-600 blur-sm animate-customPulse" />
            <div className="relative z-10 text-white font-semibold">
              {user ? user?.name?.slice(0, 2).toUpperCase() : <FaUserCircle className='h-10 w-10' />}
            </div>
          </div>
          {isMenuOpen && (
            <div className="fixed inset-0 z-50" onClick={() => setIsMenuOpen(false)}>
              <div className='absolute right-1 top-12 w-40 z-50 bg-white text-black p-2 rounded-md shadow-lg' onClick={(e) => e.stopPropagation()}>
                <ul className='flex flex-col'>
                  <li onClick={() => toggleModal("profile")} className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'><FaUser />{user.name}</li>
                  <li onClick={() => toggleModal("settings")} className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-2'><FaCog />Settings</li>
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

      {modals.form && (
        <Modal>
          <div className="bg-white h-[80%] p-2 rounded-md shadow-lg w-[90%] max-w-md flex items-center justify-center">
            <DailyStandUp closeForm={() => toggleModal("form")} user={user} />
          </div>
        </Modal>
      )}
      {modals.profile && <Modal><Profile toggleProfile={() => toggleModal("profile")} toggleMenu={() => setIsMenuOpen(false)} /></Modal>}
      {modals.settings && <Modal><Setting toggleSetting={() => toggleModal("settings")} toggleMenu={() => setIsMenuOpen(false)} user={user} /></Modal>}
      {modals.notePad && <NotePad toggleNotePad={() => toggleModal("notePad")} user={user} />}
    </>
  );
};

export default NavBar;
