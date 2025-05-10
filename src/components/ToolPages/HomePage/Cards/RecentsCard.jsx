import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import RemoveCardMenu from "./RemoveCardMenu";
import { auth, db } from "../../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

const RecentsCard = ({ removeCard }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleCard = () => setIsCardOpen(!isCardOpen);

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return "Unknown Date";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const fetchProjectsForUser = async () => {
      try {
        const teamsQuery = query(
          collection(db, "teams"),
          where("members", "array-contains", uid)
        );
        const teamSnapshot = await getDocs(teamsQuery);
        const teamIds = teamSnapshot.docs.map(doc => doc.id);

        if (teamIds.length === 0) {
          setProjects([]);
          setLoading(false);
          return;
        }

        const projectsQuery = query(
          collection(db, "projects"),
          where("teamId", "in", teamIds)
        );
        const projectSnapshot = await getDocs(projectsQuery);

        const fetchedProjects = [];
        for (const docSnap of projectSnapshot.docs) {
          const project = { id: docSnap.id, ...docSnap.data() };
          if (project.teamId) {
            const teamDoc = await getDoc(doc(db, "teams", project.teamId));
            project.teamName = teamDoc.exists()
              ? teamDoc.data().teamName
              : "Unknown Team";
          }
          fetchedProjects.push(project);
        }

        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsForUser();
  }, []);

  return (
    <div className="h-72 border border-gray-300 bg-gray-100 rounded-xl px-4 py-2">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 h-[15%]">
        <p className="font-medium">My Projects</p>
        <PiDotsThreeOutlineThin
          className={`hover:text-black ${isCardOpen ? "text-black" : "text-gray-500"} text-xl cursor-pointer`}
          onClick={toggleCard}
        />
      </div>

      {/* Projects */}
      <div className="h-[80%] overflow-y-auto mt-2 px-1">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-500">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">No projects assigned to you.</div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white p-2 mb-2 rounded-lg border hover:shadow transition-shadow">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">{project.projectName}</h3>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  {project.teamName}
                </span>
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                Created At: {formatDate(project.createdAt)}
              </div>
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
            cardName="Recent Projects"
          />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}
    </div>
  );
};

export default RecentsCard;
