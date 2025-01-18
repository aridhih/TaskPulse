import React from "react";
import { GoDotFill } from "react-icons/go";
import { MdCastConnected } from "react-icons/md";
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";

const PulsePage = () => {
  const currentHour = new Date().getHours();
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const onlineUsers = ["user1", "user2", "user3"];
  const offlineUsers = ["user4", "user5"];

  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-200 rounded-lg bg-surface">
      <div className="h-[54px] w-full border-b text-textPrimary border-gray-200 bg-navbar p-2 justify-between rounded-t-lg flex items-center">
        <div className="flex items-center gap-1 ml-1">
          <MdCastConnected />
          <p className="text-[13px] cursor-default font-[cursive]">Pulse</p>
          <p className="text-xs cursor-default text-textSecondary ml-5">See who's online </p>
        </div>

        <div className="flex items-center relative p-2 gap-2">
          <div className="text-white underline underline-dotted">
            {currentDate}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-115px)] w-full pt-8 flex flex-col gap-4 items-center bg-surface overflow-y-auto scroll-container">
        <div className="bg-white p-4 rounded-lg shadow-md w-[80%]">
          <div className="text-md flex items-center w-fit font-semibold mb-4 text-surface">
            <GoDotFill className="text-green-500" /> <h2>People Online</h2></div>
          <div className="overflow-x-scroll">
            <div className="flex space-x-4">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`h-32 w-8 rounded ${i === currentHour ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  <p className="mt-2 text-[8px] text-textSecondary">{i % 12 === 0 ? 12 : i % 12} {i < 12 ? 'AM' : 'PM'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="m-4 p-2 w-[80%] flex flex-col gap-4">
          <div className="hover:shadow-lg hover:shadow-green-500/50 hover:border-t hover:border-green-500/50 p-4 rounded-lg transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <p className="text-textPrimary">Online ({onlineUsers.length})</p>
              <FaUserCheck className="text-green-500" />
            </div>
            <ul className="text-textSecondary mt-2 flex gap-8">
              {onlineUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>

          <div className="hover:shadow-lg hover:shadow-red-500/50 hover:border-t hover:border-red-500/50 p-4 rounded-lg transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <p className="text-textPrimary">Offline ({offlineUsers.length})</p>
              <FaUserAltSlash className="text-red-500" />
            </div>
            <ul className="text-textSecondary mt-2  flex gap-8">
              {offlineUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulsePage;