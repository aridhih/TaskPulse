import React, { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import AssignedCard from "./Cards/AssignedCard";
import RecentsCard from "./Cards/RecentsCard";
import MyWork from "./Cards/MyWork";
import Reports from "./Cards/Reports";
import HomeSliderPanel from "./HomeSliderPanel";
import { useUser } from "../../Layout/UserContext";

const Home = () => {
  const {user,loading} = useUser();
  const [greeting, setGreeting] = useState('');
  const [cards, setCards] = useState(["Recents", "Assigned To Me", "My Work", "Reports"]);
  const [uiState, setUiState] = useState({
    showDropdown: false,
    isToggled: true,
    isSliderOpen: false,
  });

  const toggle = (key) => setUiState((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
 const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  if (hour < 22) return 'Good Evening';
  return 'Good Night';
};


  if (user?.role === 'admin') {
    alert('Welcome Admin');
  }

  const timer = setTimeout(() => {
    setUiState((prev) => ({ ...prev, isToggled: false }));
  }, 3 * 60 * 1000);
  setGreeting(getGreeting())
  return () => clearTimeout(timer);
}, [user]); 



  const addCard = (card) => setCards([...cards, card]);
  const removeCard = (card) => setCards(cards.filter((c) => c !== card));

  const cardComponents = {
    Recents: RecentsCard,
    "Assigned To Me": AssignedCard,
    "My Work": MyWork,
    Reports: Reports,
  };

  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-100 rounded-b-lg">
      {/* Header */}
      <div className="h-[54px] w-full bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 flex justify-between items-center text-textPrimary">
        <div className="flex items-center gap-1 ml-1">
          <GoHome />
          <p className="text-[13px] cursor-default font-[cursive]">Home</p>
        </div>
        <div className="flex items-center relative p-2 gap-2">
          <button
            className="text-white font-semibold shadow-lg  hover:border-white border rounded-xl px-1 py-[3px]"
            onClick={() => toggle('isSliderOpen')}
          >
            Manage cards
          </button>
          <div className="border-textSecondary border-l-2 h-4 pl-1 flex items-center">
            <div
              className={`cursor-pointer h-7 hover:bg-[#ffffff50] hover:text-white ${uiState.showDropdown && "bg-[#ffffff50]"} rounded-md flex items-center p-1`}
              onClick={() => toggle('showDropdown')}
            >
              <CiSettings className="h-5 w-5" />
            </div>
          </div>
          {uiState.showDropdown && (
            <div className="fixed inset-0 z-50" onClick={() => toggle('showDropdown')}>
              <div
                className="absolute right-1.5 top-[105px] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <p className="text-xs text-gray-600">Layout</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-navbar">Page greeting</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={uiState.isToggled}
                        onChange={() => toggle('isToggled')}
                      />
                      <div className="w-9 h-4 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:border-white" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-105px)] w-full p-4 flex flex-col gap-4 bg-white overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {uiState.isToggled && user && (
          <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-black to-blue-400 animate-shimmer bg-[length:200%_auto]">
            {`${greeting}, ${user?.name?.charAt(0).toUpperCase()}${user?.name?.slice(1)}`}
          </p>
        )}
        <div className="grid grid-cols-2 gap-3 my-3">
          {cards.map((card) => {
            const CardComponent = cardComponents[card];
            return CardComponent ? <CardComponent key={card} removeCard={removeCard} /> : null;
          })}
        </div>
      </div>

      <HomeSliderPanel isSliderOpen={uiState.isSliderOpen} toggleSlider={() => toggle('isSliderOpen')} cards={cards} addCard={addCard} removeCard={removeCard} />
    </div>

  );
};

export default Home;
