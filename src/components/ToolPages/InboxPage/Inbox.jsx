import { useState } from 'react';
import { FaInbox } from 'react-icons/fa';
import { MdFilterList, MdMoveToInbox } from 'react-icons/md';
import FilterInbox from './FilterInbox';
import StandupFeed from './StandupFeed';

const Inbox = () => {
  const [activeTab, setActiveTab] = useState('Important');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChannelOpen, setIsChannelOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Channel') {
      setIsChannelOpen(true);
    } else {
      setIsChannelOpen(false);
    }
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="h-[calc(100vh-50px)] w-full border rounded-b-lg">
      {/* Header */}
      <div className="h-[54px] w-full text-white bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 justify-between flex items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 ml-1">
            <FaInbox className="h-4 w-4" />
            <p className="text-[13px] font-[cursive] cursor-default border-textSecondary border-r-2 pr-4">
              Inbox
            </p>
          </div>

          {/* Tabs */}
          <div className="flex">
            {['All','Important', 'Other', 'Snoozed', 'Cleared'].map((tab) => (
              <div key={tab} className={`${activeTab === tab ? 'border-b-2 border-textPrimary' : ''}`}>
                <button
                  className={`text-base font-semibold p-1 m-1 hover:text-textPrimary rounded ${activeTab === tab ? 'text-textPrimary' : 'text-textSecondary'
                    }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleTabClick('Channel')}
          className={`rounded font-semibold p-1 m-1 font-[cursive]  ${isChannelOpen ? 'underline' : 'hover:underline'
            }`}
        >
          Channel
        </button>

        <div className="flex items-center relative">
          <div
            className={`flex items-center font-semibold shadow-lg hover:bg-[#ffffff50] text-white gap-1 cursor-pointer ${filterOpen && 'bg-[#ffffff50]'
              } border border-white rounded-xl px-1 py-[3px]`}
            onClick={toggleFilter}
          >
            <MdFilterList />
            <p>Filter</p>
          </div>

          {filterOpen && <FilterInbox toggleFilter={toggleFilter} />}
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-113px)] w-full p-4 flex flex-col gap-4 bg-gray-50 items-center justify-center ">
        {!isChannelOpen ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <MdMoveToInbox className="h-12 w-12 text-textSecondary" />
            <div>
              {activeTab === 'All' && (
                <div className="flex justify-center">
                  <p>You don't have any notifications</p>
                </div>
              )}
              {activeTab === 'Important' && (
                <div className="flex justify-center">
                  <p>You don't have any important notifications</p>
                </div>
              )}
              {activeTab === 'Other' && (
                <div className="flex justify-center">
                  <p>You don't have any other notifications</p>
                </div>
              )}
              {activeTab === 'Snoozed' && (
                <div className="flex justify-center">
                  <p>You don't have any snoozed notifications</p>
                </div>
              )}
              {activeTab === 'Cleared' && (
                <div className="flex justify-center">
                  <p>You don't have any cleared notifications</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <StandupFeed />
        )}
      </div>
    </div>
  );
};

export default Inbox;
