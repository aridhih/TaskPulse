import React, { useState } from 'react'
import { GiNotebook } from 'react-icons/gi'
import { IoMdClose, IoMdSearch } from 'react-icons/io'

const NotePad = ({ toggleNotePad }) => {
      const [showCloseNotepad, setShowCloseNotepad] = useState(false);
    
    return (
        <div className="fixed inset-0 z-50 backdrop-blur-[1px]">
            <div className='absolute right-[2px] top-[50px] w-80 z-50 bg-white text-black border  rounded-t-lg shadow-lg'>
                <div className="flex justify-between items-center bg-[#ffecb8] p-2 rounded-t-md">
                    <h2 className="text-md font-semibold cursor-default">Notepad</h2>
                    <div className="flex space-x-2">
                        <div className="cursor-pointer p-1 rounded hover:bg-[#ecdcaf]">
                            <IoMdSearch />
                        </div>
                        <div className="cursor-pointer p-1 rounded hover:bg-[#ecdcaf]"
                          onMouseEnter={() => setShowCloseNotepad(true)}
                          onMouseLeave={() => setShowCloseNotepad(false)}
                          >
                            <IoMdClose onClick={toggleNotePad} className='hover:rotate-90 ease-in-out transition duration-300'/>

                        {showCloseNotepad && (
                           <div className="absolute z-50 top-2 right-9 text-nowrap w-fit p-1 bg-gray-700  border text-white border-gray-200 rounded-md shadow-lg text-center text-xs flex items-center">
                           <div className="w-0 h-0 border-b-4 border-b-transparent border-t-4 border-t-transparent border-l-4 border-l-gray-700 absolute top-[7px] right-[-5px]"></div>
                           Close Notepad
                         </div>
                        )}


                        </div>
                    </div>
                </div>
                {/* content div */}
                <div className="p-5 justify-center items-center flex flex-col gap-3 pt-10 ">
                    <GiNotebook className="text-5xl text-gray-400 " />
                    <div>
                        <h3 className="text-lg font-semibold">Create personal notes</h3>
                    </div>
                    <div className="mb-4 flex flex-col gap-1 text-gray-400 text-xs justify-center items-center">
                        <p >Capture your thoughts or ideas and access <br /></p>
                        <p >them anywhere in Taskpulse!</p>
                    </div>
                    <button className="w-fit py-1 px-2 bg-[#fae8b6] rounded-md hover:bg-[#ffecb8] mb-10">Create a note</button>
                </div>
            </div>
        </div>
    )
}

export default NotePad