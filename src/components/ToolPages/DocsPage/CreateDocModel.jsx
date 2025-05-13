import { AiOutlineClose } from 'react-icons/ai'

const CreateDocModel = ({handleCloseModal,handleSubmit,docName,setDocName,docDescription,setDocDescription,setDocFile,setProjectId,projects,projectId}) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseModal}
        >
            <div
                className="bg-white p-8 rounded-lg w-96 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-600"
                    onClick={handleCloseModal}
                    aria-label="Close modal"
                >
                    <AiOutlineClose />
                </button>

                <h2 className="text-lg font-semibold mb-4">Create Document</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium">
                            Select File <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            className="w-full border p-2 rounded"
                            accept=".txt,.zip,.pdf,.docx,.js,.py,.html,.css,.json"
                            onChange={(e) => setDocFile(e.target.files[0])}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Document Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            placeholder="Enter document name"
                            value={docName}
                            onChange={(e) => setDocName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="w-full border p-2 rounded"
                            placeholder="Short description"
                            value={docDescription}
                            onChange={(e) => setDocDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Select Project <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full border p-2 rounded"
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a project</option>
                            {projects?.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4"
                    >
                        Upload Document
                    </button>
                </form>
            </div>
        </div>
        )
}

export default CreateDocModel