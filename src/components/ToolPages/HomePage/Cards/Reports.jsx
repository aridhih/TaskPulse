import { useState, useEffect } from 'react';
import { PiDotsThreeOutlineThin } from 'react-icons/pi';
import RemoveCardMenu from './RemoveCardMenu';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../../firebase';
import ProjectReportChart from './ProjectReportChart';

const Reports = ({ removeCard }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [projectReports, setProjectReports] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const user = auth.currentUser;
  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
  const projectQuery = query(collection(db, "projects"), where("createdBy", "==", user.uid));
  const projectSnap = await getDocs(projectQuery);

  const projects = [];
  for (const projectDoc of projectSnap.docs) {
    const projectId = projectDoc.id;
    const taskQuery = query(collection(db, "tasks"), where("projectId", "==", projectId));
    const taskSnap = await getDocs(taskQuery);

    // ✅ Skip projects with no tasks
    if (taskSnap.empty) continue;

    const statusCount = {};
    taskSnap.forEach((task) => {
      const status = task.data().status || "Unknown";
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    projects.push({
      id: projectId,
      name: projectDoc.data().projectName,
      report: statusCount,
    });
  }

  setProjectReports(projects);
};


  const toggleExpand = (projectId) => {
    setExpandedProject(projectId === expandedProject ? null : projectId);
  };

  return (
    <div className='h-72 overflow-auto border-gray-300 py-1 px-4 border bg-gray-200 rounded-xl shadow-lg shadow-gray-300'>
      <div className="h-[15%] border-b border-gray-300 font-medium justify-between flex items-center">
        <p>Project Reports</p>
        <PiDotsThreeOutlineThin className={`hover:text-black hover:text-xl ${isCardOpen && 'text-black text-xl'} cursor-pointer text-gray-500`} onClick={toggleCard} />
      </div>

      <div className='py-2'>
        {projectReports.length === 0 ? (
          <p className="text-center mt-6">No Reports Available</p>
        ) : (
          <ul className="space-y-2">
            {projectReports.map((project) => (
              <li key={project.id} className="bg-white rounded-lg p-3 shadow hover:bg-gray-100 transition">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(project.id)}>
                  <p className="font-semibold">{project.name}</p>
                  <span className="text-sm text-blue-600">{expandedProject === project.id ? "Hide" : "View"}</span>
                </div>
                {expandedProject === project.id && (
                  <div className="mt-4">
                    <ProjectReportChart report={project.report} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isCardOpen && (
        <>
          <RemoveCardMenu toggleCard={toggleCard} isCardOpen={isCardOpen} removeCard={removeCard} cardName="Reports" />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}
    </div>
  );
};

export default Reports;
