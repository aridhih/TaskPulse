import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import TaskManagement from './TaskManagement';
import Reports from './Reports';
import Settings from './Settings';
import Analytics from './Analytics';

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'User Management':
        return <UserManagement />;
      case 'Task Management':
        return <TaskManagement />;
      case 'Reports':
        return <Reports />;
      case 'Analytics':
        return <Analytics />;
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
