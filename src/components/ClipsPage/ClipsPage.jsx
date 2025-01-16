import React, { useState } from "react";
import { LuVideo } from "react-icons/lu";

const ClipsPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isToggled, setIsToggled] = useState(true);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="h-[calc(100vh-52px)] w-full border border-border shadow-lg m-[1px] ml-[2px] mr-1 rounded bg-surface">
      <div className="h-[54px] w-full border-b border-border p-2 justify-between rounded flex items-center bg-navbar">
        <div className="flex items-center gap-1 ml-1 text-textPrimary">
          <LuVideo />
          <p className="text-[13px] cursor-default font-[cursive]">Clips</p>
        </div>

        <div className="flex items-center relative p-2 gap-2">
          <button className="bg-[#624ae8] hover:bg-[#5a44d4] rounded h-8 py-1 px-2 text-white" onClick={toggleDropdown}>
            New Clips
          </button>

          {showDropdown && (
            <div className="fixed inset-0 z-50" onClick={toggleDropdown}>
              <div className="absolute right-1.5 top-[105px] w-48 bg-white border border-border rounded-lg shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
                <div className="p-4">
                  <p className="text-xs text-gray-600">Layout</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Page greeting</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isToggled}
                        onChange={handleToggle}
                      />
                      <div
                        className="w-9 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                        peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-113px)] w-full p-4 flex flex-col gap-4 bg-surface overflow-y-scroll hide-scrollbar">
        {isToggled && (
          <div>
            <p className="text-2xl font-semibold text-textPrimary">Welcome to Clips</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 my-3"></div>
      </div>
    </div>
  );
};

export default ClipsPage;
