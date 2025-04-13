import React, { useState } from 'react'
import { PiDotsThreeOutlineThin } from 'react-icons/pi'
import RemoveCardMenu from './RemoveCardMenu';

const AssignedCard = ({removeCard}) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };
    
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className='h-72 border py-1 px-4 border-gray-300 rounded-xl bg-gray-200' >
      <div className="h-[15%] border-b border-gray-300 font-medium justify-between  flex items-center">
        <p> Assigned To Me </p>
        <PiDotsThreeOutlineThin className={`hover:text-black hover:text-xl ${isCardOpen && 'text-black text-xl'} cursor-pointer text-gray-500`} onClick={toggleCard} />
      </div>
      <div className=' h-[85%] flex justify-center items-center '> 
      <button className='flex justify-center items-center  border-blue-700 rounded h-8 w-fit p-2 bg-blue-600 hover:bg-blue-700 text-white' onClick={openModal}>+ Add Task</button>
      </div>
  
     
      {isCardOpen && (
        <>
          <RemoveCardMenu toggleCard={toggleCard} removeCard={removeCard} cardName="Assigned To Me" />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[650px] h-[300px] rounded-lg p-5 shadow-lg">
            <div className="flex justify-between items-center pb-2 ">
              <h2 className="text-lg font-semibold border-b-2 border-blue-600">Task</h2>
              <button className="text-gray-600 hover:text-black" onClick={closeModal}>
                ✖
              </button>
            </div>

            <input
              type="text"
              placeholder="Task Name"
              className="w-full mt-4 p-2 border rounded"
            />
            <label className="flex items-center space-x-2 mt-4">
              <input type="checkbox" />
              <span>Add description</span>
            </label>

            <div className="flex items-center space-x-2 mt-4">
              <span className="bg-gray-200 px-3 py-1 rounded text-sm">TO DO</span>
              <span className="bg-gray-200 px-3 py-1 rounded text-sm">Today</span>
              <span className="bg-gray-200 px-3 py-1 rounded text-sm">Priority</span>
              <span className="bg-gray-200 px-3 py-1 rounded text-sm">Tags</span>
            </div>

            <div className="mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={closeModal}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignedCard