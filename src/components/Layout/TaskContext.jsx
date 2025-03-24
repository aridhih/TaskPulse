import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch All Tasks (Real-time Listener)
  useEffect(() => {
    const q = collection(db, "tasks");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // 🔹 Fetch Tasks by Project
  const fetchTasksByProject = async (projectId) => {
    const q = query(collection(db, "tasks"), where("projectId", "==", projectId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  // 🔹 Fetch Tasks by Team
  const fetchTasksByTeam = async (teamId) => {
    const q = query(collection(db, "tasks"), where("teamId", "==", teamId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  // 🔹 Fetch Tasks by User
  const fetchTasksByUser = async (userId) => {
    const q = query(collection(db, "tasks"), where("assignee", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  // 🔹 Add New Task
  const addTask = async (taskData) => {
    await addDoc(collection(db, "tasks"), taskData);
  };

  // 🔹 Update Task
  const updateTask = async (taskId, updatedData) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedData);
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasksByProject, fetchTasksByTeam, fetchTasksByUser, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom Hook for Task Context
export const useTasks = () => useContext(TaskContext);
