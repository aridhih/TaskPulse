import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ProjectReportChart = ({ report }) => {
  const data = Object.entries(report).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="90%" height="100%">
    <BarChart data={data}>
  <CartesianGrid strokeDasharray="4 4" />
  <XAxis dataKey="status" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="count" fill="#06B6D4" barSize={20} />
</BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectReportChart;
