import { useTasks } from "../Layout/TaskContext";
import { useState } from "react";

const TaskForm = () => {
  const { addTask } = useTasks();
  const [task, setTask] = useState({ title: "", priority: "medium", projectId: "", teamId: "", assignee: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(task);
    setTask({ title: "", priority: "medium", projectId: "", teamId: "", assignee: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Task Title" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} required />
      <select value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
