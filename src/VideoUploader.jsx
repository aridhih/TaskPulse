import React, { useState } from 'react';
import axios from 'axios';

const VideoUploader = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'videos'); // Your unsigned preset

    setLoading(true);
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dndvfynfo/video/upload',
        formData
      );
      setVideoUrl(res.data.secure_url);
      
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
      {videoUrl && (
        <video width="400" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoUploader;
