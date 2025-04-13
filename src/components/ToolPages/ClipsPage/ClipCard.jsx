import React from "react";
import { FaLink, FaTrash } from "react-icons/fa";

const ClipCard = ({ video, handleCopyLink, handleDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md p-2 hover:shadow-lg transition duration-200">
      <video
        src={video.url}
        controls
        className="w-full h-48 object-cover rounded-md"
        title={`Saved on: ${video.createdAt.toLocaleString()}`}
      />
      <p className="text-xs text-gray-500 mt-2 text-right italic">
        {video.createdAt.toLocaleDateString()} {video.createdAt.toLocaleTimeString()}
      </p>
      <div className="mt-2 flex justify-between items-center gap-2 text-sm">
        <button
          onClick={() => handleCopyLink(video.url)}
          className="flex items-center gap-1 justify-center text-blue-600 hover:underline"
        >
          <FaLink /> Share
        </button>
        <button
          onClick={() => handleDelete(video.id)}
          className="flex items-center gap-1 justify-center text-red-500 hover:underline"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default ClipCard;
