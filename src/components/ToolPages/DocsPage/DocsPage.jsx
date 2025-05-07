import React, { useEffect, useState } from "react";
import { SiGoogledocs } from "react-icons/si";
import { FaDownload } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { AiOutlineShareAlt } from "react-icons/ai";


const DocsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [docName, setDocName] = useState("");
  const [docDescription, setDocDescription] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDocIndex, setSelectedDocIndex] = useState(null);
  const [docFile, setDocFile] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dndvfynfo/upload";
  const CLOUDINARY_UPLOAD_PRESET = "docs_preset";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!docName || !docFile) {
      alert("Document name and file are required.");
      return;
    }

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", docFile);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryRes = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const cloudinaryData = await cloudinaryRes.json();

      if (!cloudinaryData.secure_url) throw new Error("Upload failed");

      // Save metadata to Firestore
      const newDoc = {
        name: docName,
        description: docDescription,
        fileUrl: cloudinaryData.secure_url,
        fileType: docFile.type,
        createdAt: serverTimestamp(),
        createdBy: "userId", // replace with actual user ID
        projectId: "projectId", // replace with selected project
      };

      await addDoc(collection(db, "docs"), newDoc);

      // UI Updates
      setDocs([...docs, { ...newDoc, createdAt: new Date() }]);
      setDocName("");
      setDocDescription("");
      setDocFile(null);
      handleCloseModal();
    } catch (err) {
      console.error("Error uploading doc:", err);
      alert("Upload failed. Please try again.");
    }
  };

  const handlePopupOpen = (index) => {
    setSelectedDocIndex(index);
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setSelectedDocIndex(null);
  };

  const handleRename = () => {
    const newDocName = prompt("Enter new document name:", docs[selectedDocIndex].name);
    if (newDocName) {
      const updatedDocs = [...docs];
      updatedDocs[selectedDocIndex].name = newDocName;
      setDocs(updatedDocs);
      handlePopupClose();
    }
  };

  const handleDelete = () => {
    const updatedDocs = docs.filter((_, index) => index !== selectedDocIndex);
    setDocs(updatedDocs);
    handlePopupClose();
  };

  const handleShare = () => {
    alert(`Sharing ${docs[selectedDocIndex].name}`);
    handlePopupClose();
  };



  useEffect(() => {
    const q = query(collection(db, "docs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      setDocs(fetchedDocs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-200 rounded-b-lg bg-white">
      {/* Top Bar */}
      <div className="h-[54px] w-full border-b text-textPrimary border-gray-200 bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 justify-between flex items-center">
        <div className="flex items-center gap-1 ml-1">
          <SiGoogledocs />
          <p className="text-[13px] cursor-default font-[cursive]">Docs</p>
        </div>
        <div className="flex items-center relative p-2 gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded h-8 py-1 px-2 text-white"
            onClick={handleOpenModal}
          >
            Create Doc
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-115px)] w-full p-4 flex flex-col gap-4 bg-white overflow-y-scroll hide-scrollbar">
        <div className="grid grid-cols-2 gap-3 my-3">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-sm text-gray-500">Loading documents...</p>
            </div>
          ) : docs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center col-span-2 mt-20">
              <img
                src="https://res.cloudinary.com/demo/image/upload/dndvfynfo/empty_docs.svg"
                alt="No documents"
                className="w-60 h-60 opacity-70"
              />
              <h3 className="text-xl font-semibold mt-4 text-gray-700">No documents yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Start by creating your first document to share, store, or collaborate.
              </p>
              <button
                onClick={handleOpenModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
              >
                Create Document
              </button>
            </div>
          ) : (
            docs.map((doc, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md bg-white flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SiGoogledocs className="text-blue-600 text-xl" />
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">{doc.name}</h4>
                      <p className="text-xs text-gray-500">{doc.description}</p>
                    </div>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => handlePopupOpen(index)}
                  >
                    <BsThreeDots />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs text-gray-400">
                    {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : "—"}
                  </p>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline flex items-center gap-1"
                  >
                    <FaDownload />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
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
            >
              <AiOutlineClose />
            </button>
            <h2 className="text-lg font-semibold mb-4">Create Document</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm">Select File <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  className="w-full border p-2 rounded"
                  accept=".txt,.zip,.pdf,.docx,.js,.py,.html,.css,.json"
                  onChange={(e) => setDocFile(e.target.files[0])}
                  required
                />
              </div>

              <div>
                <label className="text-sm">Document Name <span className="text-red-500">*</span></label>
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
                <label className="text-sm">Description</label>
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="Short description"
                  value={docDescription}
                  onChange={(e) => setDocDescription(e.target.value)}
                />
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
      )}

      {/* Popup Menu */}
      {popupVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handlePopupClose}
        >
          <div
            className="bg-white p-6 rounded-lg w-64 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={handlePopupClose}
            >
              <AiOutlineClose />
            </button>
            <h3 className="text-lg font-semibold mb-4">Options</h3>
            <button
              className="flex items-center gap-2 w-full mb-4 p-2 border border-gray-300 rounded hover:bg-gray-100"
              onClick={handleRename}
            >
              <FiEdit className="text-blue-500" />
              <span>Edit / Rename</span>
            </button>
            <button
              className="flex items-center gap-2 w-full mb-4 p-2 border border-gray-300 rounded hover:bg-gray-100"
              onClick={handleDelete}
            >
              <FaTrashAlt className="text-red-500" />
              <span>Delete</span>
            </button>
            <button
              className="flex items-center gap-2 w-full p-2 border border-gray-300 rounded hover:bg-gray-100"
              onClick={handleShare}
            >
              <AiOutlineShareAlt className="text-green-500" />
              <span>Share</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocsPage;
