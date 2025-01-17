import React from 'react'
import { FaVideo } from "react-icons/fa"; 
import { RxVideo } from 'react-icons/rx';


const NewClipMenu = ({toggleMenu}) => {
  return (
    <div className="fixed inset-0 z-50 " onClick={toggleMenu}>
    <div className="absolute top-[104px] right-4 w-fit bg-gray-50 border shadow-lg   shadow-black border-gray-300 rounded-md  z-50" onClick={(e) => e.stopPropagation()}>
      <div className="p-3">
        <div className="flex justify-between gap-8 items-center mb-3">
        <h3 className="text-sm font-semibold text-surface text-nowrap">Record Clip</h3> 

          <a href="/clips" className="w-full text-left text-sm text-textSecondary hover:text-gray-600 hover:bg-gray-200 p-1 rounded-lg justify-center flex items-center gap-2">
          <RxVideo />
          Go to Clips Hub
        </a>
        </div>
        <button className="w-full text-left text-sm text-white bg-red-400 hover:bg-[#ef4444c6] p-2 rounded-lg justify-center flex items-center gap-2 mb-2" onClick={() => alert('Start Recording')}>
          <FaVideo /> 
          Start Recording
        </button>
        
      </div>
    </div>
  </div>
  )
}

export default NewClipMenu