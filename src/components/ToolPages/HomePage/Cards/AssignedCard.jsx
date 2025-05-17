import React, { useState, useEffect, useCallback } from "react";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { GoFilter } from "react-icons/go";
import { auth, db } from "../../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import RemoveCardMenu from "./RemoveCardMenu";

const AssignedCard = ({ removeCard }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const uid = auth.currentUser?.uid;

  const toggleCard = () => setIsCardOpen(prev => !prev);

  // Load selected team from localStorage
  useEffect(() => {
    const savedTeamId = localStorage.getItem("selectedTeam");
    if (savedTeamId) setSelectedTeam({ id: savedTeamId });
  }, []);

  // Fetch tasks assigned to current user
  const fetchAssignedTasks = useCallback(async () => {
    if (!uid) return;
    setLoading(true);
    try {
      const tasksQuery = query(collection(db, "tasks"), where("assignedTo", "==", uid));
      const snapshot = await getDocs(tasksQuery);

      const taskPromises = snapshot.docs.map(async (docSnap) => {
        const task = { id: docSnap.id, ...docSnap.data() };
        if (task.teamId) {
          const teamDoc = await getDoc(doc(db, "teams", task.teamId));
          task.teamName = teamDoc.exists() ? teamDoc.data().teamName : "Unknown Team";
        }
        return task;
      });

      const tasks = await Promise.all(taskPromises);
      setAssignedTasks(tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [uid]);

  // Fetch teams user is part of
  const fetchTeams = useCallback(async () => {
    if (!uid) return;
    try {
      const teamQuery = query(collection(db, "teams"), where("members", "array-contains", uid));
      const snapshot = await getDocs(teamQuery);
      const fetchedTeams = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeams(fetchedTeams);

      const savedTeamId = localStorage.getItem("selectedTeam");
      if (savedTeamId) {
        const matched = fetchedTeams.find((t) => t.id === savedTeamId);
        if (matched) setSelectedTeam(matched);
      }
    } catch (err) {
      console.error("Error fetching teams:", err);
    }
  }, [uid]);

  useEffect(() => {
    fetchAssignedTasks();
    fetchTeams();
  }, [fetchAssignedTasks, fetchTeams]);

  // Handle filter selection
  const handleTeamFilter = (team) => {
    setSelectedTeam(team);
    localStorage.setItem("selectedTeam", team.id);
    setFilterPopupOpen(false);
  };

  const clearFilter = () => {
    setSelectedTeam(null);
    localStorage.removeItem("selectedTeam");
  };

  const filteredTasks = selectedTeam
    ? assignedTasks.filter((task) => task.teamId === selectedTeam.id)
    : assignedTasks;

  return (
    <div className="h-72 border border-gray-300 bg-gray-100 rounded-xl px-4 py-2">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 h-[15%]">
        <p className="font-medium">Assigned To Me</p>
        <div className="flex items-center gap-2">
          {/* Filter */}
          <div className="relative">
            <button
              onClick={() => setFilterPopupOpen(prev => !prev)}
              className="text-gray-500 hover:text-black mt-3"
            >
              <GoFilter />
            </button>

            {filterPopupOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg border border-gray-200 rounded-xl z-50">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleTeamFilter(team)}
                  >
                    <FaUsers className="text-gray-600 text-sm" />
                    <span className="text-sm text-gray-800">{team.teamName}</span>
                  </div>
                ))}
                {selectedTeam && (
                  <div className="p-2 text-center border-t">
                    <button
                      onClick={clearFilter}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Clear Filter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3-dot Menu */}
          <PiDotsThreeOutlineThin
            className={`hover:text-black ${isCardOpen ? "text-black" : "text-gray-500"} text-xl cursor-pointer`}
            onClick={toggleCard}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="h-[80%] overflow-y-auto mt-2 px-1">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            Loading...
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            No tasks {selectedTeam ? `for "${selectedTeam.teamName}"` : ""}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-2 mb-2 rounded-lg border hover:shadow transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">{task.title}</h3>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  {task.teamName}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Remove Card */}
      {isCardOpen && (
        <>
          <RemoveCardMenu toggleCard={toggleCard} removeCard={removeCard} cardName="Assigned To Me" />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}
    </div>
  );
};

export default AssignedCard;
