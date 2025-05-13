import { useEffect, useState } from "react";
import { RiTimerLine, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { fetchTasks, fetchTimesheets, fetchWeeklyTimeEntries } from "./firestoreQueries";
import { getCurrentWeek, getNextWeek, getPrevWeek } from "./dateUtils";
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

  const { days: week, start } = getCurrentWeek(weekStart);
  const { activeTimers, handleStart, handlePause, handleResume, handleStop } = useTimer(
    setTimesheetData,
    notes,
    setNotes
  );

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


  return (
    <div className="h-[calc(100vh-50px)] w-full border rounded-b-lg">
      <div className="h-[54px] bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 flex justify-between items-center text-white">
       
        <div className="flex gap-1 ml-1 justify-center items-center">
          <RiTimerLine size={16} />
          <p className="text-[13px] cursor-default font-[cursive]">Timesheets</p>
        </div>
      </div>
       <div className="flex items-center gap-1 my-5 ml-4">
          <RiArrowLeftLine
            className="cursor-pointer"
            onClick={handlePrevWeek}
            size={20}
          />
          <p className="text-[13px] font-[cursive]">
            {`${week[0].label} - ${week[6].label}`}
          </p>
          <RiArrowRightLine
            className="cursor-pointer"
            onClick={handleNextWeek}
            size={20}
          />
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
        notes={notes}
      />
      <WeeklyEntries groupedEntries={groupedEntries} tasks={tasks} weekDays={week.map((d) => d.iso)} />
    </div>
  );
};

export default Timesheets;