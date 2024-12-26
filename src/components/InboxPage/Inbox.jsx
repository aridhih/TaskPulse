import { useState } from 'react';

const Inbox = () => {
  const [activeTab, setActiveTab] = useState('Important');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='h-[calc(100vh-55px)]  w-full border-2 border-[#d1d6e0]  shadow-lg m-[1px] mx-[2px] rounded'>
      <div className="h-[54px] w-full px-2 rounded flex items-center justify-start space-x-6">
        
        {['Important', 'Other', 'Snoozed', 'Cleared'].map((tab) => (
          <button
            key={tab}
            className={`text-sm p-2 ${activeTab === tab 
              ? 'font-semibold border-b-2 border-black' 
              : 'text-gray-500'}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 border-t mt-2">
        {activeTab === 'Important' && <p>This is the Important page content.</p>}
        {activeTab === 'Other' && <p>This is the Other page content.</p>}
        {activeTab === 'Snoozed' && <p>This is the Snoozed page content.</p>}
        {activeTab === 'Cleared' && <p>This is the Cleared page content.</p>}
      </div>
    </div>
  );
};

export default Inbox;
