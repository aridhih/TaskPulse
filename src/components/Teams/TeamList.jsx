import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useUser } from "../Layout/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion"; // Importing Framer Motion

const TeamList = ({ teams, onTeamSelect }) => {
  const user = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const [newMemberUID, setNewMemberUID] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  // Handle Adding Member
  const handleAddMember = async () => {
    if (!newMemberUID.trim() || !selectedTeamId) {
      toast.error("⚠️ Please enter a valid UID.");
      return;
    }

    try {
      const teamRef = doc(db, "teams", selectedTeamId);
      await updateDoc(teamRef, {
        members: arrayUnion(newMemberUID),
      });

      toast.success(" Member added successfully!");
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error(" Failed to add member.");
    }

    setNewMemberUID("");
    setShowPopup(false);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />


      <ul className="p-4 space-y-3 relative bg-white rounded-lg shadow-md h-[calc(100vh-170px)] scroll-container overflow-y-auto">
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cross-hatch" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 10 10 M 10 0 L 0 10" stroke="gray" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cross-hatch)" />
        </svg>

        {teams.length > 0 ? (
          teams.map((team) => {
            const isCreator = auth.currentUser?.uid === team.createdBy;

            return (
              <motion.li
                key={team.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => onTeamSelect(team)}
                className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center cursor-pointer  hover:bg-gray-200 transition"
              >
                <span className="text-lg font-semibold text-blue-700">
                  {team.teamName}
                </span>
                <span className="text-sm text-gray-500">
                  Created by {user.name === team.createdByName ? "You" : team.createdByName || "Loading..."}
                </span>

                {isCreator && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTeamId(team.id);
                      setShowPopup(true);
                    }}
                    className="ml-4 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                  >
                    + Add Member
                  </button>
                )}
              </motion.li>
            );
          })
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">No teams available.</p>
          </div>
        )}
      </ul>

      {/* Add Member Popup with Framer Motion */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-4">Add Member by UID</h2>
              <input
                type="text"
                placeholder="Enter User UID"
                value={newMemberUID}
                onChange={(e) => setNewMemberUID(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleAddMember}
                  className="bg-blue-500 text-white px-4 py-2 w-24 rounded-lg hover:bg-blue-600 transition"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-400 text-white px-4 w-24 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamList;
