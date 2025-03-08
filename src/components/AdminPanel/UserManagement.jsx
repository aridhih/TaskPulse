import React from 'react';
import { FaUsers, FaUserCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

const UserManagement = () => {
  const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com', phone: '123-456-7890' },
    { id: 2, name: 'User 2', email: 'user2@example.com', phone: '123-456-7891' },
    { id: 3, name: 'User 3', email: 'user3@example.com', phone: '123-456-7892' },
    { id: 4, name: 'User 4', email: 'user4@example.com', phone: '123-456-7893' },
    { id: 5, name: 'User 5', email: 'user5@example.com', phone: '123-456-7894' },
  ];

  return (
    <div className="p-4 h-full bg-[#ffffff96]  rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <FaUsers className="mr-2" /> User Management
      </h1>
      <p>Manage users here.</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">User List</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <li key={user.id} className="flex flex-col items-start p-4 bg-gray-100 rounded shadow">
              <div className="flex items-center mb-2">
                <FaUserCircle className="mr-2 text-2xl" /> 
                <span className="font-semibold">{user.name}</span>
              </div>
              <div className="flex items-center mb-1">
                <FaEnvelope className="mr-2 text-gray-600" /> 
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 text-gray-600" /> 
                <span>{user.phone}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
