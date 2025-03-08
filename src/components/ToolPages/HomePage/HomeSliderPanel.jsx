import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const HomeSliderPanel = ({ isSliderOpen, toggleSlider, cards, addCard, removeCard }) => {
  const allCards = ["Recents", "Assigned To Me", "My Work", "Reports"];

  return (
    <div
      className={`fixed top-[51px] right-[-6px] h-[calc(100vh-55px)] w-64 bg-white shadow-md rounded-r-lg border-gray-200 transform transition-transform duration-300 ease-in-out 
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
          {allCards.map((card) => (
            <li key={card} className="p-2 bg-gray-100 rounded-lg flex justify-between items-center">
              {card}
              {cards.includes(card) ? (
                <button onClick={() => removeCard(card)} className="text-red-500 hover:text-red-700">
                  <AiOutlineMinus />
                </button>
              ) : (
                <button onClick={() => addCard(card)} className="text-green-500 hover:text-green-700">
                  <AiOutlinePlus />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeSliderPanel;