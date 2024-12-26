import React from 'react'
import { PiDotsThreeOutlineThin } from 'react-icons/pi'

const RecentsCard = () => {
  return (
    <div className='h-72 w-[650px] border-2 border-black rounded-xl mt-2 ml-2' >
<div className="h-[45px] ml-4 font-medium justify-between rounded flex items-center">  
  <div>
       Recents
       </div>   
       
       <div className='mr-4'>
        <PiDotsThreeOutlineThin />
        </div>
        </div>
        
        <div>
          <li>
            Task 1
          </li>
          <li>
            Task 2
          </li>
          <li>
            Task 3
          </li>
          <li>
            Task 4
          </li>
        </div>
       
    </div>
  )
}

export default RecentsCard