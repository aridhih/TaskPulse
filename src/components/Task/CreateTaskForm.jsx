import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import toast from 'react-hot-toast';
import { addDoc, collection } from 'firebase/firestore';

const CreateTaskForm = ({ users, projects, teamId, toggleNewPopup }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignee: '',
    projectId: '',
    status: 'To Do',
    priority: 'low',
    startTime: '',
    endTime: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.assignee) newErrors.assignee = "Please select an assignee.";
    if (!form.projectId) newErrors.projectId = "Please select a project.";
    if (!form.startTime || !form.endTime) {
      newErrors.time = "Start and End times are required.";
    } else if (new Date(form.startTime) >= new Date(form.endTime)) {
      newErrors.time = "Start time must be before End time.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // clear field error
  };

  const handleSubmit = async () => {
    if (loading) return;
    if (!validate()) return toast.error("Please fix the highlighted errors.");

    setLoading(true);

    const start = new Date(form.startTime);
    const end = new Date(form.endTime);
    const duration = (end - start) / 1000;

    const payload = {
      title: form.title,
      description: form.description,
      assignedTo: form.assignee,
      teamId,
      projectId: form.projectId,
      status: form.status,
      priority: form.priority,
      timeTracking: {
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        totalDuration: duration,
      },
      createdBy: auth.currentUser?.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "tasks"), payload);
      toast.success("Task created!");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task. Please try again.");
      setLoading(false);
      return;
    }

    setForm({
      title: '',
      description: '',
      assignee: '',
      projectId: '',
      status: 'todo',
      priority: 'low',
      startTime: '',
      endTime: '',
    });
    setErrors({});
    setLoading(false);
    toggleNewPopup();
  };
 

  return (    
        <div className="bg-gray-50 shadow-inner px-6 py-4 rounded-xl h-[460px] border border-gray-200 max-w-2xl mx-auto overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Create New Task</h2>

          <div className="mb-2">
            <input
              name="title"
              type="text"
              placeholder="Task Title"
              value={form.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border font-bold rounded-md text-sm text-black focus:ring-1 ${errors.title ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-violet-500'
                }`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="mb-2">
            <textarea
              name="description"
              placeholder="Task Description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md text-sm text-black resize-none focus:ring-1 ${errors.description ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-violet-500'
                }`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Assignee</label>
              <select
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm text-black ${errors.assignee ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-violet-500'
                  }`}
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                ))}
              </select>
              {errors.assignee && <p className="text-xs text-red-500 mt-1">{errors.assignee}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Project</label>
              <select
                name="projectId"
                value={form.projectId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm text-black ${errors.projectId ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-violet-500'
                  }`}
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.projectName}</option>
                ))}
              </select>
              {errors.projectId && <p className="text-xs text-red-500 mt-1">{errors.projectId}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start Time</label>
              <input
                name="startTime"
                type="datetime-local"
                value={form.startTime}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm text-black ${errors.time ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-violet-500'
                  }`}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">End Time</label>
              <input
                name="endTime"
                type="datetime-local"
                value={form.endTime}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm text-black ${errors.time ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-violet-500'
                  }`}
              />
            </div>
            {errors.time && <p className="text-xs text-red-500 col-span-2">{errors.time}</p>}
          </div>

          <div className="flex flex-wrap gap-3 mb-2">
            {['low', 'medium', 'high'].map((p) => {
              const isSelected = form.priority === p;
              const colors = {
                low: isSelected ? 'bg-green-600 text-white' : 'bg-white text-green-600',
                medium: isSelected ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500',
                high: isSelected ? 'bg-red-600 text-white' : 'bg-white text-red-600',
              };

              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, priority: p }))}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${colors[p]} ${!isSelected ? 'hover:shadow-inner' : ''}`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end border-t pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-violet-600 text-white px-5 py-2 rounded-md text-sm font-medium transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-700'
                }`}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </div>
  );
};

export default CreateTaskForm;
