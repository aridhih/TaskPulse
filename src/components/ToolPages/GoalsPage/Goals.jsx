import React from "react";
import { TfiCup } from "react-icons/tfi";

const Goals = () => {
  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-200  bg-white">
      <div className="h-[54px] w-full border-b text-textPrimary bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 justify-between flex items-center">
        <div className="flex items-center gap-1 ml-1">
          <TfiCup className="h-3 w-3" />
          <p className="text-[13px] cursor-default font-[cursive]">Goals</p>
        </div>

        <div className="flex items-center relative p-2 gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 shadow-lg  rounded h-8 py-1 px-2 text-white">
            Set a goal
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-115px)] w-full p-4 flex flex-col gap-4 bg-white overflow-y-scroll hide-scrollbar">
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default Goals;
