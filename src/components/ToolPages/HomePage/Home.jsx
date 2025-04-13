import React, { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import AssignedCard from "./Cards/AssignedCard";
import RecentsCard from "./Cards/RecentsCard";
import { GoHome } from "react-icons/go";
import MyWork from "./Cards/MyWork";
import HomeSliderPanel from "./HomeSliderPanel";
import Reports from "./Cards/Reports";
import { useUser } from "../../Layout/UserContext";
const Home = () => {
  const user = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isToggled, setIsToggled] = useState(true);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [cards, setCards] = useState(["Recents", "Assigned To Me", "My Work","Reports"]);


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

  const addCard = (card) => {
    setCards([...cards, card]);
  };

  const removeCard = (card) => {
    setCards(cards.filter((c) => c !== card));
  };


  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-100 rounded-b-lg">
      <div className="h-[54px] w-full  text-textPrimary bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 justify-between flex items-center">
        <div className="flex  items-center gap-1 ml-1">
          <GoHome />
          <p className="text-[13px]  cursor-default font-[cursive]">Home</p>
        </div>

        <div className="flex items-center relative p-2 gap-2">
          {/* Manage Cards Button */}
          <button className=" text-white font-semibold shadow-lg border-white  hover:bg-[#ffffff50] border rounded-xl  px-1 py-[3px]"
            onClick={toggleSlider}>
            Manage cards
          </button>

          <div className="border-textSecondary border-l-2 h-4 pl-1 flex justify-center items-center">
            <div className={`cursor-pointer h-7 hover:bg-[#ffffff50] hover:text-white  ${showDropdown && `bg-[#ffffff50]`} rounded-md flex justify-center items-center p-1`} onClick={toggleDropdown}>
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
      <div className="h-[calc(100vh-105px)] w-full p-4 flex flex-col gap-4  bg-white overflow-y-scroll scroll-container scrollbar-hide">
        {isToggled && (
         user &&(<div> <p className="text-2xl font-semibold text-black">{greeting}, {user.name.slice(0, 1).toUpperCase() + user.name.slice(1)}</p> </div>)

        )}
        <div className="grid grid-cols-2  gap-3 my-3">
          {cards.map((card) => {
            if (card === "Recents") return <RecentsCard key={card} removeCard={removeCard}/>;
            if (card === "Assigned To Me") return <AssignedCard key={card}  removeCard={removeCard}/>;
            if (card === "My Work") return <MyWork key={card} removeCard={removeCard} />;
            if (card === "Reports") return <Reports key={card} removeCard={removeCard} />;
            return null;
          })}
        </div>

      </div>

      {/* Slider Panel */}
      <HomeSliderPanel isSliderOpen={isSliderOpen}  toggleSlider={toggleSlider} cards={cards} addCard={addCard} removeCard={removeCard}/>
    </div>
  );
};

export default Home;
