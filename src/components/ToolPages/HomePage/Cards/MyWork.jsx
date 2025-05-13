import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { auth, db } from "../../../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { MdTaskAlt } from "react-icons/md";
import RemoveCardMenu from './RemoveCardMenu';
import { IoFlagOutline } from "react-icons/io5";

const MyWork = ({removeCard}) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [activeTaskTab, setActiveTaskTab] = useState("todo");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleCard = () => setIsCardOpen(!isCardOpen);

  // ✅ Real-time fetch tasks from Firebase
  useEffect(() => {
    if (!auth.currentUser) return;

    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("assignedTo", "==", auth.currentUser.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedTasks = [];
      querySnapshot.forEach((doc) => {
        fetchedTasks.push({ id: doc.id, ...doc.data() });
      });
      setTasks(fetchedTasks);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Map tab keys to Firebase status values
  const statusMap = {
    todo: "to do",
    progress: "in progress",
    completed: "completed",
  };

  // ✅ Filter based on current tab
  const filteredTasks = tasks.filter(
    (task) => task.status?.toLowerCase() === statusMap[activeTaskTab]
  );

  return (
    <div className="h-72 border py-1 px-4 border-gray-300 rounded-xl bg-gray-200 shadow-lg shadow-gray-300 overflow-auto">
      <div className="h-[15%] border-b border-gray-300 font-medium justify-between flex items-center">
        <p>My Work</p>
        <PiDotsThreeOutlineThin className={`hover:text-black hover:text-xl ${isCardOpen && "text-black text-xl"} cursor-pointer text-gray-500`} onClick={toggleCard} />
      </div>

      {/* Task Tabs */}
      <div className="p-2">
        <div className="flex space-x-6 border-b mb-4">
          {["todo", "In progress", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTaskTab(tab)}
              className={`pb-2 px-4 font-medium border-b-2  transition-colors duration-200 ${activeTaskTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-600 hover:text-black"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Task Content */}
        <div className="space-y-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500">Loading...</p>
            </div>) : null}
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-2 rounded shadow text-sm space-y-1"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>
                    <MdTaskAlt />
                  </span>{" "}
                  {/* or replace with a React icon */}
                  <h3 className="font-semibold">{task.title}</h3>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-white text-xs ${task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                        ? "bg-yellow-500 text-black"
                        : "bg-green-500"
                    }`}
                >
                  <IoFlagOutline className="text-sm" />
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>
              </div>
              <p className="text-gray-600">{task.description}</p>
            </div>
          ))}
        </div>
      </div>

      {isCardOpen && (
        <>
          <RemoveCardMenu toggleCard={toggleCard} isCardOpen={isCardOpen}  removeCard={removeCard} cardName="My Work" />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}
    </div>
  );
};

export default MyWork;
