import React from 'react';
import { FaChartPie } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const data = {
  labels: ['Completed', 'Pending', 'Overdue'],
  datasets: [
    {
      label: 'Task Status',
      data: [300, 50, 100],
      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
    },
  ],
};

const Reports = () => {
  return (
    <div className="p-4 h-full bg-[#ffffff96] rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <FaChartPie className="mr-2" /> Reports
      </h1>
      <p>View and manage reports here.</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Recent Reports</h2>
        <ul>
          <li>Report 1</li>
          <li>Report 2</li>
          <li>Report 3</li>
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Task Status</h2>
        <div className="w-full h-64">
          <Pie data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Reports;