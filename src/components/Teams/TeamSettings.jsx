import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { RxCross2 } from 'react-icons/rx';
import { collection, deleteDoc, getDocs, query, where,deleteField ,doc, getDoc, updateDoc} from 'firebase/firestore';
import toast from 'react-hot-toast';


const TeamSettings = ({ teamId, teamMembers: initialMembers, toggleSettings, teamName }) => {
    const [teamMembers, setTeamMembers] = useState(initialMembers || []);
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teamNameState, setTeamNameState] = useState(teamName || '');
    const [updatingName, setUpdatingName] = useState(false);
    const currentUserId = auth.currentUser?.uid;
    const isCreator = currentUserId && initialMembers.includes(currentUserId);

    useEffect(() => {
        const fetchUsersData = async () => {
            setLoading(true);
            const promises = teamMembers.map(async uid => {
                const userDoc = await getDoc(doc(db, 'users', uid));
                return userDoc.exists() ? { uid, ...userDoc.data() } : { uid };
            });
            const users = await Promise.all(promises);
            setUsersData(users);
            setLoading(false);
        };

        if (teamMembers.length > 0) {
            fetchUsersData();
        }
    }, [teamMembers]);

    const handleRemoveMember = async (uid) => {
        const confirm = window.confirm("Are you sure you want to remove this member?");
        if (!confirm) return;

        try {
            const teamRef = doc(db, 'teams', teamId);
            const updatedMembers = teamMembers.filter(member => member !== uid);
            await updateDoc(teamRef, { members: updatedMembers });
            setTeamMembers(updatedMembers);
        } catch (err) {
            console.error("Failed to remove member:", err);
        }
    };

 const handleDeleteTeam = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this team and all its data?");
  if (!confirmDelete) return;

  try {
    const teamId = YOUR_TEAM_ID_VARIABLE; // Make sure this variable is defined correctly

    // Step 1: Get all projects of this team
    const projectsRef = collection(db, "projects");
    const projectQuery = query(projectsRef, where("teamId", "==", teamId));
    const projectSnap = await getDocs(projectQuery);

    const allTaskDeletes = [];
    const allProjectDeletes = [];

    for (const proj of projectSnap.docs) {
      const projectId = proj.id;

      // Step 2: Get all tasks for this project
      const tasksRef = collection(db, "tasks");
      const taskQuery = query(tasksRef, where("projectId", "==", projectId));
      const taskSnap = await getDocs(taskQuery);

      // Step 3: Delete all tasks
      taskSnap.docs.forEach(taskDoc => {
        allTaskDeletes.push(deleteDoc(doc(db, "tasks", taskDoc.id)));
      });

      // Step 4: Delete the project
      allProjectDeletes.push(deleteDoc(doc(db, "projects", projectId)));
    }

    // Step 5: Remove teamId from current user's document
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      teamId: deleteField()
    });

    // Step 6: Delete all tasks & projects
    await Promise.all([...allTaskDeletes, ...allProjectDeletes]);

    // Step 7: Delete the team document itself
    await deleteDoc(doc(db, "teams", teamId));

    // Notify and update UI
    toast.success("Team and all related data deleted!");
    toggleSettings(); // Optional: close modal or UI
  } catch (error) {
    console.error("Error deleting team:", error);
    toast.error("Failed to delete team!");
  }
};

    const handleRename = async () => {
        if (!teamNameState.trim()) return;
        try {
            setUpdatingName(true);
            await updateDoc(doc(db, 'teams', teamId), {
                teamName: teamNameState.trim()
            });
        } catch (err) {
            console.error('Error updating team name:', err);
        } finally {
            setUpdatingName(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] bg-slate-50 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-8 w-full">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-xl font-bold text-gray-700">Team Settings</h2>
                    <RxCross2 onClick={toggleSettings} className="h-5 w-5 cursor-pointer hover:rotate-90 transition duration-300" />
                </div>

                {/* Rename Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={teamNameState}
                            onChange={(e) => setTeamNameState(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleRename}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={updatingName}
                        >
                            {updatingName ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200 overflow-y-auto max-h-60 shadow-inner border rounded-lg p-1">
                        {usersData.map((user, index) => {
                            const isCurrentUser = user.uid === currentUserId;
                            return (
                                <li key={index} className="py-3 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 font-bold text-sm uppercase overflow-hidden">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                (user.name || user.uid).substring(0, 2).toUpperCase()
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {isCurrentUser ? 'You' : user.name || 'Unknown User'}
                                            </p>
                                            <p className="text-sm text-gray-500">{user.email || user.uid}</p>
                                        </div>
                                    </div>
                                    {isCreator && !isCurrentUser && (
                                        <button
                                            onClick={() => handleRemoveMember(user.uid)}
                                            className="text-red-600 mr-2 hover:underline "
                                        >
                                            Remove
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
                {isCreator && (
                    <div className="mt-4 text-center ">
                        <p onClick={handleDeleteTeam} className="text-red-500 text-sm cursor-pointer hover:underline  transition"                        >
                            Click here to delete the team
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TeamSettings;
