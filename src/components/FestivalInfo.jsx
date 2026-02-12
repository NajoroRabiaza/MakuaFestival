import React from 'react';
import { FESTIVAL_CONFIG } from '../utils/constants';

const FestivalInfo = () => {
  return (
    <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 max-w-md">
      <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
        <h3 className="text-white font-bold text-lg mb-2">
          {FESTIVAL_CONFIG.description}
        </h3>
        <div className="text-white/80 text-sm space-y-1">
          <p>🎭 Organisé par {FESTIVAL_CONFIG.organizers.main}</p>
          <p>🎵 Fondateurs: {FESTIVAL_CONFIG.organizers.founders}</p>
          <p>📍 En partenariat avec {FESTIVAL_CONFIG.organizers.partner}</p>
        </div>
      </div>
    </div>
  );
};

export default FestivalInfo;
