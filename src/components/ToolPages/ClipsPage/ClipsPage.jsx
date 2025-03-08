import React, { useState } from "react";
import { LuVideo } from "react-icons/lu";
import NewClipMenu from "./NewClipMenu";

const ClipsPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-200 rounded-b-lg bg-white">
      <div className="h-[54px] w-full border-b text-textPrimary border-gray-200 bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 justify-between flex items-center">
        <div className="flex items-center gap-1 ml-1">
          <LuVideo />
          <p className="text-[13px] cursor-default font-[cursive]">Clips</p>
        </div>

        <div className="flex items-center relative p-2 gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded h-8 py-1 px-2 text-white" onClick={toggleMenu}>
            New Clip
          </button>
          {showMenu && (
           <NewClipMenu toggleMenu={toggleMenu} />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-115px)] w-full p-4 flex flex-col gap-6 bg-white overflow-y-scroll hide-scrollbar">
      
          <p className="text-2xl font-semibold mb-6 mt-2 text-black">Welcome to Clips</p>
       
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border cursor-pointer border-gray-200 hover:shadow-gray-200 rounded bg-white shadow" onClick={toggleMenu}>
            <h3 className="text-lg font-semibold text-navbar">Record in a snap</h3>
            <p className="text-sm text-surface">Capture your device's screen with just a few clicks. Record and effortlessly share your videos with anyone.
            </p>
          </div>
          <div className="p-4 border cursor-pointer border-gray-200 hover:shadow-gray-200 rounded bg-white shadow" onClick={toggleMenu}>
            <h3 className="text-lg font-semibold text-navbar">Unlock async productivity</h3>
            <p className="text-sm text-surface">Skip the meetings and share all of your design updates, feedback videos, onboarding videos, and more in one place.
            </p>
          </div>
          <div className="p-4 border cursor-pointer hover:shadow-gray-200 border-gray-200 rounded bg-white shadow" onClick={toggleMenu}>
            <h3 className="text-lg font-semibold text-navbar">Watch, share, collaborate</h3>
            <p className="text-sm text-surface">Clips automatically generate a link, allowing you to quickly share your clips anywhere, even outside of your Workspace.
            </p>
          </div>
        </div>
        <div className="p-2 gap-2 flex flex-col items-center justify-center" >
          <h1 className="text-xl text-navbar font-semibold">Create your first Clip!</h1>
          <p className="text-sm text-textSecondary">Create and share screen recordings to give your teammates context. Save your recordings, 
          </p>
          <p className="text-sm text-textSecondary">attach them to tasks, or share them anywhere.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button className="text-white bg-red-400 rounded h-8 py-1 px-2 hover:bg-[#ef4444c6] shadow-lg" onClick={toggleMenu}>
            Create Clip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClipsPage;











