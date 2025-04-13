import React, { useRef, useState } from 'react';
import { FaVideo } from "react-icons/fa"; 
import { RxVideo } from 'react-icons/rx';


const NewClipMenu = ({toggleMenu , setVideoURL}) => {
  const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const recordedChunks = useRef([]);
  
    const startRecording = async () => {
      toggleMenu(); // Close the menu when starting a recording
      if (recording) return; // Prevent starting a new recording if already recording
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false 
        });
  
        recordedChunks.current = [];
  
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm; codecs=vp9'
        });
  
        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            recordedChunks.current.push(event.data);
          }
        };
  
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks.current, {
            type: 'video/webm'
          });
          const url = URL.createObjectURL(blob);
          setVideoURL(url);
        };
  
        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setRecording(true);
      } catch (err) {
        console.error("Error: " + err);
      }
    };
  return (
    <div className="fixed inset-0 z-50 " onClick={toggleMenu}>
    <div className="absolute top-[104px] right-4 w-fit bg-gray-50 border shadow-lg   shadow-black border-gray-300 rounded-md  z-50" onClick={(e) => e.stopPropagation()}>
      <div className="p-3">
        <div className="flex justify-between gap-8 items-center mb-3">
        <h3 className="text-sm font-semibold text-surface text-nowrap">Record Clip</h3> 

          <a href="/clips" className="w-full text-left text-sm text-textSecondary hover:text-gray-600 hover:bg-gray-200 p-1 rounded-lg justify-center flex items-center gap-2">
          <RxVideo />
          Go to Clips Hub
        </a>
        </div>
        <button  onClick={startRecording}
        className="w-full text-left text-sm text-white cursor-pointer bg-red-400 hover:bg-[#ef4444c6] p-2 rounded-lg justify-center flex items-center gap-2 mb-2">
          <FaVideo /> 
          Start Recording
        </button>
        
      </div>
    </div>
  </div>
  )
}

export default NewClipMenu