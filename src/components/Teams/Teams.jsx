import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import TeamList from './TeamList';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import TeamForm from './TeamForm';
import TasksList from '../Task/TasksList';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from './BreadCrumb';
import { useNavigate } from 'react-router-dom';
import { CiSettings } from "react-icons/ci";
import TeamSettings from './TeamSettings';


const Teams = () => {
    const [teams, setTeams] = useState([]), [projects, setProjects] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null), [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [isCreator, setIsCreator] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [showProjectForm, setShowProjectForm] = useState(false), [showTeamForm, setShowTeamForm] = useState(false);
    const [error, setError] = useState(''), [firebaseError, setFirebaseError] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            if (!auth.currentUser) return;
            try {
                const q = query(collection(db, 'teams'), where("members", "array-contains", auth.currentUser.uid));
                const snapshot = await getDocs(q);
                setTeams(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching teams:", error);
                const msg = {
                    'permission-denied': "You do not have permission to access this resource.",
                    'unavailable': "Cannot connect to server. Please check your internet connection."
                }[error.code] || "Something went wrong. Please try again later.";
                setFirebaseError(msg);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const toggleSettings = () => setShowSettings(!showSettings);


    const fetchProjects = async (team) => {
        setProjects([]);
        setLoading(true);
        setIsCreator(auth.currentUser?.uid === team.createdBy);
        try {
            const q = query(collection(db, 'projects'), where("teamId", "==", team.id));
            const snapshot = await getDocs(q);
            setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async () => {
        if (!projectName.trim()) return setError("Project name cannot be empty.");
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
            setProjects(prev => [...prev, { id: docRef.id, ...newProject }]);
            setProjectName('');
            setShowProjectForm(false);
            setError('');
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };
    const handleProjectClick = (project) => {
        setSelectedProject(project);
        const params = new URLSearchParams(location.search);
        params.set("projectId", project.id);
        navigate({ search: params.toString() }, { replace: true });
    };

    const handleTeamClick = async (team) => {
        setSelectedTeam(team);
        setProjects([]);
        setShowProjectForm(false);
        fetchProjects(team);
        setTeamMembers(team.members);
    };


    const handleProjectDeleted = (id) => setProjects(prev => prev.filter(p => p.id !== id));
    const handleTeamCreated = (team) => { setTeams(prev => [...prev, team]); setShowTeamForm(false); };

    return (
        <div className="p-3 shadow-inner border h-full bg-gray-50">
            <h2 className="relative  text-center mb-3 bg-gray-100 shadow-md p-5 rounded-lg overflow-hidden">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-black to-blue-400 animate-shimmer bg-[length:200%_auto]">
                    Team Space</p>
                <svg className="absolute top-0 left-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 20 C30 0, 60 40, 90 20 S150 0, 180 20 S240 40, 270 20" stroke="#A855F7" strokeWidth="4" fill="none" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-full h-full opacity-20 rotate-180" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 20 C30 0, 60 40, 90 20 S150 0, 180 20 S240 40, 270 20" stroke="#A855F7" strokeWidth="4" fill="none" />
                </svg>
            </h2>
            <Breadcrumb selectedTeam={selectedTeam} selectedProject={selectedProject}
                onBackToTeams={() => { setSelectedTeam(null); setSelectedProject(null); setIsCreator(false); }}
                onBackToProjects={() => { setSelectedProject(null); }} />

            {loading ? (
                <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 mt-48 border-blue-500"></div>
                </div>
            ) : selectedTeam ? (
                <div>
                    {!selectedProject ? (
                        <div className="flex justify-end items-center mt-[-25px]">
                            {isCreator && (
                                <div className="flex gap-2 items-center justify-center">
                                    <button onClick={() => setShowProjectForm(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition mb-4">
                                        Create Project
                                    </button>
                                    <div className='h-7 border-r-2 mb-4'></div>
                                    <CiSettings className='mb-4 h-7 w-7  rounded p-[2px] cursor-pointer hover:bg-gray-100' onClick={toggleSettings} />
                                    {showSettings && (
                                        <TeamSettings teamId={selectedTeam.id} teamName={selectedTeam.teamName} teamMembers={teamMembers} toggleSettings={toggleSettings} />
                                    )}
                                </div>
                            )}
                        </div>) : null}
                    <AnimatePresence mode="wait">
                        {!selectedProject && (
                            <motion.div key="projectList" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}                            >
                                <ProjectList projects={projects} isCreator={isCreator} onProjectDeleted={handleProjectDeleted} onProjectClick={handleProjectClick} />
                            </motion.div>
                        )}

                        {selectedProject && (
                            <motion.div key="tasksList" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}  >
                                <TasksList />
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {isCreator && showProjectForm && (
                        <ProjectForm projectName={projectName} setProjectName={setProjectName} error={error} handleCreateProject={handleCreateProject} />
                    )}
                </div>
            ) : firebaseError ? (
                <div className="h-[80%] flex justify-center items-center">
                    <div className="text-gray-500 flex flex-col space-y-3">
                        <p className="text-lg font-semibold">{firebaseError}</p>
                    </div>
                </div>
            ) : teams.length === 0 ? (
                <div className="h-[80%] flex justify-center items-center">
                    {!showTeamForm ? (
                        <div className="text-gray-500 flex flex-col space-y-3">
                            <p className="text-lg font-semibold">You are not part of any team yet. 🚀</p>
                            <p className="text-sm">Create a new team or ask an admin to add you to one.</p>
                            <button onClick={() => setShowTeamForm(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                                Create a Team
                            </button>
                        </div>
                    ) : <TeamForm onTeamCreated={handleTeamCreated} />}
                </div>
            ) : <TeamList teams={teams} onTeamSelect={handleTeamClick} />}
        </div>
    );
};

export default Teams;
