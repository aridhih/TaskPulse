import { useState, useRef, useEffect } from 'react';
import { FaInbox } from 'react-icons/fa';
import { MdFilterList } from 'react-icons/md';

const Inbox = () => {
  const [activeTab, setActiveTab] = useState('Important');
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='h-[calc(100vh-55px)]  w-full border-2 border-[#d1d6e0]  shadow-lg m-[1px] mx-[2px] rounded '>
      <div className="h-[50px] w-full px-2  rounded flex items-center justify-between ">
        <div className="flex items-center gap-2 ml-1 mt-3 ">
            <FaInbox className="h-4 w-4" />
        <p className="text-[14px] font-[cursive]  border-gray-200 border-r-2  pr-4 "> Inbox</p>
         </div>
        <div className='pr-[865px]'>
          
        {['Important', 'Other', 'Snoozed', 'Cleared'].map((tab) => (
          <button
            key={tab}
            className={`text-base p-2 hover:bg-gray-100   ${activeTab === tab 
              ? 'mt-6 border-b-2 border-black' 
              : 'text-gray-500 text-base'}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
       
        ))}
       </div>
        <div className="flex items-center gap-1 ml-2  relative" ref={filterRef}>
          <div className="flex items-center font-semibold opacity-65 gap-1 cursor-pointer hover:bg-gray-200 rounded-md " onClick={toggleFilter}>
          <MdFilterList  />
          <p >Filter</p>
          </div>
          <p className='border-gray-200 border-l-2 pl-2 pr-2 font-semibold opacity-65 cursor-pointer'>Customize</p>
          {filterOpen && (
            <div className="absolute right-0 mt-48 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-1">
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between w-full">
                  Assigned to me <span className="text-gray-400">Shift + 1</span>
                </button>
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between w-full">
                  Mentioning me <span className="text-gray-400">Shift + 2</span>
                </button>
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between w-full">
                  Unread only <span className="text-gray-400">Shift + 3</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      

      <div className="p-4 border-t mt-2 ">
        {activeTab === 'Important' && <><div className='flex justify-center '><img src="inbox.jpg" className='h-20 w-20 mt-40 items-center'/>
        <p className='mt-64  '>You don’t have any snoozed notifications</p></div></>
        }
        {activeTab === 'Other' && <><div className='flex justify-center '><img src="inbox.jpg" className='h-20 w-20 mt-40 items-center'/>
          <p className='mt-64  '>You don’t have any snoozed notifications</p></div></>}
        {activeTab === 'Snoozed' && <><div className='flex justify-center '><img src="inbox.jpg" className='h-20 w-20 mt-40 items-center'/>
          <p className='mt-64  '>You don’t have any snoozed notifications</p></div></>}
        {activeTab === 'Cleared' && <><div className='flex justify-center '><img src="inbox.jpg" className='h-20 w-20 mt-40 items-center'/>
          <p className='mt-64  '>You don’t have any cleared notifications</p></div></>}
      </div>
    </div>
  );
};

export default Inbox;