import { FaTachometerAlt, FaUsers, FaChartBar, FaCog } from 'react-icons/fa';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="w-64 h-screen bg-gradient-to-r from-background  text-white p-4">
      <ul className="space-y-10">
        <li className="text-lg font-semibold cursor-pointer flex items-center" onClick={() => setActiveComponent('Dashboard')}>
          <FaTachometerAlt className="mr-2" /> Dashboard
        </li>
        <li className="text-lg font-semibold cursor-pointer flex items-center" onClick={() => setActiveComponent('User Management')}>
          <FaUsers className="mr-2" /> User Management
        </li>
        
       
        <li className="text-lg font-semibold cursor-pointer flex items-center" onClick={() => setActiveComponent('Settings')}>
          <FaCog className="mr-2" /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;