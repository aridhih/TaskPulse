import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { GoFilter } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import RemoveCardMenu from "./RemoveCardMenu";
import { auth, db } from "../../../../firebase";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";

const RecentsCard = ({ removeCard }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState(null);
  const [projectProgress, setProjectProgress] = useState({});

  const toggleCard = () => setIsCardOpen(!isCardOpen);
  const formatDate = (timestamp) => !timestamp?.toDate ? "Unknown Date" : timestamp.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const calculateProjectProgress = async (projectId) => {
    try {
      const taskQuery = query(collection(db, "tasks"), where("projectId", "==", projectId));
      const snapshot = await getDocs(taskQuery);
      const tasks = snapshot.docs.map(doc => doc.data());
      if (!tasks.length) return 0;
      const doneCount = tasks.filter(task => task.status === "Completed").length;
      return Math.round((doneCount / tasks.length) * 100);
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const savedTeamId = localStorage.getItem("recentTeamFilter");
    if (savedTeamId) setSelectedTeamFilter({ id: savedTeamId });

    const fetchData = async () => {
      try {
        const teamSnapshot = await getDocs(query(collection(db, "teams"), where("members", "array-contains", uid)));
        const teamList = teamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeams(teamList);
        if (savedTeamId) {
          const match = teamList.find(t => t.id === savedTeamId);
          if (match) setSelectedTeamFilter(match);
        }
        const teamIds = teamList.map(t => t.id);
        if (!teamIds.length) return setLoading(false);
        const projectSnapshot = await getDocs(query(collection(db, "projects"), where("teamId", "in", teamIds)));
        const fetchedProjects = [];
        for (const snap of projectSnapshot.docs) {
          const project = { id: snap.id, ...snap.data() };
          if (project.teamId) {
            const teamDoc = await getDoc(doc(db, "teams", project.teamId));
            project.teamName = teamDoc.exists() ? teamDoc.data().teamName : "Unknown Team";
          }
          fetchedProjects.push(project);
        }
        setProjects(fetchedProjects);

        const progressMap = {};
        await Promise.all(fetchedProjects.map(async (proj) => {
          const progress = await calculateProjectProgress(proj.id);
          progressMap[proj.id] = progress;
        }));
        setProjectProgress(progressMap);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTeamFilterClick = (team) => {
    setSelectedTeamFilter(team);
    localStorage.setItem("recentTeamFilter", team.id);
    setFilterPopupOpen(false);
  };

  const clearTeamFilter = () => {
    setSelectedTeamFilter(null);
    localStorage.removeItem("recentTeamFilter");
  };

  const filteredProjects = selectedTeamFilter ? projects.filter(p => p.teamId === selectedTeamFilter.id) : projects;

  return (
    <div className="h-72 border border-gray-300 bg-gray-100 rounded-xl px-4 py-2">
      <div className="flex justify-between items-center border-b border-gray-300 h-[15%]">
        <p className="font-medium">My Projects</p>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setFilterPopupOpen(!filterPopupOpen)} className="text-gray-500 hover:text-black text-md mt-3 cursor-pointer">
              <GoFilter />
            </button>
            {filterPopupOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg border border-gray-200 rounded-xl z-50">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleTeamFilterClick(team)}>
                    <FaUsers className="text-gray-600 text-sm" />
                    <span className="text-sm text-gray-800">{team.teamName}</span>
                  </div>
                ))}
                {selectedTeamFilter && (
                  <div className="p-2 text-center border-t">
                    <button onClick={clearTeamFilter} className="text-xs text-red-500 hover:underline">Clear Filter</button>
                  </div>
                )}
              </div>
            )}
          </div>
          <PiDotsThreeOutlineThin className={`hover:text-black ${isCardOpen ? "text-black" : "text-gray-500"} text-xl cursor-pointer`} onClick={toggleCard} />
        </div>
      </div>

      <div className="h-[80%] overflow-y-auto mt-2 px-1">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-500">Loading...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            No projects {selectedTeamFilter ? `for "${selectedTeamFilter.teamName}"` : ""}
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="bg-white p-2 mb-2 rounded-lg border hover:shadow transition-shadow">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">{project.projectName}</h3>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{project.teamName}</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-1">Created At: {formatDate(project.createdAt)}</div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div className="bg-green-500 h-full rounded-full transition-all" style={{ width: `${projectProgress[project.id] || 0}%` }}></div>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">{projectProgress[project.id] || 0}% complete</p>
            </div>
          ))
        )}
      </div>

      {isCardOpen && (
        <>
          <RemoveCardMenu toggleCard={toggleCard} removeCard={removeCard} cardName="Recents" />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}
    </div>
  );
};

export default RecentsCard;
