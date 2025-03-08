import React from 'react';
import { FaTasks } from 'react-icons/fa';

const TaskManagement = () => {
  return (
    <div className="p-4 bg-[#ffffff96]  h-full rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <FaTasks className="mr-2" /> Task Management
      </h1>
      <p>Manage tasks here.</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Task List</h2>
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
          <li>Task 3</li>
        </ul>
      </div>
    </div>
  );
};

export default TaskManagement;