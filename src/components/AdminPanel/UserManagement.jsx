import { FaUsers, FaUserCircle, FaEnvelope, FaPhone, FaTrash, FaEdit } from 'react-icons/fa';
import { db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { updateDoc } from 'firebase/firestore';

const UserManagement = ({ users, loading }) => {

  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);


  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteDoc(doc(db, 'users', userId));
    }

  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    const userRef = doc(db, 'users', editingUser.uid);

    try {
      setIsEditing(true);
      // Update the user document in Firestore
      await updateDoc(userRef, {
        name: editForm.name,
        email: editForm.email
      });
      setEditingUser(null);
      setEditForm({ name: '', email: '' });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-lg bg-gray-900 w">
            {users
              ?.filter(user => user.role !== 'admin')
              .map(user => (
                <li
                  key={user.id}
                  className="relative flex flex-col items-start p-5 bg-gray-800/50 rounded-xl shadow-lg border border-teal-500/30 hover:shadow-teal-500/40 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-teal-500"
                      />
                    ) : (
                      <FaUserCircle className="mr-3 text-3xl text-teal-400" />
                    )}
                    <span className="font-semibold text-lg text-white">{user.name}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <FaEnvelope className="mr-2 text-teal-400 text-lg" />
                    <span className="text-gray-300 text-sm">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center mb-3">
                      <FaPhone className="mr-2 text-teal-400 text-lg" />
                      <span className="text-gray-300 text-sm">{user.phone}</span>
                    </div>
                  )}
                  <div className="flex space-x-3 mt-3">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setEditForm({ name: user.name, email: user.email });
                      }}
                      className="p-2 rounded-full bg-teal-500/20 text-teal-400 hover:bg-teal-500/40 transition-colors duration-200">
                      <FaEdit className="text-lg" />
                    </button>
                    <button className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors duration-200">
                      <FaTrash onClick={() => handleDeleteUser(user.id)} className="text-lg" />
                    </button>
                  </div>
                </li>
              ))}
          </ul>

        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit User <span title='User ID' className='text-xs cursor-default text-gray-300'>({editingUser.uid})</span></h2>
            <div className="mb-2">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className={`px-4 py-2 bg-blue-600 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''} text-white rounded hover:bg-blue-700`}
              >
                {isEditing ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserManagement;
