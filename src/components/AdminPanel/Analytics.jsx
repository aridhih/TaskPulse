import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Task Completion',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    },
  ],
};

const Analytics = () => {
  return (
    <div className="p-4 h-full bg-[#ffffff96] rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <FaChartLine className="mr-2" /> Analytics
      </h1>
      <p>View analytics here.</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Recent Analytics</h2>
        <ul>
          <li>Analytics 1</li>
          <li>Analytics 2</li>
          <li>Analytics 3</li>
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Task Completion</h2>
        <div className="w-full h-64">
          <Bar data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;