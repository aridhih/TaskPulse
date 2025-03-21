import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserCircle, FaEnvelope, FaPhone, FaTrash, FaEdit } from 'react-icons/fa';
import { db } from '../../firebase';  
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
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
  }, []);

  // Function to delete a user
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers(users.filter(user => user.id !== userId)); // Update UI after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="p-4 h-full bg-[#ffffff96] rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <FaUsers className="mr-2" /> User Management
      </h1>
      <p>Manage users here.</p>

      {loading ? (
        <p>Loading users...</p>
      ) : (
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
                <div className="flex items-center mb-2">
                  <FaPhone className="mr-2 text-gray-600" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit /> {/* Edit user button (to be implemented) */}
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
