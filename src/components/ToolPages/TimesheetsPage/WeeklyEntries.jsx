import { formatDuration } from "./dateUtils";

const WeeklyEntries = ({ groupedEntries, tasks, weekDays }) =>
  Object.keys(groupedEntries).length > 0 && (
    <div className="mt-4 px-4">
      <h2 className="text-lg font-semibold mb-2">Weekly Time Entries</h2>
      {Object.entries(groupedEntries).map(([taskId, days]) => {
        const task = tasks.find((t) => t.id === taskId);
        return (
          <div key={taskId} className="mb-4">
            <h3 className="font-semibold rounded bg-gray-100 p-2">Task: {task ? task.title : taskId}</h3>
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day) => (
                <div key={day}>
                  <p className="text-sm font-medium">{day}</p>
                  {(days[day] || []).map((entry) => (
                    <div key={entry.id} className="text-[9px] text-gray-600">
                      <p>
                        {formatDuration(entry.durationInSeconds || 0)} (
                        {entry.startTime.toLocaleTimeString()} -{" "}
                        {entry.endTime?.toLocaleTimeString() || "N/A"})
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

export default WeeklyEntries;
