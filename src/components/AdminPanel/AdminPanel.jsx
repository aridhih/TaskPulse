import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import Settings from './Settings';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [users]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'User Management':
        return <UserManagement users={users} loading={loading} />;

      case 'Settings':
        return <Settings  users={users} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      {loading ? (
        <div className="flex h-full items-center justify-center w-full">
          <div className="w-8 h-8 border-2 border-black border-dashed rounded-full animate-spin"></div>
          <p className="ml-2">Please Wait ...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="flex h-full items-center justify-center w-full">
          <p className="ml-2 text-white text-xl font-semibold">Access Denied</p>
        </div>
      ) : (
        <>
          <Sidebar setActiveComponent={setActiveComponent} />
          <div className="flex-1 p-2">
            {renderComponent()}
          </div>
        </>
      )}
    </div>

  );
};

export default AdminPanel;
