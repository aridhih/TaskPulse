import React, { useState } from "react";

const DailyStandUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    yesterday: "",
    today: "",
    blockers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center mb-4">Daily Stand Up</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Submit the form below and it will post in your team's Slack channel.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name <span className="text-red-500">(required)</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="yesterday" className="block text-sm font-medium text-gray-700">
              What did you do yesterday? <span className="text-red-500">(required)</span>
            </label>
            <textarea
              id="yesterday"
              name="yesterday"
              value={formData.yesterday}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Briefly describe your work yesterday"
            ></textarea>
          </div>

          <div>
            <label htmlFor="today" className="block text-sm font-medium text-gray-700">
              What will you do today? <span className="text-red-500">(required)</span>
            </label>
            <textarea
              id="today"
              name="today"
              value={formData.today}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your plan for today"
            ></textarea>
          </div>

          <div>
            <label htmlFor="blockers" className="block text-sm font-medium text-gray-700">
              Any blockers, risks, needs?
            </label>
            <textarea
              id="blockers"
              name="blockers"
              value={formData.blockers}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mention any blockers or risks (optional)"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DailyStandUp;
