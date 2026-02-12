import React from 'react';
import { VIDEO_CONFIG } from '../utils/constants';

const VideoBackground = ({ videoRef, isMuted }) => {
  return (
    <>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={VIDEO_CONFIG.src} type={VIDEO_CONFIG.type} />
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
    </>
  );
};

export default VideoBackground;
