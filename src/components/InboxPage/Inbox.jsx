import { useState, useRef, useEffect } from 'react';
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
      <div className="h-[54px] w-full px-2  rounded flex items-center justify-between space-x-6">
        <div>
        {['Important', 'Other', 'Snoozed', 'Cleared'].map((tab) => (
          <button
            key={tab}
            className={`text-base p-2 ${activeTab === tab 
              ? 'font-semibold border-b-2 border-black' 
              : 'text-gray-500 text-base'}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
        </div>
        <div className="flex items-center gap-1 ml-2 relative" ref={filterRef}>
          <MdFilterList className="cursor-pointer" onClick={toggleFilter} />
          <p className="cursor-pointer" onClick={toggleFilter}>Filter</p>
          <p className='border-gray-200 border-l-2 pl-2 pr-2 cursor-pointer'>Customize</p>
          {filterOpen && (
            <div className="absolute right-0 mt-6 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-1">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between w-full">
                  Assigned to me <span className="text-gray-400">Shift + 1</span>
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between w-full">
                  Mentioning me <span className="text-gray-400">Shift + 2</span>
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between w-full">
                  Unread only <span className="text-gray-400">Shift + 3</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t mt-2 ">
        {activeTab === 'Important' && <p>This is the Important page content.</p>}
        {activeTab === 'Other' && <p>This is the Other page content.</p>}
        {activeTab === 'Snoozed' && <p>This is the Snoozed page content.</p>}
        {activeTab === 'Cleared' && <p>This is the Cleared page content.</p>}
      </div>
    </div>
  );
};

export default Inbox;