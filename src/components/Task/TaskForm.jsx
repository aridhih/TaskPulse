import { useTasks } from "../Layout/TaskContext";
import { useState } from "react";

const TaskForm = () => {
  const { addTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    priority: "medium",
    projectId: "",
    teamId: "",
    assignee: "",
    startTime: "",
    endTime: "",
  });

  // 🔹 Handle Change for Inputs
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // 🔹 Calculate Duration (Seconds)
  const calculateDuration = () => {
    const start = new Date(task.startTime).getTime();
    const end = new Date(task.endTime).getTime();
    return end > start ? (end - start) / 1000 : 0;
  };

  // 🔹 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      ...task,
      timeTracking: {
        startTime: task.startTime,
        endTime: task.endTime,
        totalDuration: calculateDuration(),
      },
    };
    await addTask(newTask);
    setTask({
      title: "",
      priority: "medium",
      projectId: "",
      teamId: "",
      assignee: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-lg">
      {/* 🔹 Task Title */}
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* 🔹 Priority Selection */}
      <select name="priority" value={task.priority} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* 🔹 Project ID */}
      <input
        type="text"
        name="projectId"
        placeholder="Project ID"
        value={task.projectId}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* 🔹 Team ID */}
      <input
        type="text"
        name="teamId"
        placeholder="Team ID"
        value={task.teamId}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* 🔹 Assignee (User ID) */}
      <input
        type="text"
        name="assignee"
        placeholder="Assignee User ID"
        value={task.assignee}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* 🔹 Start Time */}
      <input
        type="datetime-local"
        name="startTime"
        value={task.startTime}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* 🔹 End Time */}
      <input
        type="datetime-local"
        name="endTime"
        value={task.endTime}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* 🔹 Submit Button */}
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Add Task</button>
    </form>
  );
};

export default TaskForm;
