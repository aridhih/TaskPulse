import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useUser } from "../Layout/UserContext";

const TeamList = ({ teams, onTeamSelect }) => {
  const user = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const [newMemberUID, setNewMemberUID] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [message, setMessage] = useState("");

  // Handle Adding Member
  const handleAddMember = async () => {
    if (!newMemberUID.trim() || !selectedTeamId) return;

    try {
      const teamRef = doc(db, "teams", selectedTeamId);
      await updateDoc(teamRef, {
        members: arrayUnion(newMemberUID), // Add UID to the members array
      });

      setMessage("✅ Member added successfully!");
      setTimeout(() => setMessage(""), 2000); // Hide message after 2s
    } catch (error) {
      console.error("Error adding member:", error);
      setMessage("❌ Failed to add member.");
    }
    
    setNewMemberUID(""); // Clear input field
    setShowPopup(false); // Close popup
  };

  return (
    <div>
      <ul className="p-4 space-y-3 bg-white rounded-lg shadow-md">
        {teams.length > 0 ? (
          teams.map((team) => {
            const isCreator = auth.currentUser?.uid === team.createdBy; // Check if user is creator

            return (
              <li
                key={team.id}
                onClick={() => onTeamSelect(team)}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
              >
                <span className="text-lg font-semibold text-blue-700">
                  {team.teamName}
                </span>
                <span className="text-sm text-gray-500">
                  Created by {user.name==team.createdByName ? "You" : (team.createdByName|| "Loading...")}
                </span>

                {/* Show "Add Member" button only for the creator */}
                {isCreator && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent selecting team
                      setSelectedTeamId(team.id);
                      setShowPopup(true);
                    }}
                    className="ml-4 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                  >
                    + Add Member
                  </button>
                )}
              </li>
            );
          })
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">No teams available.</p>
          </div>
        )}
      </ul>

      {/* Add Member Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
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
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Add
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
            {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamList;
