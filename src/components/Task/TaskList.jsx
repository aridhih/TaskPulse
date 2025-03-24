import { useTasks } from "../Layout/TaskContext";
import { useState } from "react";

const TaskList = () => {
  const { tasks } = useTasks();
  const [priorityFilter, setPriorityFilter] = useState(""); // High, Medium, Low
  const [statusFilter, setStatusFilter] = useState(""); // Pending, In Progress, Completed
  const [searchQuery, setSearchQuery] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");

  // Filtered tasks logic
  const filteredTasks = tasks.filter((task) => {
    return (
      (priorityFilter === "" || task.priority === priorityFilter) &&
      (statusFilter === "" || task.status === statusFilter) &&
      (searchQuery === "" || task.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (assigneeFilter === "" || task.assignee === assigneeFilter)
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Task List</h2>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search task..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Filter by assignee..."
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Task List */}
      <ul className="bg-white shadow rounded-lg p-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li key={task.id} className="p-2 border-b">
              <strong>{task.title}</strong> - {task.priority} - {task.status} - Assigned to: {task.assignee}
            </li>
          ))
        ) : (
          <p>No tasks found!</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
