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
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Team Tasks</h2>
      <ul className="space-y-2">
        {teamTasks.map((task) => (
          <li key={task.id} className="p-2 border-b">
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamTasks;
