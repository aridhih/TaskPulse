import React, { useState } from 'react'
import { PiDotsThreeOutlineThin } from 'react-icons/pi'
import RemoveCardMenu from './RemoveCardMenu';
import { BsListTask } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlineBell } from "react-icons/ai";

const MyWork = ({removeCard}) => {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isPersonalListOpen, setIsPersonalListOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('task'); // 'task' or 'reminder'
    const [isNotifyOpen, setIsNotifyOpen] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    
    const toggleCard = () => setIsCardOpen(!isCardOpen);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const togglePersonalList = () => setIsPersonalListOpen(!isPersonalListOpen);
    const toggleNotify = () => setIsNotifyOpen(!isNotifyOpen);
    const toggleDescription = () => setIsDescriptionOpen(!isDescriptionOpen);

    return (
        <div className='h-72 border py-1 px-4 border-gray-300 rounded-xl bg-gray-200 shadow-lg shadow-gray-300'>
            <div className="h-[15%] border-b border-gray-300 font-medium justify-between flex items-center">
                <p>My Work</p>
                <PiDotsThreeOutlineThin className={`hover:text-black hover:text-xl ${isCardOpen && 'text-black text-xl'} cursor-pointer text-gray-500`} onClick={toggleCard} />
            </div>
            <div className='h-[85%] flex justify-center items-center'>
                <button className='flex justify-center items-center border-blue-700 rounded h-8 w-fit p-2 bg-blue-600 hover:bg-blue-700 text-white' onClick={openModal}>
                    + Add Task or Reminder
                </button>
            </div>

            {isCardOpen && (
                <>
                    <RemoveCardMenu toggleCard={toggleCard} removeCard={removeCard} cardName="My Work" />
                    <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
                </>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-[650px] h-auto rounded-lg p-5 shadow-lg relative">
                        
                        {/* Task & Reminder Tabs */}
                        <div className="flex border-b">
                            <button 
                                className={`flex-1 text-center py-2 font-semibold ${activeTab === 'task' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`} 
                                onClick={() => setActiveTab('task')}
                            >
                                Task
                            </button>
                            <button 
                                className={`flex-1 text-center py-2 font-semibold ${activeTab === 'reminder' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`} 
                                onClick={() => setActiveTab('reminder')}
                            >
                                Reminder
                            </button>
                        </div>

                        <button className="absolute top-3 right-3 text-gray-600 hover:text-black" onClick={closeModal}>
                            ✖
                        </button>

                        {/* Task Form */}
                        {activeTab === 'task' && (
                            <>
                                <div className="mt-4 relative">
                                    <button className="flex items-center bg-gray-100 px-3 py-2 rounded text-gray-700 hover:bg-gray-200 w-full" onClick={togglePersonalList}>
                                        <span className="font-medium">📂 Personal List</span>
                                        <span className="ml-2">▼</span>
                                    </button>
                                    {isPersonalListOpen && (
                                        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50">
                                            <h3 className="font-medium border-b pb-2">Your Personal Lists</h3>
                                            <ul className="mt-2">
                                                <li className="px-3 py-2 flex justify-between items-center bg-gray-100 rounded">
                                                    📂 Personal List <span>✔</span>
                                                </li>
                                                <p className="text-gray-500 px-3 pt-2 text-sm">Recents</p>
                                                <li className="px-3 py-2 flex items-center cursor-pointer hover:bg-gray-100">
                                                    <BsListTask className="mr-2" />
                                                    Project 2
                                                </li>
                                                <p className="text-gray-500 px-3 pt-2 text-sm">Spaces</p>
                                                <li className="px-3 py-2 flex items-center cursor-pointer hover:bg-gray-100">
                                                    <FaUsers className="mr-2" />
                                                    Team Space
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <input type="text" placeholder="Task Name" className="w-full mt-4 p-2 border rounded" />
                                <button className="text-blue-600 mt-2" onClick={toggleDescription}>Add Description</button>
                                {isDescriptionOpen && <textarea className="w-full mt-2 p-2 border rounded" rows="3" placeholder="Enter description..."></textarea>}
                                <div className="flex items-center space-x-2 mt-4">
                                    <span className="bg-gray-200 px-3 py-1 rounded text-sm">TO DO</span>
                                    <span className="bg-gray-200 px-3 py-1 rounded text-sm">Today</span>
                                    <span className="bg-gray-200 px-3 py-1 rounded text-sm">Priority</span>
                                    <span className="bg-gray-200 px-3 py-1 rounded text-sm">Tags</span>
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4">Create Task</button>
                            </>
                        )}

                        {/* Reminder Form */}
                        {activeTab === 'reminder' && (
                            <>
                                <input type="text" placeholder="Reminder Name" className="w-full mt-4 p-2 border rounded" />
                                <div className="flex space-x-2 mt-4">
                                    <button className="flex items-center bg-gray-200 px-3 py-1 rounded text-sm">
                                        <AiOutlineCalendar className="mr-1" /> Today
                                    </button>
                                    <button className="flex items-center bg-gray-200 px-3 py-1 rounded text-sm relative" onClick={toggleNotify}>
                                        <AiOutlineBell className="mr-1" /> Notify
                                    </button>
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4">Create Reminder</button>

                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyWork;