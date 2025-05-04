import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { collection, addDoc, Timestamp, updateDoc, doc } from "firebase/firestore";
import { useUser } from "../Layout/UserContext";

const TeamForm = ({ onTeamCreated }) => {
    const user = useUser();
    const [teamName, setTeamName] = useState("");
    const [error, setError] = useState("");

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        if (!teamName.trim()) {
            setError("Team name cannot be empty.");
            return;
        }
        if (!auth.currentUser) return;

        try {
            const newTeam = {
                teamName: teamName.trim(),
                createdBy: auth.currentUser.uid,
                createdByName: user.name,
                members: [auth.currentUser.uid], // Creator is automatically added
                createdAt: Timestamp.now(),
            };

            const docRef = await addDoc(collection(db, "teams"), newTeam);
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                teamId: docRef.id,
              });

            setTeamName("");
            setError("");
            onTeamCreated({ id: docRef.id, ...newTeam }); // Pass new team back to parent
        } catch (error) {
            console.error("Error creating team:", error);
            setError("Failed to create team. Try again.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Create a New Team</h3>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <form onSubmit={handleCreateTeam}>
                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full p-2 border rounded-md mb-2"
                    placeholder="Enter team name"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
                >
                    Create Team
                </button>
            </form>
        </div>
    );
};

export default TeamForm;
