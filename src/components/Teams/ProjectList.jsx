import React from 'react';

const ProjectList = ({ projects }) => (
    <ul className="p-4 space-y-3 bg-white rounded-lg shadow-md">
        {projects.length > 0 ? projects.map(project => (
            <li key={project.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition">
                {project.projectName} (Status: {project.status})
            </li>
        )) : <p className="text-gray-500">No projects found.</p>}
    </ul>
);

export default ProjectList;
