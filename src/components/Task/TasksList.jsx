import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TasksList = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignedUsers, setAssignedUsers] = useState({});
  const [loadingUsers, setLoadingUsers] = useState([]);



  const projectId = searchParams.get('projectId');

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

        const fetchAssignedUsers = async (tasksData) => {
          const uniqueUIDs = [...new Set(tasksData.map(task => task.assignedTo).filter(Boolean))];
          const usersData = {};
          setLoadingUsers(uniqueUIDs);

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

          setAssignedUsers(usersData);
          setLoadingUsers([]);
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

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.index === source.index) return;

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


  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const statuses = ['To Do', 'In Progress', 'Completed'];

  return (
    <div className="mt-4">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 mt-48 border-blue-500"></div>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-4">
            {statuses.map(status => (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-1/3 bg-white rounded-lg p-4 shadow-inner h-[380px] border overflow-y-auto transition-colors duration-300 ease-in-out ${snapshot.isDraggingOver ? 'bg-blue-100 border-blue-400 shadow-lg' : ''}                    `}
                  >
                    <h2 className="text-xl font-bold mb-2">{status}</h2>
                    {getTasksByStatus(status).map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-gray-50 p-4 mb-2 rounded shadow border-l-4 ${snapshot.isDragging ? 'bg-blue-200' : ''
                              } ${new Date(task.deadline) < new Date()
                                ? 'border-red-500'
                                : new Date(task.deadline) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                                  ? 'border-yellow-400'
                                  : 'border-green-400'
                              }`}
                          >

                            <div className="font-semibold text-lg">{task.title}</div>
                            <div className="text-gray-600 mb-1">{task.description}</div>

                            {/* Deadline display */}
                            {task.deadline && (
                              <div className="text-sm mb-1 text-gray-500">
                                ⏰ Deadline:{" "}
                                <span className={new Date(task.deadline) < new Date() ? "text-red-500" : "text-green-600"}>
                                  {new Date(task.deadline).toLocaleDateString()}
                                </span>
                              </div>
                            )}

                            {/* Priority indicator */}
                            <div className="text-sm mb-1">
                              Priority:{" "}
                              <span
                                className={`px-2 py-0.5 rounded text-white ${task.priority === 'high'
                                  ? 'bg-red-600'
                                  : task.priority === 'medium'
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                                  }`}
                              >
                                {task.priority}
                              </span>
                            </div>

                            {/* Assigned user */}
                            {task.assignedTo && (
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                Assigned to:
                                {loadingUsers.includes(task.assignedTo) ? (
                                  <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent animate-spin rounded-full"></div>
                                ) : assignedUsers[task.assignedTo] ? (
                                  assignedUsers[task.assignedTo].photoURL ? (
                                    <img
                                      src={assignedUsers[task.assignedTo].photoURL}
                                      alt="User"
                                      className="w-6 h-6 rounded-full object-cover"
                                      title={assignedUsers[task.assignedTo].name.toUpperCase()}
                                    />
                                  ) : (
                                    <div
                                      className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                      title={assignedUsers[task.assignedTo].name.toUpperCase()}
                                    >
                                      {assignedUsers[task.assignedTo].name
                                        .split(' ')
                                        .map(n => n[0])
                                        .join('')
                                        .toUpperCase()}
                                    </div>
                                  )
                                ) : null}
                              </div>
                            )}



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
