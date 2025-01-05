import React, { useState } from 'react'
import { PiDotsThreeOutlineThin } from 'react-icons/pi'
import RemoveCardMenu from './RemoveCardMenu';

const RecentsCard = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  return (
    <div className='h-72 py-1 px-4 border-2 border-black rounded-xl'>
      <div className="h-[15%] border-b  font-medium justify-between  flex items-center">
        <p>Recents</p>
        <PiDotsThreeOutlineThin className={`hover:text-black hover:text-xl ${isCardOpen && 'text-black text-xl'} cursor-pointer text-gray-500`} onClick={toggleCard} />
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

      {isCardOpen && (
        <>
          <RemoveCardMenu toggleCard={toggleCard} isCardOpen={isCardOpen} />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}
      
    </div>

  )
}

export default RecentsCard