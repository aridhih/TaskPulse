import React from 'react';
import { FaTachometerAlt, FaUsers, FaTasks, FaChartBar, FaCog } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="w-64 h-screen bg-gradient-to-r from-background  text-white p-4">
      <ul className="space-y-4">
        <li className="text-lg font-semibold cursor-pointer flex items-center" onClick={() => setActiveComponent('Dashboard')}>
          <FaTachometerAlt className="mr-2" /> Dashboard
        </li>
        <li className="text-lg font-semibold cursor-pointer flex items-center" onClick={() => setActiveComponent('User Management')}>
          <FaUsers className="mr-2" /> User Management
        </li>
        <li className="text-lg font-semibold cursor-pointer flex items-center" onClick={() => setActiveComponent('Task Management')}>
          <FaTasks className="mr-2" /> Task Management
        </li>
        <li className="text-lg font-semibold cursor-pointer flex items-center" onClick={() => setActiveComponent('Reports')}>
          <FaChartBar className="mr-2" /> Reports
        </li>
        <li className="text-lg font-semibold cursor-pointer flex items-center" onClick={() => setActiveComponent('Analytics')}>
          <FaArrowTrendUp className="mr-2" /> Analytics
        </li>
        <li className="text-lg font-semibold cursor-pointer flex items-center" onClick={() => setActiveComponent('Settings')}>
          <FaCog className="mr-2" /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;