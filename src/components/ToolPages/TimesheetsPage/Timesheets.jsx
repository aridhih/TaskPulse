import React, { useState, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FiPlay, FiPause } from 'react-icons/fi';
import moment from 'moment';

const getWeekDates = (start) => {
  const startOfWeek = moment(start).startOf('week');
  return [...Array(7)].map((_, i) => startOfWeek.clone().add(i, 'days'));
};

const Timesheets = () => {
  const [weekStart, setWeekStart] = useState(moment());
  const [tasks, setTasks] = useState([]);
  const [stopwatch, setStopwatch] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  const weekDates = getWeekDates(weekStart);

  useEffect(() => {
    if (stopwatchRunning) {
      const interval = setInterval(() => {
        setStopwatch((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else {
      clearInterval(timerInterval);
    }
  }, [stopwatchRunning]);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const addTask = () => {
    setTasks([...tasks, { name: 'Task', entries: [] }]);
  };

  const addEntry = (taskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].entries.push({ name: '', day: '', time: 0, running: false, startTime: 0 });
    setTasks(newTasks);
  };

  const toggleEntryTimer = (taskIndex, entryIndex) => {
    const newTasks = [...tasks];
    const entry = newTasks[taskIndex].entries[entryIndex];
    if (!entry.day) {
      const selectedDay = prompt('Enter day (Sun, Mon, Tue, Wed, Thur, Fri, Sat)');
      if (!selectedDay || !['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'].includes(selectedDay)) return;
      entry.day = selectedDay;
    }
    if (entry.running) {
      const elapsed = Math.floor((Date.now() - entry.startTime) / 1000);
      entry.time += elapsed;
      entry.running = false;
      setStopwatchRunning(false);
    } else {
      entry.startTime = Date.now();
      entry.running = true;
      setStopwatch(0);
      setStopwatchRunning(true);
    }
    setTasks(newTasks);
  };

  const calculateTotal = (entries) => {
    return entries.reduce((acc, curr) => acc + curr.time, 0);
  };

  const getDayTime = (entries, day) => {
    return entries
      .filter((e) => e.day === day)
      .reduce((acc, curr) => acc + curr.time, 0);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <button onClick={() => setWeekStart(weekStart.clone().subtract(7, 'days'))}>
            <BiChevronLeft size={24} />
          </button>
          <span className="font-bold">
            {weekDates[0].format('MMM D')} - {weekDates[6].format('MMM D')}
          </span>
          <button onClick={() => setWeekStart(weekStart.clone().add(7, 'days'))}>
            <BiChevronRight size={24} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xl">
          <FiPlay />
          <span>{formatTime(stopwatch)}</span>
        </div>
      </div>

      <table className="table-auto w-full border text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Task</th>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'].map((d) => (
              <th key={d} className="border p-2">{d}</th>
            ))}
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, taskIndex) => (
            <>
              <tr key={taskIndex}>
                <td className="border p-2" rowSpan={task.entries.length + 2}>
                  {task.name}<br />
                  <button
                    className="text-blue-500 underline mt-2"
                    onClick={() => addEntry(taskIndex)}
                  >
                    + Add Entry
                  </button>
                </td>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'].map((day) => (
                  <td key={day} className="border p-2">
                    {getDayTime(task.entries, day) > 0 ? `${Math.floor(getDayTime(task.entries, day) / 3600)}h` : ''}
                  </td>
                ))}
                <td className="border p-2">{Math.floor(calculateTotal(task.entries) / 3600)}h</td>
              </tr>
              {task.entries.map((entry, entryIndex) => (
                <tr key={entryIndex}>
                  <td colSpan={8} className="border p-2 flex items-center gap-2">
                    <input
                      className="border px-2 py-1 mr-2"
                      value={entry.name}
                      onChange={(e) => {
                        const updated = [...tasks];
                        updated[taskIndex].entries[entryIndex].name = e.target.value;
                        setTasks(updated);
                      }}
                      placeholder="Entry Name"
                    />
                    <button
                      className="border px-2 py-1"
                      onClick={() => toggleEntryTimer(taskIndex, entryIndex)}
                    >
                      {entry.running ? <FiPause /> : <FiPlay />}
                    </button>
                    <span className="text-sm">{entry.day}</span>
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default Timesheets;
