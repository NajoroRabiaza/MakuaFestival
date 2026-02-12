import React, { useState, useRef } from 'react';
import VideoBackground from './components/VideoBackground';
import Header from './components/Header';
import MainContent from './components/MainContent';
import MuteButton from './components/MuteButton';
// import FestivalInfo from './components/FestivalInfo';
import { useCountdown } from './hooks/useCountdown';
import { FESTIVAL_CONFIG } from './utils/constants';
import './styles/App.css';

function App() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const timeLeft = useCountdown(FESTIVAL_CONFIG.dates.target);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background with Overlay */}
      <VideoBackground videoRef={videoRef} isMuted={isMuted} />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <MainContent timeLeft={timeLeft} />

        {/* Festival Info */}
        {/* <FestivalInfo /> */}

        {/* Mute Button */}
        <MuteButton isMuted={isMuted} onToggle={toggleMute} />
      </div>
    </div>
  );
}

export default App;
