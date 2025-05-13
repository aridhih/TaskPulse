export const getCurrentWeek = (startDate = new Date()) => {
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return { label: day.toDateString().slice(0, 10), iso: day.toISOString().split("T")[0] };
  });
  return { days, start };
};

export const getNextWeek = (startDate) => {
  const next = new Date(startDate);
  next.setDate(next.getDate() + 7);
  return next;
};

export const getPrevWeek = (startDate) => {
  const prev = new Date(startDate);
  prev.setDate(prev.getDate() - 7);
  return prev;
};


export const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};
