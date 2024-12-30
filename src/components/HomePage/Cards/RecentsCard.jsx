import React from 'react'
import { PiDotsThreeOutlineThin } from 'react-icons/pi'

const RecentsCard = () => {
  return (
    <div className='h-72 w-[50%] py-1 px-4 border-2 border-black rounded-xl' >
      <div className="h-[15%] border-b  font-medium justify-between  flex items-center">
        <p>Recents</p>
        <PiDotsThreeOutlineThin />
      </div>

      <div className=' h-[85%] px-6 py-2'>
        <ol className='list-disc' > <li>
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
        </ol>

      </div>

    </div>
  )
}

export default RecentsCard