import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const TaskList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  // Get projectId from query parameters
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get("projectId");

  useEffect(() => {
    if (!projectId) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "tasks"), where("projectId", "==", projectId));
        const taskSnapshot = await getDocs(q);
        const taskList = taskSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  // Filter tasks based on status
  const filteredTasks = statusFilter === "all" ? tasks : tasks.filter((task) => task.status === statusFilter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
          📋 Project Tasks
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex space-x-3 mb-4">
        {["all", "todo", "in-progress", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 text-sm rounded-md transition ${
              statusFilter === status ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status === "todo" && "📝"} 
            {status === "in-progress" && "⏳"} 
            {status === "completed" && "✅"} 
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{task.taskName}</h3>
                <p className="text-gray-500 text-sm">{task.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-md ${
                  task.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
