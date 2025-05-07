import React from 'react';
import { RxCross2 } from 'react-icons/rx';

const ProjectForm = ({ projectName, setProjectName, handleCreateProject, setShowProjectForm, error }) => (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md border">
        
       <div className="flex justify-between items-center mb-3 "> 
       <h2 className="text-xl font-bold text-gray-700">Create Project</h2>
        <RxCross2 onClick={() => setShowProjectForm(false)} className="h-5 w-5 cursor-pointer mb-2  hover:rotate-90 transition duration-300" />
        </div>
        <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleCreateProject} className="w-full mt-3 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"        >
            Create
        </button>
        {error && <p className="text-red-500">{error}</p>}

    </div>
);

export default ProjectForm;
