import React from 'react'
import { PiDotsThreeOutlineThin } from 'react-icons/pi'

const AssignedCard = () => {
  return (
    <div className='h-72 w-[50%] border-2 py-1 px-4 border-black rounded-xl' >
      <div className="h-[15%] border-b font-medium justify-between  flex items-center">
        <p> Assigned To Me </p>
        <PiDotsThreeOutlineThin />
      </div>
      <div className=' h-[85%] flex justify-center items-center '> 
      <button className='flex justify-center items-center  border-blue-700 rounded h-8 w-fit p-2 bg-blue-600 hover:bg-blue-700 text-white'>+ Add Task</button>
      </div>
  

    </div>
  )
}

export default AssignedCard