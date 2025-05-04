import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { db } from '../../firebase'; 
import {  collection, query, where, getDocs} from 'firebase/firestore';

const TasksList = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  
  const tasksRef = collection(db, 'tasks');
  
   const fetchTasks = async (projectId) => {
    const q = query(tasksRef, where('projectId', '==', projectId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const projectId = searchParams.get('projectId');

  const loadTasks = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const data = await fetchTasks(projectId);
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (projectId) loadTasks(); }, [location.search]);


  if (!projectId) return null;

  return (
    <div className="mt-4">

      {/* Tasks List */}
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 mt-48 border-blue-500"></div>
        </div>
      ) : tasks.length ? (
        <ul className="space-y-2 bg-white rounded-lg p-4 shadow-inner  h-[380px] border overflow-y-auto">
          {tasks.map(task => (
            <li key={task.id} className="bg-gray-50 p-4 hover:bg-gray-100 rounded shadow relative">
                <>
                  <div className="font-semibold text-lg">{task.title}</div>
                  <div className="text-gray-600 mb-1">{task.description}</div>
                  <div className="text-sm text-gray-500 mb-2">Status: {task.status} | Priority: {task.priority}</div>
                </>
              
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No tasks found for this project.</p>
      )}
    </div>
  );
};

export default TasksList;
