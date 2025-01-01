import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'

const RemoveCardMenu = ({toggleCard}) => {
  return (
    <div className="fixed inset-0 z-50 " onClick={toggleCard}>

        <div className="absolute left-[42%] top-56 w-fit bg-white border border-gray-200 rounded-lg shadow-xl cursor-pointer z-50">
          <div className="p-1 flex justify-center items-center">
           <div className="text-sm hover:bg-gray-100 text-red-800 flex jutify-center items-center gap-2 rounded-md p-[6px]"> <MdDeleteOutline /> Remove Card</div>
          </div>
        </div>
      </div>
  )
}

export default RemoveCardMenu