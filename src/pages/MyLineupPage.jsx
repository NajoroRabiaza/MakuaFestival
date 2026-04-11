import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Clock, MapPin, Trash2, Music2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLineup } from '../contexts/LineupContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DAY_ORDER = ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4'];

const MyLineupPage = () => {
  const { myLineup, removeArtist, clearLineup } = useLineup();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out' });
    window.scrollTo(0, 0);
  }, []);

  // Grouper les artistes par jour
  const grouped = DAY_ORDER.reduce((acc, day) => {
    const artists = myLineup.filter((a) => a.day === day);
    if (artists.length > 0) acc[day] = artists;
    return acc;
  }, {});

  return (
    <div className="relative bg-black min-h-screen flex flex-col">
      <Header />
      {/* Content */}
      <div className="flex-1 px-6 md:px-16 pt-32 pb-32">
        <div className="max-w-3xl mx-auto">

          {/* Empty state */}
          {myLineup.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-32 text-center"
              data-aos="fade-up"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
                style={{ background: 'rgba(255,80,40,0.08)', border: '1px solid rgba(255,80,40,0.2)' }}
              >
                <Music2 className="w-10 h-10 text-orange-500/60" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Ton lineup est vide</h2>
              <p className="text-white/40 text-base max-w-sm leading-relaxed mb-10">
                Explore les artistes et ajoute ceux que tu veux voir au MAKUA Festival.
              </p>
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('lineup');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className="px-8 py-3 rounded-full text-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, rgba(255,80,40,1), rgba(255,140,50,1))' }}
              >
                Découvrir les artistes
              </button>
            </div>
          )}

          {/* Grouped by day */}
          {Object.keys(grouped).length > 0 && (
            <div className="space-y-14">
              {Object.entries(grouped).map(([day, artists], groupIdx) => (
                <div key={day} data-aos="fade-up" data-aos-delay={groupIdx * 80}>

                  {/* Day header */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">{day}</span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/30 text-xs">{artists.length} artiste{artists.length > 1 ? 's' : ''}</span>
                  </div>

                  {/* Artist list */}
                  <div className="space-y-4">
                    {artists.map((artist, idx) => (
                      <div
                        key={artist.id}
                        className="group relative flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-6 py-5 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-delay={groupIdx * 80 + idx * 50}
                      >
                        {/* Orange accent left */}
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(180deg, #ff5028, #ff8c32)' }}
                        />

                        {/* Artist photo */}
                        <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold text-base uppercase tracking-wide truncate mb-2">
                            {artist.name}
                          </h3>
                          <div className="flex items-center gap-5">
                            <span className="flex items-center gap-1.5 text-white/40 text-xs">
                              <Clock className="w-3 h-3" />
                              {artist.time}
                            </span>
                            <span className="flex items-center gap-1.5 text-white/40 text-xs">
                              <MapPin className="w-3 h-3" />
                              {artist.stage}
                            </span>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeArtist(artist.id)}
                          className="flex-shrink-0 w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                          aria-label={`Retirer ${artist.name}`}
                        >
                          <X className="w-4 h-4 text-white/50 group-hover:text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Clear All */}
              <div className="flex justify-end pt-8 mt-4 border-t border-white/10" data-aos="fade-up">
                <button
                  onClick={clearLineup}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-red-500/30 text-red-400/70 hover:text-red-400 hover:border-red-500/60 hover:bg-red-500/10 text-sm font-medium transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  Vider mon lineup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyLineupPage;