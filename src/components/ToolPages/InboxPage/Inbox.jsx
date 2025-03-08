import { useState } from 'react';
import { FaInbox } from 'react-icons/fa';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { MdFilterList, MdMoveToInbox } from 'react-icons/md';
import FilterInbox from './FilterInbox';
import { RxCross2 } from 'react-icons/rx';

const Inbox = () => {

  const [activeTab, setActiveTab] = useState('Important');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <div className="h-[calc(100vh-50px)] w-full border  rounded-b-lg ">
      <div className="h-[54px] w-full  text-white bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 justify-between  flex items-center">

        <div className='flex items-center gap-2'>
          <div className="flex items-center gap-2 ml-1">
            <FaInbox className="h-4 w-4" />
            <p className="text-[13px] font-[cursive] cursor-default  border-textSecondary border-r-2  pr-4 "> Inbox</p>
          </div>

          <div className='flex'>
            {['Important', 'Other', 'Snoozed', 'Cleared'].map((tab) => (
              <div key={tab} className={`${activeTab === tab ? 'border-b-2 border-textPrimary' : ''}`}>
                <button
                  className={`text-base font-semibold  p-1 m-1 hover:text-textPrimary rounded ${activeTab === tab
                    ? 'text-textPrimary'
                    : 'text-textSecondary'}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex  items-center gap-2 ml-2  relative">

          <div className={`flex items-center font-semibold shadow-lg  hover:bg-[#ffffff50] text-white    gap-1 cursor-pointer ${filterOpen && `bg-[#ffffff50]`}  border border-white rounded-xl  px-1 py-[3px]`}
            onClick={toggleFilter}>
            <MdFilterList />
            <p>Filter</p>
          </div>
          <div className='border-l-2 border-textPrimary  pl-2 h-5 flex items-center'>
            <div className={`flex items-center font-semibold shadow-lg  hover:bg-[#ffffff50] text-white    gap-1 cursor-pointer ${isSliderOpen && `bg-[#ffffff50]`}  border border-white rounded-xl  px-1 py-[3px]`}
              onClick={toggleSlider}>
              <HiOutlineAdjustmentsHorizontal />
              <p>Customize</p>
            </div>
          </div>

          {filterOpen && (
            <FilterInbox toggleFilter={toggleFilter} />
          )}
        </div>
      </div>

      <div className="h-[calc(100vh-113px)] w-full p-4 flex flex-col gap-4  bg-white b items-center justify-center">
        <MdMoveToInbox className='h-12 w-12 text-textSecondary' />
        <div>
          {activeTab === 'Important' && <><div className='flex justify-center '>
            <p>You don't have any important notifications</p></div></>
          }
          {activeTab === 'Other' && <><div className='flex justify-center '>
            <p>You don't have any other notifications</p></div></>}
          {activeTab === 'Snoozed' && <><div className='flex justify-center '>
            <p>You don't have any snoozed notifications</p></div></>}
          {activeTab === 'Cleared' && <><div className='flex justify-center '>
            <p>You don't have any cleared notifications</p></div></>}
        </div>

      </div>

      {/* Slider Panel */}
      <div
        className={`fixed top-[50px] right-[-6px]  h-[calc(100vh-55px)]  w-64 bg-white shadow-md rounded-r-lg border-gray-200 transform transition-transform duration-300 ease-in-out 
                ${isSliderOpen ? "translate-x-0" : "translate-x-full "} ${isSliderOpen && "mr-2"}`}
      >
        <div className="p-4 flex justify-between items-center border-b h-[53px] border-gray-200">
          <h2 className="text-lg font-semibold">Customize Inbox</h2>
          <button
            onClick={toggleSlider}
            className="text-gray-600 hover:text-gray-800"
          >
            <RxCross2 className="h-7 w-7 p-1 hover:rotate-90 transform transition duration-300 ease-in-out rounded" />

          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-600">Here are some options for customization:</p>
          <ul className="mt-2 space-y-2">
            <li className="p-2 hover:bg-gray-100  rounded-lg">Option 1</li>
            <li className="p-2 hover:bg-gray-100 rounded-lg">Option 2</li>
            <li className="p-2 hover:bg-gray-100 rounded-lg">Option 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inbox;