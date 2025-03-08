import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'User Growth',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-4 h-full bg-[#ffffff96]  rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <FaChartLine className="mr-2" /> Dashboard
      </h1>
      <p>Welcome to the admin panel dashboard.</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <p>Users: 150</p>
        <p>Tasks: 300</p>
        <p>Reports: 50</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">User Growth</h2>
        <div className="w-full h-64">
          <Line data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
