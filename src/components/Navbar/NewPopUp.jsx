import { useEffect, useState } from "react";
import CreateTaskForm from "../Task/CreateTaskForm";
import { useUser } from "../Layout/UserContext";
import { db } from "../../firebase";
import { collection, getDocs, query, where, doc, getDoc, documentId } from "firebase/firestore";


const TABS = ['Task'];


const NewPopUp = ({ toggleNewPopup, activeTab, setActiveTab }) => {
  const user = useUser();
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const team = user?.teamId;
    const fetchProjects = async (team) => {
      try {
        const q = query(collection(db, 'projects'), where("teamId", "==", team));
        const projectsSnapshot = await getDocs(q);
        const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects(team);




    const fetchTeamMembers = async (teamId) => {
      try {
        const teamRef = doc(db, "teams", teamId);
        const teamSnap = await getDoc(teamRef);

        if (teamSnap.exists()) {
          const { members = [] } = teamSnap.data();
          if (members.length === 0) return setTeamMembers([]);

          const chunkSize = 10;
          let allUsers = [];

          for (let i = 0; i < members.length; i += chunkSize) {
            const chunk = members.slice(i, i + chunkSize);
            const q = query(collection(db, "users"), where(documentId(), "in", chunk));
            const snapshot = await getDocs(q);

            const users = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));

            allUsers = allUsers.concat(users);
          }

          setTeamMembers(allUsers);
        } else {
          console.warn("No such team exists!");
          setTeamMembers([]);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };



    fetchTeamMembers(team);

  }, []);

  return (

    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[555px] p-6 relative">
        <button onClick={toggleNewPopup} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold">×</button>

        <div className="flex items-center border-b mb-4">
          {TABS.map((tab) => {
            const key = tab.toLowerCase();
            const isActive = activeTab === key;
            return (
              <button key={tab} onClick={() => setActiveTab(isActive ? null : key)}
                className={`px-4 py-2 text-sm font-medium border-b-2 focus:outline-none ${isActive ? 'text-blue-600 border-blue-600' : 'text-gray-700 border-transparent hover:text-blue-600'
                  }`}>
                {tab}
              </button>
            );
          })}
        </div>

        {activeTab === 'task' && (
          projects.length === 0 ? (
            <div className="text-center h-[80%] flex justify-center items-center text-gray-500">Create your team to assign tasks</div>
          ) : (
            <CreateTaskForm
              toggleNewPopup={toggleNewPopup}
              projects={projects}
              teamId={user?.teamId}
              users={teamMembers}
            />
          )
        )}



      </div>
    </div>
  );
};

export default NewPopUp;
