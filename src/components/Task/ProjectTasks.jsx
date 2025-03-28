import { useTasks } from "../Layout/TaskContext";
import { useEffect, useState } from "react";

const ProjectTasks = ({ projectId }) => {
  const { fetchTasksByProject } = useTasks();
  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasksByProject(projectId);
      setProjectTasks(tasks);
    };
    getTasks();
  }, [projectId]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Project Tasks</h2>
      <ul className="space-y-2">
        {projectTasks.map((task) => (
          <li key={task.id} className="p-2 border-b">
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTasks;
