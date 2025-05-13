
import { useState } from "react";
import toast from "react-hot-toast";
import { saveTimeEntry } from "./firestoreQueries";

const useTimer = (setTimesheetData, notes, setNotes) => {
  const [activeTimers, setActiveTimers] = useState({});

  const handleStart = (taskId) =>
    setActiveTimers((prev) => ({
      ...prev,
      [taskId]: { startTime: Date.now(), isPaused: false, totalPausedTime: 0 },
    }));

  const handlePause = (taskId) =>
    setActiveTimers((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], isPaused: true, pausedAt: Date.now() },
    }));

  const handleResume = (taskId) =>
    setActiveTimers((prev) => {
      const timer = prev[taskId];
      if (!timer) return prev;
      const pausedDuration = Date.now() - timer.pausedAt;
      return {
        ...prev,
        [taskId]: { ...timer, isPaused: false, totalPausedTime: timer.totalPausedTime + pausedDuration, pausedAt: null },
      };
    });

  const handleStop = async (task) => {
    const timer = activeTimers[task.id];
    if (!timer) return;

    if (!window.confirm("Stop timer?")) return;

    const endTime = Date.now();
    const duration = Math.floor((endTime - timer.startTime - (timer.totalPausedTime || 0)) / 1000);
    if (duration <= 0) {
      toast.error("Invalid duration");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    try {
      await saveTimeEntry(auth.currentUser.uid, task, timer, duration, notes[task.id], today);
      toast.success("Time saved");
      setTimesheetData((prev) => {
        const updated = { ...prev };
        updated[task.id] = updated[task.id] || {};
        updated[task.id][today] = (updated[task.id][today] || 0) + duration;
        return updated;
      });
      setNotes((prev) => ({ ...prev, [task.id]: undefined }));
    } catch (error) {
      console.error("Save time error:", error);
      toast.error(error.code === "permission-denied" ? "Access denied" : "Error saving time");
    } finally {
      setActiveTimers((prev) => ({ ...prev, [task.id]: undefined }));
    }
  };

  return { activeTimers, handleStart, handlePause, handleResume, handleStop };
};

export default useTimer;
