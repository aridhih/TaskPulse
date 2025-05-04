import React, { useState } from "react";
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const DailyStandUp = ({closeForm , user}) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await addDoc(collection(db, 'standups'), {
        createdAt: serverTimestamp(),
        userUid: user.uid,
        info: {
          name: user.name,
          email: user.email,
        },
        today: formData.today,
        blockers: formData.blockers,
      });
  
      alert('Standup submitted successfully!');
      closeForm(); // optionally close the form
    } catch (err) {
      console.error("Error submitting standup:", err);
      alert("Failed to submit. Please try again.");
    }
  };
  

  return (
      <div className="w-full max-w-md p-6 rounded-md">
        <h1 className="text-2xl font-bold text-center mb-4">Daily Stand Up</h1>
        <p className="text-sm text-gray-600 text-center mb-2">
          Submit the form below and it will post in your team's Slack channel.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="block text-sm font-medium text-gray-700">
              From
            </h2>
            <p className="text-sm text-gray-600 mb-2 ml-3">
            {user.name + " (" + user.email + ")"}
            </p>
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
          <div className="flex"> 
            <button
                  type="button"
                  className="bg-gray-200 w-[50%] text-gray-700  hover:bg-gray-300 px-4 py-2 rounded mr-2"
                  onClick={closeForm}
                >
                  Cancel
                </button>
          <button
            type="submit"
            className="w-[50%] bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
          </div>
        </form>
      </div>
   
  );
};

export default DailyStandUp;
