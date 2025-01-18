import React, { useState } from 'react'
import { PiDotsThreeOutlineThin } from 'react-icons/pi'
import RemoveCardMenu from './RemoveCardMenu';

const AssignedCard = () => {
      const [isCardOpen, setIsCardOpen] = useState(false);
      
    const toggleCard = () => {
      setIsCardOpen(!isCardOpen);
    };
  
  return (
    <div className='h-72 border py-1 px-4 border-gray-300 rounded-xl bg-gray-200' >
      <div className="h-[15%] border-b border-gray-300 font-medium justify-between  flex items-center">
        <p> Assigned To Me </p>
        <PiDotsThreeOutlineThin className={`hover:text-black hover:text-xl ${isCardOpen && 'text-black text-xl'} cursor-pointer text-gray-500`} onClick={toggleCard} />
      </div>
      <div className=' h-[85%] flex justify-center items-center '> 
      <button className='flex justify-center items-center  border-blue-700 rounded h-8 w-fit p-2 bg-blue-600 hover:bg-blue-700 text-white'>+ Add Task</button>
      </div>
  
      {isCardOpen && (
        <>
        <RemoveCardMenu toggleCard={toggleCard}/>
        <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}

    </div>
  )
}

export default AssignedCard