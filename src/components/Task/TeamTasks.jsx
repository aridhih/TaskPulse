import { useTasks } from "../Layout/TaskContext";
import { useEffect, useState } from "react";

const TeamTasks = ({ teamId }) => {
  const { fetchTasksByTeam } = useTasks();
  const [teamTasks, setTeamTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasksByTeam(teamId);
      setTeamTasks(tasks);
    };
    getTasks();
  }, [teamId]);

  return (
    <div>
      <h2>Team Tasks</h2>
      <ul>
        {teamTasks.map((task) => (
          <li key={task.id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamTasks;
