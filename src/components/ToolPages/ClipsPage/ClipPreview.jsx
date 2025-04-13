import React from "react";

const ClipPreview = ({ videoURL, uploading, uploadToCloudinary, onDiscard }) => {
    return (
        <div className="h-[calc(100vh-115px)] w-full p-6 flex flex-col items-center gap-8 bg-gray-50 overflow-y-auto">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 space-y-4 border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800">🎥 Recorded Video Preview</h3>

                <video
                    src={videoURL}
                    controls
                    className="w-full rounded-lg border border-gray-300 shadow-sm"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onDiscard}
                        className="inline-block px-5 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 transition duration-200"
                    >
                        Discard
                    </button>
                    <a
                        href={videoURL}
                        download="recorded-video.webm"
                        className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-200"
                    >
                        Download
                    </a>
                    <button
                        disabled={uploading}
                        onClick={uploadToCloudinary}
                        className="inline-block px-5 py-2 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition duration-200"
                    >
                        {uploading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClipPreview;
