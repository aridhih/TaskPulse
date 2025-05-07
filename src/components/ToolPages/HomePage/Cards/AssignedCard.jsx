import React, { useState, useEffect } from 'react';
import { PiDotsThreeOutlineThin } from 'react-icons/pi';
import RemoveCardMenu from './RemoveCardMenu';
import { auth, db } from '../../../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const AssignedCard = ({ removeCard }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      try {
        const tasksRef = collection(db, 'tasks');
        const q = query(tasksRef, where('assignedTo', '==', uid));
        const snapshot = await getDocs(q);
        const tasksData = [];

        for (const docSnap of snapshot.docs) {
          const taskData = { id: docSnap.id, ...docSnap.data() };

          // Fetch related team name using task.teamId
          if (taskData.teamId) {
            const teamDoc = await getDoc(doc(db, 'teams', taskData.teamId));
            taskData.teamName = teamDoc.exists() ? teamDoc.data().teamName : 'Unknown Team';
          } else {
            taskData.teamName = 'Unknown Team';
          }

          tasksData.push(taskData);
        }

        setAssignedTasks(tasksData);
      } catch (err) {
        console.error('Error fetching assigned tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTasks();
  }, [auth.currentUser?.uid]);

  return (
    <div className='h-72 border py-1 px-4 border-gray-300 rounded-xl bg-gray-200'>
      <div className="h-[15%] border-b border-gray-300 font-medium justify-between flex items-center">
        <p>Assigned To Me</p>
        <PiDotsThreeOutlineThin
          className={`hover:text-black hover:text-xl ${isCardOpen && 'text-black text-xl'} cursor-pointer text-gray-500`}
          onClick={toggleCard}
        />
      </div>

      <div className='h-[80%] overflow-y-auto px-1'>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent animate-spin rounded-full"></div>
          </div>
        ) : assignedTasks.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-600">
            There is no task assigned to you
          </div>
        ) : (
          assignedTasks.map(task => (
            <div key={task.id} className="bg-white p-2 my-2 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold text-gray-800">{task.title}</h3>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{task.teamName}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            </div>
          ))
        )}
      </div>

      {isCardOpen && (
        <>
          <RemoveCardMenu toggleCard={toggleCard} removeCard={removeCard} cardName="Assigned To Me" />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}
    </div>
  );
};

export default AssignedCard;
