import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { ImBin } from "react-icons/im";
import { db } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const ProjectList = ({ projects, isCreator, onProjectDeleted, onProjectClick }) => {
  const [confirmDel, setConfirmDel] = useState(null);

 const handleDeleteProject = async (projectId) => {
  const tasksRef = collection(db, "tasks");
  const q = query(tasksRef, where("projectId", "==", projectId));

  const taskSnapshots = await getDocs(q);

  const deleteTasks = taskSnapshots.docs.map((taskDoc) =>
    deleteDoc(doc(db, "tasks", taskDoc.id))
  );

  toast.promise(
    Promise.all([
      deleteDoc(doc(db, "projects", projectId)), // delete project
      ...deleteTasks // delete tasks
    ]),
    {
      loading: "Deleting project and related tasks...",
      success: "Project & tasks deleted successfully! 🚀",
      error: "Failed to delete project or tasks! ❌",
    }
  ).then(() => {
    onProjectDeleted(projectId);
  });

  setConfirmDel(null);
};



  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ul className="p-4 space-y-3 bg-white rounded-lg shadow-inner h-[380px] border overflow-y-auto">
        {projects.length > 0 ? (
          projects.map((project) => (
            <li
              key={project.id}
              className="p-4 bg-gray-50 rounded-lg flex items-center justify-between shadow-sm hover:bg-gray-100 cursor-pointer transition"
              onClick={() => {
                if (confirmDel === null) { onProjectClick(project); }
              }}

            >
              <p>
                {project.projectName} (Status:{" "}
                <span className="text-gray-600">{project.status}</span>)
              </p>
              {isCreator && (
                <ImBin
                  className="hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from triggering project select
                    setConfirmDel(project.id);
                  }}
                />
              )}

              {/* Delete Confirmation Modal */}
              <AnimatePresence>
                {confirmDel === project.id && (
                  <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-5 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="bg-white p-6 rounded-lg shadow-lg text-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                    >
                      <p className="text-gray-700 mb-4">
                        Are you sure you want to delete this project?
                      </p>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mr-2"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmDel(null)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                      >
                        No
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </ul>
    </>
  );
};

export default ProjectList;
