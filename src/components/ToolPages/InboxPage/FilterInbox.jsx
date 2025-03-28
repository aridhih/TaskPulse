import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { IoMailUnreadOutline } from 'react-icons/io5'

const FilterInbox = ({toggleFilter}) => {
    const options = [
            {
                icon : <CgProfile />,
                title : "Assigned to me"
            },
            {
                icon : <IoMailUnreadOutline />,
                title : "Unread only"
            }
        ]
    return (

        <div className="fixed inset-0 z-50 " onClick={toggleFilter}>

        <div className="absolute right-1 top-[104\px] bg-white text-nowrap border border-gray-200 rounded-md shadow-lg z-10" onClick={(e) => e.stopPropagation()}>
            <div className="p-2">
               { options.map((option) => (
                   
                    <button className="p-2 text-sm w-36 text-gray-700 rounded hover:bg-gray-100 flex gap-3 items-center">
                        {option.icon} {option.title}
                    </button>
                ))}
            </div>
        </div>

        </div>  
    )
}

export default FilterInbox