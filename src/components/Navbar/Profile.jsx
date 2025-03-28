import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../Layout/UserContext"; // Context se user data fetch karega
import { useState } from "react";
import { auth } from "../../firebase";
import { MdOutlineContentCopy } from "react-icons/md";

const Profile = ({ toggleProfile, toggleMenu }) => {
  const user = useUser();
  const [profilePic, setProfilePic] = useState(null); // Placeholder, can be extended for uploads
  const [copied, setCopied] = useState(false); // State for copy feedback

  const handleCopy = () => {
    if (auth.currentUser?.uid) {
      navigator.clipboard.writeText(auth.currentUser.uid)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
        })
        .catch((err) => console.error("Failed to copy UID", err));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-2xl shadow-xl w-[400px] text-center relative text-white animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={() => { toggleProfile(); toggleMenu(); }}
          className="absolute top-3 right-4 text-lg text-white hover:text-gray-300 transition"
        >
          ✖
        </button>

        {/* Profile Picture */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-300" />
          )}
        </div>

        {/* Name & Email */}
        <div className="space-y-3">
          <p className="text-lg font-bold">{user?.name || "User Name"}</p>
          <p className="text-gray-300">Email: {user?.email || "user@example.com"}</p>

          {auth.currentUser?.uid && (
            <p 
              className="text-gray-300"
            >
              UID: {auth.currentUser.uid} 
              <MdOutlineContentCopy  onClick={handleCopy} className="inline-block text-xl ml-2 cursor-pointer hover:text-gray-100 transition" />
              {copied && <span className="text-green-400 ml-2">Copied!</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
