import { formatDuration } from "./dateUtils";

const TimesheetTable = ({
  tasks,
  timesheetData,
  week,
  activeTimers,
  handleStart,
  handlePause,
  handleResume,
  handleStop,
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border-t border-b text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left px-4 py-2">Task / Project</th>
          {week.map((day) => (
            <th key={day.iso} className="text-center w-[100px]">
              {day.label}
            </th>
          ))}
          <th className="text-center px-2">Total</th>
          <th className="text-center px-2">Track</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan={week.length + 4} className="text-center py-4">
              No tasks assigned
            </td>
          </tr>
        ) : (
          tasks.map((task) => {
            const taskData = timesheetData[task.id] || {};
            const totalSeconds = Object.values(taskData).reduce(
              (sum, sec) => sum + sec,
              0
            );

            return (
              <tr key={task.id} className="border-t">
                <td className="px-4 py-2 text-left">
                  <div className="font-semibold">{task.title}</div>
                  <div className="text-xs text-gray-500">
                    {task.status} • {task.projectPath}
                  </div>
                </td>

                {week.map((day) => (
                  <td key={day.iso} className="text-center">
                    {formatDuration(taskData?.[day.iso] || 0)}
                  </td>
                ))}

                <td className="text-center font-semibold">
                  {formatDuration(totalSeconds)}
                </td>

                <td className="text-center">
                  {activeTimers[task.id] ? (
                    activeTimers[task.id].isPaused ? (
                      <button
                        onClick={() => handleResume(task.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Resume
                      </button>
                    ) : (
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={() => handlePause(task.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Pause
                        </button>
                        <button
                          onClick={() => handleStop(task)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Stop
                        </button>
                      </div>
                    )
                  ) : (
                    <button
                      onClick={() => handleStart(task.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Start
                    </button>
                  )}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
);

export default TimesheetTable;
