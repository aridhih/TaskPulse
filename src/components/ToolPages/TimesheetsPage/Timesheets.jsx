import { useEffect, useState } from "react";
import { RiTimerLine, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { fetchTasks, fetchTimesheets, fetchWeeklyTimeEntries } from "./firestoreQueries";
import { formatLiveDuration, getCurrentWeek, getNextWeek, getPrevWeek } from "./dateUtils";
import TimesheetTable from "./TimesheetTable";
import WeeklyEntries from "./WeeklyEntries";
import useTimer from "./useTimer";
import { auth } from "../../../firebase";

const Timesheets = () => {
  const [tasks, setTasks] = useState([]);
  const [timesheetData, setTimesheetData] = useState({});
  const [groupedEntries, setGroupedEntries] = useState({});
  const [teamCache, setTeamCache] = useState({});
  const [projectCache, setProjectCache] = useState({});
  const [notes, setNotes] = useState({});
  const [weekStart, setWeekStart] = useState(getCurrentWeek().start);
  const [liveTaskId, setLiveTaskId] = useState(null);
  const [liveElapsed, setLiveElapsed] = useState(0);

  const { days: week, start } = getCurrentWeek(weekStart);

  const {
    activeTimers,
    handleStart: baseHandleStart,
    handlePause,
    handleResume,
    handleStop: baseHandleStop
  } = useTimer(setTimesheetData, notes, setNotes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);

        const [taskData, timesheetData, timeEntries] = await Promise.all([
          fetchTasks(auth.currentUser.uid, teamCache, projectCache),
          fetchTimesheets(auth.currentUser.uid, start, end),
          fetchWeeklyTimeEntries(auth.currentUser.uid, start, end),
        ]);

        setTasks(taskData.tasks);
        setTeamCache(taskData.teamCache);
        setProjectCache(taskData.projectCache);
        setTimesheetData(timesheetData);
        setGroupedEntries(timeEntries.grouped);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(error.code === "permission-denied" ? "Access denied" : "Failed to load data");
      }
    };

    fetchData();
  }, [start]);

  const handlePrevWeek = () => setWeekStart(getPrevWeek(weekStart));
  const handleNextWeek = () => setWeekStart(getNextWeek(weekStart));

  const handleStart = async (taskId) => {
    // Stop any existing timer
    if (liveTaskId && liveTaskId !== taskId) {
      await baseHandleStop({ id: liveTaskId });
    }
    baseHandleStart(taskId);
    setLiveTaskId(taskId);
    setLiveElapsed(0);
  };

  const handleStop = async (task) => {
    await baseHandleStop(task);
    setLiveTaskId(null);
    setLiveElapsed(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (liveTaskId && activeTimers[liveTaskId] && !activeTimers[liveTaskId].isPaused) {
        const startedAt = activeTimers[liveTaskId].startedAt;
        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        setLiveElapsed(elapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [liveTaskId, activeTimers]);

  return (
    <div className="h-[calc(100vh-50px)] w-full border rounded-b-lg">
      <div className="h-[54px] bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 flex justify-between items-center text-white">
        <div className="flex gap-1 ml-1 justify-center items-center">
          <RiTimerLine size={16} />
          <p className="text-[13px] cursor-default font-[cursive]">Timesheets</p>
        </div>
        {liveTaskId && (
          <span className="text-yellow-200 font-bold mr-3 animate-pulse">
            ⏱ {formatLiveDuration(liveElapsed)}
          </span>
        )}
      </div>

      <div className="overflow-y-auto h-[calc(100vh-104px)]">
        <div className="flex items-center justify-between ">
          <div className="gap-1 flex items-center my-5 ml-4">
            <RiArrowLeftLine className="cursor-pointer" onClick={handlePrevWeek} size={20} />
            <div className="flex items-center gap-2 text-[13px] font-[cursive]">
              <span>{`${week[0].label} - ${week[6].label}`}</span>
            </div>
            <RiArrowRightLine className="cursor-pointer" onClick={handleNextWeek} size={20} />
          </div>
        </div>

        <TimesheetTable
          tasks={tasks}
          timesheetData={timesheetData}
          week={week}
          activeTimers={activeTimers}
          handleStart={handleStart}
          handlePause={handlePause}
          handleResume={handleResume}
          handleStop={handleStop}
        />

        <WeeklyEntries groupedEntries={groupedEntries} tasks={tasks} weekDays={week.map((d) => d.iso)} />
      </div>
    </div>
  );
};

export default Timesheets;
