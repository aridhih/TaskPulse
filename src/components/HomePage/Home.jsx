import React, { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import AssignedCard from "./Cards/AssignedCard";
import RecentsCard from "./Cards/RecentsCard";
import { GoHome } from "react-icons/go";

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isToggled, setIsToggled] = useState(true);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else if (currentHour < 22) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Good Night');
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <div className="h-[calc(100vh-50px)] w-full border  border-gray-200 rounded-lg bg-surface">
      <div className="h-[54px] w-full border-b text-textPrimary border-gray-200 bg-navbar p-2 justify-between rounded-t-lg flex items-center">
        <div className="flex  items-center gap-1 ml-1 ">
          <GoHome />
          <p className="text-[13px]  cursor-default font-[cursive]">Home</p>
        </div>

        <div className="flex items-center relative p-2 gap-2">
          {/* Manage Cards Button */}
          <button className=" hover:text-navbar font-semibold text-textPrimary border-textSecondary border hover:bg-button rounded-xl  px-1 py-[3px]" 
            onClick={toggleSlider}>
            Manage cards
          </button>

          <div className="border-textSecondary border-l-2 h-4 pl-1 flex justify-center items-center">
            <div className={`cursor-pointer h-7 hover:bg-surface ${showDropdown && `bg-surface`} rounded-md flex justify-center items-center p-1`} onClick={toggleDropdown}>
              <CiSettings className="h-5 w-5" />
            </div>
          </div>


          {showDropdown && (
            <div className="fixed inset-0 z-50 " onClick={toggleDropdown}>
              <div className="absolute right-1.5 top-[105px] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
                <div className="p-4">
                  <p className="text-xs text-gray-600">Layout</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-navbar">Page greeting</span>
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
      <div className="h-[calc(100vh-115px)] w-full p-4 flex flex-col gap-4  bg-surface overflow-y-scroll scroll-container scrollbar-hide">
        {isToggled && (
          <div> <p className="text-2xl font-semibold text-textPrimary">{greeting}, Hamad</p> </div>

        )}
        <div className="grid grid-cols-2  gap-3 my-3">
          <RecentsCard />
          <AssignedCard />
          <RecentsCard />
          <AssignedCard />
          <RecentsCard />
          <AssignedCard />
          <RecentsCard />
          <AssignedCard />

        </div>

      </div>

      {/* Slider Panel */}
      <div
        className={`fixed top-[51px] right-0 mr-[2px] h-[calc(100vh-55px)]  w-64 bg-white shadow-md rounded-r-lg border-gray-200 transform transition-transform duration-300 ease-in-out 
          ${isSliderOpen ? "translate-x-0" : "translate-x-full "} ${isSliderOpen && "mr-2"}`}
      >
        <div className="p-4 flex justify-between items-center border-b h-[53px] border-gray-200">
          <h2 className="text-lg font-semibold">Manage Cards</h2>
          <button
            onClick={toggleSlider}
            className="text-gray-600 hover:text-gray-800"
          >
            <RxCross2 className="h-7 w-7 p-1 hover:rotate-90 transform transition duration-300 ease-in-out rounded" />

          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-600">Here are some options for managing cards:</p>
          <ul className="mt-2 space-y-2">
            <li className="p-2 bg-gray-100 rounded-lg">Card 1</li>
            <li className="p-2 bg-gray-100 rounded-lg">Card 2</li>
            <li className="p-2 bg-gray-100 rounded-lg">Card 3</li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default Home;
