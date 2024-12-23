import React from 'react'

import { CiSearch } from 'react-icons/ci'

const NavBar = () => {
  return (
    <div className='bg-gray-800 h-12 flex flex-row justify-between p-2 text-white'>

      <h1 className='text-xl font-bold'>TaskPulse</h1>
      <div className=" w-[300px] flex bg-white rounded-lg  flex-row justify-center rounded-r-lg hover:">
        <input
          type="text"
          class="w-full p-3 border rounded-lg  text-black focus:none focus:outline-none placeholder-gray-500 border-none"
          placeholder="Search"
        />
        <button className='cursor-default mr-2'>
          <CiSearch className='text-black'/>
        </button>
      </div>

      <div>
        + New
      </div>


      <div className=' p-1 rounded-md text-black bg-white font-semibold'>
        <button >Daily Stand Up</button>
      </div>
      
      <div className='p-1 h-8 w-8 rounded-full border-white border text-white bg-gray-600 cursor-pointer'>
        <h1>RH</h1>
      </div> 

    </div>
  )
}

export default NavBar