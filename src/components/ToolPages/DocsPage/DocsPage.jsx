import React, { useState } from "react";
import { SiGoogledocs } from "react-icons/si";
import { FaDownload } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";

const DocsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docs, setDocs] = useState([]); // Initializing with an empty array
  const [docName, setDocName] = useState("");
  const [docDescription, setDocDescription] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDocIndex, setSelectedDocIndex] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (docName && docDescription) {
      const newDoc = {
        name: docName,
        description: docDescription,
      };
      setDocs([...docs, newDoc]);
      setDocName(""); // Resetting form inputs
      setDocDescription("");
      handleCloseModal(); // Close modal after submission
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

  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-200 rounded-b-lg bg-white">
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

      {/* Main Content */}
      <div className="h-[calc(100vh-115px)] w-full p-4 flex flex-col gap-4 bg-white overflow-y-scroll hide-scrollbar">
        <div className="grid grid-cols-2 gap-3 my-3">
          {/* Render Docs */}
          {docs.length === 0 ? (
            <p>No documents available. Create one to start!</p>
          ) : (
            docs.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border border-gray-200 rounded bg-white shadow"
              >
                <div className="flex items-center gap-2">
                  <SiGoogledocs className="text-blue-500" />
                  <p className="text-[13px] cursor-default font-[cursive]">{doc.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
                    <FaDownload />
                    <span className="text-[12px]">Download</span>
                  </button>
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => handlePopupOpen(index)}
                  >
                    <BsThreeDots />
                  </button>
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
                <label className="text-sm">Document Name</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter document name"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm">Description</label>
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="Enter description"
                  rows="4"
                  value={docDescription}
                  onChange={(e) => setDocDescription(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Popup for Rename, Delete, Share */}
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
