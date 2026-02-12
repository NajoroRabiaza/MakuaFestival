import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MuteButton = ({ isMuted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all group"
      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
      ) : (
        <Volume2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};

export default MuteButton;
