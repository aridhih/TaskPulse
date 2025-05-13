import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import Settings from './Settings';

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'User Management':
        return <UserManagement />;
      
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex-1 p-2">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminPanel;
