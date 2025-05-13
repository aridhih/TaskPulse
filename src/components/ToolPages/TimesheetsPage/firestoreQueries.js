import { collection, query, where, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchWeeklyTimeEntries = async (userId, start, end, retryCount = 0) => {
  try {
    const q = query(
      collection(db, "timeEntries"),
      where("userId", "==", userId),
      where("startTime", ">=", start),
      where("startTime", "<=", end)
    );
    const snapshot = await getDocs(q);
    const entries = snapshot.docs.map((doc) => {
      const data = doc.data();
      const startTime = data.startTime?.toDate ? data.startTime.toDate() : new Date(data.startTime || Date.now());
      const endTime = data.endTime?.toDate ? data.endTime.toDate() : data.endTime ? new Date(data.endTime) : null;
      return { id: doc.id, ...data, startTime, endTime };
    });
    return {
      grouped: entries.reduce((result, entry) => {
        const startDate = entry.startTime instanceof Date ? entry.startTime : new Date(entry.startTime);
        const dateKey = startDate.toISOString().split("T")[0];
        const taskId = entry.taskId;
        result[taskId] = result[taskId] || {};
        result[taskId][dateKey] = result[taskId][dateKey] || [];
        result[taskId][dateKey].push(entry);
        return result;
      }, {}),
    };
  } catch (error) {
    if (retryCount < 2) {
      await new Promise((r) => setTimeout(r, 1000));
      return fetchWeeklyTimeEntries(userId, start, end, retryCount + 1);
    }
    throw error;
  }
};

export const fetchTasks = async (userId, teamCache, projectCache) => {
  const snapshot = await getDocs(query(collection(db, "tasks"), where("assignedTo", "==", userId)));
  const tasks = [];
  const newTeamCache = { ...teamCache };
  const newProjectCache = { ...projectCache };

  for (const docSnap of snapshot.docs) {
    const task = { id: docSnap.id, ...docSnap.data() };
    let teamName = newTeamCache[task.teamId] || "Unknown Team";
    if (!newTeamCache[task.teamId]) {
      try {
        const teamSnap = await getDoc(doc(db, "teams", task.teamId));
        teamName = teamSnap.exists() ? teamSnap.data().teamName : "Unknown Team";
        newTeamCache[task.teamId] = teamName;
      } catch (e) {
        console.error("Team fetch error:", e);
      }
    }
    let projectName = newProjectCache[task.projectId] || "Unknown Project";
    if (!newProjectCache[task.projectId]) {
      try {
        const projectSnap = await getDoc(doc(db, "projects", task.projectId));
        projectName = projectSnap.exists() ? projectSnap.data().projectName : "Unknown Project";
        newProjectCache[task.projectId] = projectName;
      } catch (e) {
        console.error("Project fetch error:", e);
      }
    }
    task.projectPath = `${teamName} / Projects / ${projectName}`;
    tasks.push(task);
  }
  console.log("Tasks fetched:", tasks);
  return { tasks, teamCache: newTeamCache, projectCache: newProjectCache };
};

export const fetchTimesheets = async (userId, start, end) => {
  const q = query(
    collection(db, "timesheets"),
    where("userId", "==", userId),
    where("date", ">=", start.toISOString().split("T")[0]),
    where("date", "<=", new Date(end).toISOString().split("T")[0])
  );
  const snapshot = await getDocs(q);
  const timesheetData = {};
  snapshot.forEach((doc) => {
    const { taskId, date, durationInSeconds } = doc.data();
    timesheetData[taskId] = timesheetData[taskId] || {};
    timesheetData[taskId][date] = (timesheetData[taskId][date] || 0) + durationInSeconds;
  });
  return timesheetData;
};

export const saveTimeEntry = async (userId, task, timer, duration, note, today) => {
  await addDoc(collection(db, "timeEntries"), {
    userId,
    taskId: task.id,
    startTime: new Date(timer.startTime),
    endTime: new Date(Date.now()),
    durationInSeconds: duration,
    note: note || "",
  });
  await addDoc(collection(db, "timesheets"), {
    userId,
    taskId: task.id,
    date: today,
    durationInSeconds: duration,
    projectPath: `Projects / ${task.projectId}`,
    taskName: task.title,
    createdAt: new Date(),
  });
};