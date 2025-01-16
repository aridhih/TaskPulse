import React from "react";
import { TfiCup } from "react-icons/tfi";

const Goals = () => {
  
  

  return (

    <div className="h-[calc(100vh-52px)] w-full border shadow-lg m-[1px] ml-[2px] mr-1 rounded">
      <div className="h-[54px] w-full border-b border-gray-200 p-2 justify-between rounded flex items-center">
        <div className="flex items-center gap-1 ml-1 ">
          <TfiCup className="h-3 w-3"/>
          <p className="text-[13px] cursor-default font-[cursive]">Goals</p>
        </div>

        <div className="flex items-center relative p-2 gap-2">
          
          <button className="bg-[#624ae8] hover:bg-[#5a44d4] rounded h-8 py-1 px-2  text-white" >
            Set a goal
          </button>

          

        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-113px)] w-full p-4 flex  flex-col gap-4  bg-gray-200 overflow-y-scroll">
        
          <div className="h-[calc(100vh-113px)] w-full p-4 flex flex-col gap-4 bg-gray-200 items-center justify-center">
          <img src="goalsBg.png" className='rounded border shadow-sm' />

          </div>



      </div>

     
    </div>

  );
};

export default Goals;
