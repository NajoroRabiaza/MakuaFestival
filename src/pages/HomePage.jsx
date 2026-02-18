import React, { useState, useRef } from 'react';
import VideoBackground from '../components/VideoBackground';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import MuteButton from '../components/MuteButton';
import DiscoverSection from '../components/DiscoverSection';
import LineupSection from '../components/LineupSection';
import Footer from '../components/Footer';
import { useCountdown } from '../hooks/useCountdown';
import { FESTIVAL_CONFIG } from '../utils/constants';

const HomePage = () => {
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
    <div className="relative bg-black">
      {/* Hero Section with Video */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video Background with Overlay */}
        <VideoBackground videoRef={videoRef} isMuted={isMuted} />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <MainContent timeLeft={timeLeft} />

          {/* Mute Button */}
          <MuteButton isMuted={isMuted} onToggle={toggleMute} />
        </div>
      </div>

      {/* Discover Section */}
      <DiscoverSection />
      
      {/* Lineup Section */}
      <LineupSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
