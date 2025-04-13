// components/EmptyState.jsx
import React from "react";

const EmptyState = ({ toggleMenu }) => {
  return (
    <div>
      <p className="text-2xl font-semibold mb-6 mt-2 text-black">Welcome to Clips</p>
      <div className="grid grid-cols-3 gap-4">
        {["Record in a snap", "Unlock async productivity", "Watch, share, collaborate"].map((title, index) => (
          <div
            key={index}
            className="p-4 border cursor-pointer border-gray-200 hover:shadow-gray-200 rounded bg-white shadow"
            onClick={toggleMenu}
          >
            <h3 className="text-lg font-semibold text-navbar">{title}</h3>
            <p className="text-sm text-surface">
              {index === 0 && "Capture your device's screen with just a few clicks..."}
              {index === 1 && "Skip the meetings and share your design updates..."}
              {index === 2 && "Clips automatically generate a link for easy sharing..."}
            </p>
          </div>
        ))}
      </div>
      <div className="p-2 gap-2 flex flex-col items-center justify-center">
        <h1 className="text-xl text-navbar font-semibold">Create your first Clip!</h1>
        <p className="text-sm text-textSecondary">Create and share screen recordings...</p>
        <p className="text-sm text-textSecondary">Attach them to tasks, or share them anywhere.</p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="text-white bg-red-400 rounded h-8 py-1 px-2 hover:bg-[#ef4444c6] shadow-lg"
          onClick={toggleMenu}
        >
          Create Clip
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
