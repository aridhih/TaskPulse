import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../Layout/UserContext"; // Context se user data fetch karega
import { useState } from "react";
import { auth } from "../../firebase";
import { MdOutlineContentCopy } from "react-icons/md";

const Profile = ({ toggleProfile, toggleMenu }) => {
  const user = useUser();
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
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <circle cx="50" cy="50" r="40" fill="#ffffff40" />
          <circle cx="350" cy="50" r="30" fill="#ffffff40" />
          <circle cx="200" cy="250" r="50" fill="#ffffff40" />
        </svg>

        <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 1440 320">
          <path fill="#ffffff40" d="M0,224L48,218.7C96,213,192,203,288,186.7C384,171,480,149,576,160C672,171,768,213,864,229.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L0,320Z"></path>
        </svg>

        <div className="relative w-32 h-32 mx-auto mb-4">
          <input
            type="file"
            accept="image/*"
            className="absolute right-5 top-1 w-32 h-32 opacity-80  cursor-pointer z-10"
            onChange={(e) => console.log('File selected:', e.target.files[0])}
          /> <FaUserCircle className="w-32 h-32 text-gray-300" />
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
              <MdOutlineContentCopy onClick={handleCopy} className="inline-block text-xl ml-2 cursor-pointer hover:text-gray-100 transition" />
              {copied && <span className="text-green-400 ml-2">Copied!</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
