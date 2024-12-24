import React from 'react'

const Content = () => {
  return (
    <div className='h-[calc(100vh-48px)] w-full border-2 border-blue-800 p-1 mx-1 rounded'>
      <div className='h-[54px]  w-full border-2 border-red-800 rounded'>

      </div>
      <div
        className="h-[calc(100vh-118px)] mt-1 w-full border-2 p-4 border-yellow-500 rounded overflow-y-auto"
      >
       < p className='text-2xl font-semibold'>Good afternoon, Hamad</p> 
      </div>

    </div>
  )
}

export default Content