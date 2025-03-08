import React, { useState } from 'react'
import { PiDotsThreeOutlineThin } from 'react-icons/pi'
import RemoveCardMenu from './RemoveCardMenu';

const Reports = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  return (
    <div className='h-72 border-gray-300 py-1 px-4 border bg-gray-200 rounded-xl shadow-lg shadow-gray-300'>
      <div className="h-[15%] border-b border-gray-300 font-medium justify-between  flex items-center">
        <p>Reports</p>
        <PiDotsThreeOutlineThin className={`hover:text-black hover:text-xl ${isCardOpen && 'text-black text-xl'} cursor-pointer text-gray-500`} onClick={toggleCard} />
      </div>

      <div className=' h-[85%] px-6 py-2'>
        <ol className='list-disc' > <li>
          Report 1
        </li>
          <li>
          Report 2
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

export default Reports