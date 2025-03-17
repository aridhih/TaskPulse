import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      {/* TaskPulse Logo */}
      <img
        src="/logo.png" // Image from public folder
        alt="TaskPulse Logo"
        className="w-20 h-20 animate-bounce"
      />

      {/* Loading Text */}
      <p className="text-navbar text-md font-semibold tracking-wider">
        Loading TaskPulse...
      </p>

      {/* Animated Dots */}
      <div className="flex mt-2 space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-0"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loader;
