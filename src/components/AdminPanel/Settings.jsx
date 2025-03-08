import React from 'react';
import { FaCog } from 'react-icons/fa';

const Settings = () => {
  return (
    <div className="p-4 h-full bg-[#ffffff96] rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <FaCog className="mr-2" /> Settings
      </h1>
      <p>Manage your application settings here.</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Preferences</h2>
        <p>Theme: Light</p>
        <p>Notifications: Enabled</p>
      </div>
    </div>
  );
};

export default Settings;