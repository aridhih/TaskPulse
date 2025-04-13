import React, { useState, useEffect } from "react";
import { LuVideo } from "react-icons/lu";
import NewClipMenu from "./NewClipMenu";
import ClipCard from "./ClipCard";
import EmptyState from "./EmptyState";
import ClipPreview from "./ClipPreview";
import { db, auth } from "../../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

const ClipsPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [savedVideos, setSavedVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const uploadToCloudinary = async () => {
    try {
      setUploading(true);
      const blob = await fetch(videoURL).then(r => r.blob());
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "videos");

      const res = await fetch("https://api.cloudinary.com/v1_1/dndvfynfo/video/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      const uploadedURL = data.secure_url;

      await addDoc(collection(db, "clips"), {
        url: uploadedURL,
        user: auth.currentUser.uid,
        createdAt: new Date()
      });

      setUploading(false);
      fetchSavedVideos();
      setVideoURL(null);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const fetchSavedVideos = async () => {
    const q = query(collection(db, "clips"), where("user", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const videos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      url: doc.data().url,
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    }));

    setSavedVideos(videos);
  };

  const handleDelete = async (videoId) => {
    try {
      await deleteDoc(doc(db, "clips", videoId));
      setSavedVideos(prev => prev.filter(video => video.id !== videoId));
      alert("Clip deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => alert("Link copied to clipboard!"))
      .catch(err => console.error("Copy failed", err));
  };

  useEffect(() => {
    fetchSavedVideos();
  }, []);

  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-200 rounded-b-lg bg-white">
      {/* navbar of clips */}
      <div className="h-[54px] w-full border-b text-textPrimary border-gray-200 bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 justify-between flex items-center">
        <div className="flex items-center gap-1 ml-1">
          <LuVideo />
          <p className="text-[13px] cursor-default font-[cursive]">Clips</p>
        </div>
        <div className="flex items-center relative p-2 gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded h-8 py-1 px-2 text-white"
            onClick={toggleMenu}
          >
            New Clip
          </button>
          {showMenu && (
            <NewClipMenu toggleMenu={toggleMenu} setVideoURL={setVideoURL} />
          )}
        </div>
      </div>

      {videoURL ? (
        <ClipPreview
          videoURL={videoURL}
          uploading={uploading}
          uploadToCloudinary={uploadToCloudinary}
          onDiscard={() => setVideoURL(null)}
        />
      ) : (
        <div className="h-[calc(100vh-115px)] w-full p-4 flex flex-col gap-6 bg-white overflow-y-scroll hide-scrollbar">
          {savedVideos.length > 0 ? (
            <div className="mt-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">📁 Saved Clips</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {savedVideos.map((video) => (
                  <ClipCard
                    key={video.id}
                    video={video}
                    handleCopyLink={handleCopyLink}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState toggleMenu={toggleMenu} />
          )}
        </div>
      )}
    </div>
  );
};

export default ClipsPage;
