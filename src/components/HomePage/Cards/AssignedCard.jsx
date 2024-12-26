import React from 'react'
import { PiDotsThreeOutlineThin } from 'react-icons/pi'

const AssignedCard = () => {
  return (
        <div className='h-[550px] w-[650px] border-2 border-black rounded-xl mt-2 ml-2' >
    <div className="h-[45px] ml-4 font-medium justify-between rounded flex items-center">  
      <div>
          Assigned To Me
           </div>   
           
           <div className='mr-4'>
            <PiDotsThreeOutlineThin />
            </div>
            </div>
            
           <div className='flex justify-center align-center mt-52 border-blue-700 rounded h-8 p-1 ml-60 mr-52 bg-blue-700 text-white'>
            <button>+ Add Task</button>
            </div>
           
        </div>
  )
}

export default AssignedCard