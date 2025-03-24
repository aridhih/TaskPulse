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
    <div>
      <h2>Project Tasks</h2>
      <ul>
        {projectTasks.map((task) => (
          <li key={task.id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTasks;
