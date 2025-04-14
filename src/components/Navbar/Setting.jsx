import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { getAuth, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import axios from 'axios';

const Setting = ({ user, toggleMenu, toggleSetting }) => {
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.photoURL || null);
  const [uploading, setUploading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetEmailSent(true);
      setTimeout(() => setResetEmailSent(false), 4000);
    } catch (error) {
      console.error('Password reset failed:', error.message);
    }
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', 'profile_pictures'); 
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dndvfynfo/image/upload', 
        formData
      );
      const imageUrl = response.data.secure_url;

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, { photoURL: imageUrl });

      // Update Firestore profile too
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, { photoURL: imageUrl });

      alert('Profile picture updated!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div className="relative w-[420px] p-6 bg-white rounded-2xl shadow-xl text-gray-800 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={() => { toggleSetting(); toggleMenu(); }}
          className="absolute top-3 right-4 text-lg text-gray-600 hover:text-red-500"
        >
          ✖
        </button>

        {/* Header */}
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <FaCog className="mr-2" /> Settings
        </h1>

        {/* Preferences */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Preferences</h2>
            <p className="text-sm text-gray-600">Theme: Light</p>
            <p className="text-sm text-gray-600">Notifications: Enabled</p>
          </div>

          {/* Account Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Account</h2>
            <p className="text-sm mb-1 text-gray-600">Name: {user.name}</p>
            <p className="text-sm mb-1 text-gray-600">Email: {user.email}</p>
            <button
              onClick={handlePasswordReset}
              className="text-blue-600 hover:underline text-sm"
            >
              Change Password
            </button>
            {resetEmailSent && (
              <p className="text-green-600 text-xs mt-1">Reset link sent to your email!</p>
            )}

            {/* Profile Picture Upload */}
            <div className="mt-4 flex flex-col items-center">
              <label className="relative cursor-pointer">
                <img
                  src={previewUrl || 'https://via.placeholder.com/150'}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-xs mt-2 text-gray-500">Click image to select</p>
              {selectedImage && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-3 px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Save Photo'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
