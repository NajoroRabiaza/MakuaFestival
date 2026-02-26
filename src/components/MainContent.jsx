import React from 'react';
import { Link } from 'react-router-dom';
import { FESTIVAL_CONFIG } from '../utils/constants';
import Countdown from './Countdown';

const MainContent = ({ timeLeft }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      {/* Date */}
      <div className="text-center mt-12 animate-fade-in">
        <h2 className="text-5xl md:text-7xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
          {FESTIVAL_CONFIG.dates.start} - {FESTIVAL_CONFIG.dates.end}
        </h2>
        <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide">
          {FESTIVAL_CONFIG.location.city} ({FESTIVAL_CONFIG.location.region}), {FESTIVAL_CONFIG.location.country}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 m-10 w-full max-w-md animate-slide-up">
        <Link to="/billetterie" className="w-full">
          <button className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-600 text-white font-bold text-lg uppercase tracking-wide hover:scale-105 transition-transform shadow-2xl shadow-orange-400/40">
            Get Your Tickets
          </button>
        </Link>
        
        {/* AJOUT DU LINK ICI */}
        <Link to="/hebergement" className="w-full">
          <button className="w-full px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all">
            Get Your Accommodation
          </button>
        </Link>
      </div>

      {/* Countdown */}
      <Countdown timeLeft={timeLeft} />
    </div>
  );
};

export default MainContent;