import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import PropTypes from 'prop-types';

const TaskListDetail = ({ task, assignedUser, onClose, onStatusChange }) => {
  const [creator, setCreator] = useState(null);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      // Fetch creator info
      if (task.createdBy) {
        const userSnap = await getDocs(
          query(collection(db, 'users'), where('uid', '==', task.createdBy))
        );
        if (!userSnap.empty) {
          setCreator(userSnap.docs[0].data());
        }
      }

      // Fetch team info
      if (task.teamId) {
        const teamSnap = await getDocs(
          query(collection(db, 'teams'), where('id', '==', task.teamId))
        );
        if (!teamSnap.empty) {
          const teamData = teamSnap.docs[0].data();
          setTeamName(teamData.name || '');
        }
      }
    };

    fetchDetails();
  }, [task]);

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative animate-fadeIn scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Details</h2>

        <div className="space-y-3 text-gray-700 text-sm">
          <p>
            <strong>Title:</strong> {task.title}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          <p>
            <strong>Priority:</strong>{' '}
            <span
              className={`inline-block px-2 py-0.5 rounded text-white text-xs ${priorityColors[task.priority] || 'bg-gray-500'}`}
            >
              {task.priority}
            </span>
          </p>
          {assignedUser && (
            <p>
              <strong>Assigned To:</strong> {assignedUser.name}
            </p>
          )}
          {creator && (
            <p>
              <strong>Created By:</strong> {creator.name}
            </p>
          )}
          {task.createdAt && (
            <p>
              <strong>Created On:</strong>{' '}
              {new Date(task.createdAt.seconds * 1000).toLocaleDateString()}
            </p>
          )}
          {task.deadline && (
            <p>
              <strong>End Date:</strong>{' '}
              {new Date(task.deadline).toLocaleDateString()}
            </p>
          )}
          {teamName && (
            <p>
              <strong>Team:</strong> {teamName}
            </p>
          )}
         <div onClick={() => setSelectedTask(task)}>
  ...
  <select
    value={task.status}
    onChange={(e) => onStatusChange(task.id, e.target.value)}
  >
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>
</div>
        </div>
      </div>
    </div>
  );
};


TaskListDetail.propTypes = {
    task: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      priority: PropTypes.string,
      status: PropTypes.string,
      assignedTo: PropTypes.string,
      createdBy: PropTypes.string, // ✅ Add this line
      deadline: PropTypes.string,
      createdAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object, // e.g. Firebase Timestamp
      ]),
    }).isRequired,
    assignedUser: PropTypes.shape({
      name: PropTypes.string,
      photoURL: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
  };
  

export default TaskListDetail;
