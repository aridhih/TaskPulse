import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";

const EditProjectModal = ({ project, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (project) {
      setProjectName(project.projectName || "");
      setStatus(project.status || "active");
     
    }
  }, [project]);

  const handleUpdate = async () => {
    if (!projectName.trim()) {
      toast.error("Project name is required!");
      return;
    }

    try {
      await updateDoc(doc(db, "projects", project.id), {
        projectName,
        status,
      });

      toast.success("Project updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update project!");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Edit Project
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Project Name
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
