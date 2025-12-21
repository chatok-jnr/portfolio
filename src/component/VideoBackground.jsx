import React from 'react';
import videoFile from '../assets/codepage.mp4';

const VideoBackground = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      {/* Video element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
        style={{ opacity: 0.7 }} // 30% video opacity
      >
        <source src={videoFile} type="video/mp4" />
      </video>
      
      {/* Dark overlay on top of video */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
    </div>
  );
};

export default VideoBackground;
