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
    <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)'
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent" />
    </>
  );
};

export default VideoBackground;
