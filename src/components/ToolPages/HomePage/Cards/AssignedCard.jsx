import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import RemoveCardMenu from "./RemoveCardMenu";
import { auth, db } from "../../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { FaUsers } from "react-icons/fa";
import { GoFilter } from "react-icons/go";

const AssignedCard = ({ removeCard }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState(null);

  const toggleCard = () => setIsCardOpen(!isCardOpen);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    // Load previously selected team from localStorage
    const savedTeamId = localStorage.getItem("selectedTeam");
    if (savedTeamId) {
      setSelectedTeamFilter({ id: savedTeamId });
    }

    const fetchAssignedTasks = async () => {
      try {
        const tasksQuery = query(
          collection(db, "tasks"),
          where("assignedTo", "==", uid)
        );
        const snapshot = await getDocs(tasksQuery);
        const tasks = [];

        for (const docSnap of snapshot.docs) {
          const task = { id: docSnap.id, ...docSnap.data() };
          if (task.teamId) {
            const teamDoc = await getDoc(doc(db, "teams", task.teamId));
            task.teamName = teamDoc.exists()
              ? teamDoc.data().teamName
              : "Unknown Team";
          }
          tasks.push(task);
        }

        setAssignedTasks(tasks);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTeams = async () => {
      try {
        const teamQuery = query(
          collection(db, "teams"),
          where("members", "array-contains", uid)
        );
        const snapshot = await getDocs(teamQuery);
        const fetchedTeams = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeams(fetchedTeams);

        // After fetching teams, update selected team object from id
        if (savedTeamId) {
          const matched = fetchedTeams.find((t) => t.id === savedTeamId);
          if (matched) setSelectedTeamFilter(matched);
        }
      } catch (err) {
        console.error("Failed to fetch teams:", err);
      }
    };

    fetchAssignedTasks();
    fetchTeams();
  }, []);

  const handleTeamFilterClick = (team) => {
    setSelectedTeamFilter(team);
    localStorage.setItem("selectedTeam", team.id);
    setFilterPopupOpen(false);
  };

  const clearTeamFilter = () => {
    setSelectedTeamFilter(null);
    localStorage.removeItem("selectedTeam");
  };

  const filteredTasks = selectedTeamFilter
    ? assignedTasks.filter((task) => task.teamId === selectedTeamFilter.id)
    : assignedTasks;

  return (
    <div className="h-72 border border-gray-300 bg-gray-100 rounded-xl px-4 py-2">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 h-[15%]">
        <p className="font-medium">Assigned To Me</p>
        <div className="flex items-center gap-2">
          {/* 🔄 Filter icon (moved before dots icon) */}
          <div className="relative">
            <button
              onClick={() => setFilterPopupOpen(!filterPopupOpen)}
              className="text-gray-500 hover:text-black text-md mt-3 cursor-pointer"
            >
              <GoFilter />
            </button>

            {filterPopupOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg border border-gray-200 rounded-xl z-50">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleTeamFilterClick(team)}
                  >
                    <FaUsers className="text-gray-600 text-sm" />
                    <span className="text-sm text-gray-800">
                      {team.teamName}
                    </span>
                  </div>
                ))}
                {selectedTeamFilter && (
                  <div className="p-2 text-center border-t">
                    <button
                      onClick={clearTeamFilter}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Clear Filter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3-dot menu */}
          <PiDotsThreeOutlineThin
            className={`hover:text-black ${
              isCardOpen ? "text-black" : "text-gray-500"
            } text-xl cursor-pointer`}
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
            No tasks{" "}
            {selectedTeamFilter ? `for "${selectedTeamFilter.teamName}"` : ""}
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
          <RemoveCardMenu
            toggleCard={toggleCard}
            removeCard={removeCard}
            cardName="Assigned To Me"
          />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}
    </div>
  );
};

export default AssignedCard;
