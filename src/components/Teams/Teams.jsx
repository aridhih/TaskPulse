import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, Timestamp, getDoc, doc } from 'firebase/firestore';
import BreadCrumb from './BreadCrumb';
import TeamList from './TeamList';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import TeamForm from './TeamForm';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [projects, setProjects] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [isCreator, setIsCreator] = useState(false);
    const [showTeamForm, setShowTeamForm] = useState(false);
    const [firebaseError, setFirebaseError] = useState(null);


    useEffect(() => {
        const fetchTeams = async () => {
            if (!auth.currentUser) return;
            try {
                // Query to get teams where the logged-in user is a member
                const q = query(collection(db, 'teams'), where("members", "array-contains", auth.currentUser.uid));
                const teamsSnapshot = await getDocs(q);
                const teamsList = teamsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setTeams(teamsList); // Teams ko state me update kar diya
            } catch (error) {
                console.error("Error fetching teams:", error);
                if (error.code === 'permission-denied') {
                    setFirebaseError("You do not have permission to access this resource.");
                } else if (error.code === 'unavailable') {
                    setFirebaseError("Cannot connect to server. Please check your internet connection.");
                } else {
                    setFirebaseError("Something went wrong. Please try again later.");
                }
            }
            
            finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);




    const fetchProjects = async (team) => {
        setProjects([]); // Clear previous projects before fetching new ones
        setIsCreator(auth.currentUser?.uid === team.createdBy);

        try {
            const q = query(collection(db, 'projects'), where("teamId", "==", team.id));
            const projectsSnapshot = await getDocs(q);
            const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsList);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
        finally {
            setLoading(false);
        }
    };


    const handleTeamClick = (team) => {
        setSelectedTeam(team);
        setProjects([]);
        setShowProjectForm(false);
        setLoading(true);
        fetchProjects(team);
    };


    const [error, setError] = useState("");

    const handleCreateProject = async () => {
        if (!projectName.trim()) {
            setError("Project name cannot be empty.");
            return;
        }
        if (!auth.currentUser || !selectedTeam || !isCreator) return;

        try {
            const newProject = {
                projectName: projectName.trim(),
                teamId: selectedTeam.id,
                createdBy: auth.currentUser.uid,
                status: "active",
                deadline: Timestamp.fromDate(new Date()),
                createdAt: Timestamp.now()
            };

            const docRef = await addDoc(collection(db, 'projects'), newProject);
            setProjects([...projects, { id: docRef.id, ...newProject }]);
            setProjectName('');
            setShowProjectForm(false);
            setError(""); // Clear error on success
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    const handleProjectDeleted = (projectId) =>{
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId)); 
    }

    const handleTeamCreated = (newTeam) => {
        setTeams((prevTeams) => [...prevTeams, newTeam]); // Update teams list
        setShowTeamForm(false); // Hide form after creating a team
    };

    return (
        <div className="p-6 border h-full bg-gray-50">
            <h2 className="relative text-2xl font-bold text-center text-gray-700 mb-4 bg-gray-100 shadow-md p-5 rounded-lg overflow-hidden">
                Team Space
                <svg
                    className="absolute top-0 left-0 w-full h-full opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 20 C30 0, 60 40, 90 20 S150 0, 180 20 S240 40, 270 20"
                        stroke="#A855F7"
                        strokeWidth="4"
                        fill="none"
                    />
                </svg>
                <svg
                    className="absolute bottom-0 right-0 w-full h-full opacity-20 rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 20 C30 0, 60 40, 90 20 S150 0, 180 20 S240 40, 270 20"
                        stroke="#A855F7"
                        strokeWidth="4"
                        fill="none"
                    />
                </svg>
            </h2>

            <BreadCrumb selectedTeam={selectedTeam} onBack={() => { setSelectedTeam(null); setIsCreator(false); }} />

            {loading ? (
                <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 mt-48 border-blue-500"></div>
                </div>
            ) : selectedTeam ? (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold mb-3">{selectedTeam.teamName} - Projects</h3>

                        {isCreator && (
                            <button
                                onClick={() => setShowProjectForm(true)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition mb-4"
                            >
                                Create Project
                            </button>
                        )}
                    </div>

                    <ProjectList projects={projects} isCreator={isCreator} onProjectDeleted={handleProjectDeleted} />

                    {isCreator && showProjectForm && (
                        <ProjectForm projectName={projectName} setProjectName={setProjectName} error={error} handleCreateProject={handleCreateProject} />
                    )}
                </div>
            ) : firebaseError ? ( 
                <div className="h-[80%] justify-center items-center flex">
                    <div className="text-gray-500 flex flex-col space-y-3">
                        <p className="text-lg font-semibold">{firebaseError}</p>
                    </div>
                </div>
            ) : teams.length === 0 ? (
                <div className='h-[80%] justify-center items-center flex'>

                    {!showTeamForm && (
                        <div className="text-gray-500  flex flex-col space-y-3">
                            <p className="text-lg font-semibold">You are not part of any team yet. 🚀</p>
                            <p className="text-sm">Create a new team or ask an admin to add you to one.</p>
                            <button
                                onClick={() => setShowTeamForm(true)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                            >
                                Create a Team
                            </button>
                        </div>
                    )}
                    {showTeamForm && <TeamForm onTeamCreated={handleTeamCreated} />}

                </div>
            ) : (
                <TeamList teams={teams} onTeamSelect={handleTeamClick} />
            )}
        </div>
    );
};

export default Teams;
