import { useTasks } from "../Layout/TaskContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { tasks } = useTasks();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === taskId);
    setTask(foundTask);
  }, [tasks, taskId]);

  if (!task) return <p>Loading task details...</p>;

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Task Details</h2>
      <p><b>Title:</b> {task.title}</p>
      <p><b>Description:</b> {task.description || "No description"}</p>
      <p><b>Status:</b> {task.status}</p>
      <p><b>Priority:</b> {task.priority.toUpperCase()}</p>
      <p><b>Assigned to:</b> {task.assignee}</p>
      <p><b>Team:</b> {task.teamId}</p>
      <p><b>Project:</b> {task.projectId}</p>
      <p><b>Time Tracking:</b> {task.timeTracking?.totalDuration} seconds</p>
    </div>
  );
};

export default TaskDetails;
