import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TasksList = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [loadingUserIds, setLoadingUserIds] = useState([]);

  const projectId = searchParams.get('projectId');

  // Fetch tasks and assigned users
  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) return;
      setLoading(true);
      try {
        const tasksRef = collection(db, 'tasks');
        const q = query(tasksRef, where('projectId', '==', projectId));
        const snapshot = await getDocs(q);
        const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);

        // Fetch assigned users
        const fetchAssignedUsers = async (tasksData) => {
          const uniqueUIDs = [...new Set(tasksData.map(task => task.assignedTo).filter(Boolean))];
          const usersData = {};
          setLoadingUserIds(uniqueUIDs);

          // Gather users and update once all users are fetched
          for (const uid of uniqueUIDs) {
            try {
              const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));
              if (!userDoc.empty) {
                const user = userDoc.docs[0].data();
                usersData[uid] = { name: user.name || 'Unknown', photoURL: user.photoURL || '' };
              }
            } catch (err) {
              console.error(`Error fetching user ${uid}:`, err);
            }
          }
          setUserDetails(usersData);
          setLoadingUserIds([]);  // Update once all users are fetched
        };

        fetchAssignedUsers(tasksData);

      } catch (err) {
        console.error("Error loading tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, location.search]);

  // Handle task drag and drop
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) return;

    const task = tasks.find(t => t.id === draggableId);
    if (!task) {
      console.warn("Task not found for ID:", draggableId);
      return;
    }

    const updatedTask = { ...task, status: destination.droppableId };

    try {
      const taskRef = doc(db, 'tasks', draggableId);
      await updateDoc(taskRef, {
        status: destination.droppableId
      });

      setTasks(prev =>
        prev.map(t => (t.id === draggableId ? updatedTask : t))
      );

    } catch (err) {
      console.error("❌ Firestore update failed:", err.message);
    }
  };

  // Handle manual status change
  const handleStatusChange = async (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      console.warn("Task not found for ID:", taskId);
      return;
    }

    const updatedTask = { ...task, status: newStatus };

    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, { status: newStatus });

      setTasks(prev =>
        prev.map(t => (t.id === taskId ? updatedTask : t))
      );

    } catch (err) {
      console.error("❌ Firestore update failed:", err.message);
    }
  };

  // Memoize tasks by status
  const tasksByStatus = useMemo(() => {
    const tasksByStatus = {};
    const statuses = ['To Do', 'In Progress', 'Completed'];
    statuses.forEach(status => {
      tasksByStatus[status] = tasks.filter(task => task.status === status);
    });
    return tasksByStatus;
  }, [tasks]);

  // Task priority colors
  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  return (
    <div className="mt-4">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 mt-48 border-blue-500"></div>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-4">
            {['To Do', 'In Progress', 'Completed'].map(status => (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-1/3 bg-white rounded-lg p-4 shadow-lg h-[380px] border overflow-y-auto transition-colors duration-300 ease-in-out ${snapshot.isDraggingOver ? 'bg-blue-100 border-blue-400 shadow-xl' : ''}`}
                  >
                    <h2 className="text-lg font-medium text-gray-800 mb-2">{status}</h2>
                    {tasksByStatus[status].map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-gray-50 p-3 mb-3 rounded-lg shadow-sm border-l-4 border-gray-300 transition-all ease-in-out transform hover:scale-105 hover:shadow-lg ${snapshot.isDragging ? 'bg-blue-200' : ''}`}
                          >
                            <div className="font-medium text-sm text-gray-900">{task.title}</div>
                            <div className="text-sm text-gray-500 mb-1">{task.description}</div>

                            {/* Deadline display */}
                            {task.deadline && (
                              <div className="text-xs text-gray-400 mb-1">
                                ⏰ Deadline:{" "}
                                <span className={new Date(task.deadline) < new Date() ? "text-red-500" : "text-green-600"}>
                                  {new Date(task.deadline).toLocaleDateString()}
                                </span>
                              </div>
                            )}

                            {/* Priority indicator */}
                            <div className="text-xs mb-1">
                              Priority:{" "}
                              <span
                                className={`px-2 py-0.5 rounded text-white ${priorityColors[task.priority] || 'bg-gray-500'}`}
                              >
                                {task.priority}
                              </span>
                            </div>

                            {/* Assigned user */}
                            {task.assignedTo && (
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                                Assigned to:
                                {loadingUserIds.includes(task.assignedTo) ? (
                                  <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent animate-spin rounded-full"></div>
                                ) : userDetails[task.assignedTo] ? (
                                  userDetails[task.assignedTo].photoURL ? (
                                    <img
                                      src={userDetails[task.assignedTo].photoURL}
                                      alt="User"
                                      className="w-5 h-5 rounded-full object-cover"
                                      title={userDetails[task.assignedTo].name.toUpperCase()}
                                    />
                                  ) : (
                                    <div
                                      className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                      title={userDetails[task.assignedTo].name.toUpperCase()}
                                    >
                                      {userDetails[task.assignedTo].name
                                        .split(' ')
                                        .map(n => n[0])
                                        .join('')
                                        .toUpperCase()}
                                    </div>
                                  )
                                ) : null}
                              </div>
                            )}

                            {/* Manual status change */}
                            <div className="mt-2">
                              <label htmlFor={`status-select-${task.id}`} className="text-xs text-gray-500">Change Status</label>
                              <select
                                id={`status-select-${task.id}`}
                                value={task.status}
                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                className="mt-1 p-1 border rounded-md w-full text-sm"
                              >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default TasksList;
