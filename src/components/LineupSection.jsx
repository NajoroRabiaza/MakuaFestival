import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Instagram, Music2, Youtube } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import makuaLogo from '../assets/makua-logo.jpeg';

const artists = [
  {
    id: 1,
    name: "SHYN",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
    bio: "Figure emblématique de la scène musicale malgache, Shyn est un artiste polyvalent qui a révolutionné le paysage musical de Madagascar. Co-fondateur du MAKUA Festival, il incarne la fusion entre tradition et modernité.",
    stage: "Main Stage",
    time: "22:00 - 23:30",
    day: "Jour 1",
    social: {
      instagram: "https://instagram.com/shyn",
      tiktok: "https://tiktok.com/@shyn",
      youtube: "https://youtube.com/@shyn"
    }
  },
  {
    id: 2,
    name: "DENISE",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
    bio: "Denise est une artiste incontournable de la scène malgache. Co-fondatrice du MAKUA Festival aux côtés de Shyn, elle apporte une touche unique avec sa voix puissante et son énergie scénique incomparable.",
    stage: "Main Stage",
    time: "20:30 - 21:45",
    day: "Jour 1",
    social: {
      instagram: "https://instagram.com/denise",
      tiktok: "https://tiktok.com/@denise",
      youtube: "https://youtube.com/@denise"
    }
  },
  {
    id: 3,
    name: "BASTA LION",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
    bio: "Basta Lion est l'un des rappeurs les plus influents de Madagascar. Avec son flow unique et ses textes percutants, il a conquis le cœur du public malgache et africain.",
    stage: "Main Stage",
    time: "19:00 - 20:15",
    day: "Jour 2",
    social: {
      instagram: "https://instagram.com/bastalion",
      tiktok: "https://tiktok.com/@bastalion",
      youtube: "https://youtube.com/@bastalion"
    }
  },
  {
    id: 4,
    name: "LJO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    bio: "LJO apporte une fraîcheur nouvelle à la scène musicale malgache avec son style unique mêlant hip-hop, R&B et sonorités traditionnelles. Un artiste prometteur à suivre de près.",
    stage: "Second Stage",
    time: "18:00 - 19:00",
    day: "Jour 2",
    social: {
      instagram: "https://instagram.com/ljo",
      tiktok: "https://tiktok.com/@ljo",
      youtube: "https://youtube.com/@ljo"
    }
  },
  {
    id: 5,
    name: "CEASAR",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
    bio: "Ceasar est un artiste complet qui maîtrise plusieurs styles musicaux. Du rap au dancehall en passant par l'afrobeat, il sait captiver son public avec des performances énergiques.",
    stage: "Main Stage",
    time: "17:00 - 18:15",
    day: "Jour 3",
    social: {
      instagram: "https://instagram.com/ceasar",
      tiktok: "https://tiktok.com/@ceasar",
      youtube: "https://youtube.com/@ceasar"
    }
  },
  {
    id: 6,
    name: "JOYCE MENA",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
    bio: "Joyce Mena est une chanteuse talentueuse qui charme le public avec sa voix suave et ses mélodies envoûtantes. Elle représente la nouvelle génération d'artistes féminines malgaches.",
    stage: "Second Stage",
    time: "16:00 - 17:00",
    day: "Jour 3",
    social: {
      instagram: "https://instagram.com/joycemena",
      tiktok: "https://tiktok.com/@joycemena",
      youtube: "https://youtube.com/@joycemena"
    }
  },
  {
    id: 7,
    name: "BLACK NADIA",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
    bio: "Black Nadia est une icône de la musique urbaine malgache. Avec son style affirmé et ses textes engagés, elle inspire toute une génération de jeunes artistes.",
    stage: "Main Stage",
    time: "21:00 - 22:00",
    day: "Jour 4",
    social: {
      instagram: "https://instagram.com/blacknadia",
      tiktok: "https://tiktok.com/@blacknadia",
      youtube: "https://youtube.com/@blacknadia"
    }
  },
  {
    id: 8,
    name: "WADA & YOUNGS",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500",
    bio: "Le duo Wada & Youngs apporte une énergie explosive à la scène malgache. Leur complémentarité parfaite crée des performances mémorables qui font vibrer le public.",
    stage: "Second Stage",
    time: "19:30 - 20:30",
    day: "Jour 4",
    social: {
      instagram: "https://instagram.com/wadayoungs",
      tiktok: "https://tiktok.com/@wadayoungs",
      youtube: "https://youtube.com/@wadayoungs"
    }
  }
];

const LineupSection = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  const openArtistModal = (artist) => {
    setSelectedArtist(artist);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeArtistModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedArtist(null);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 300);
  };

  const displayedArtists = showAll ? artists : artists.slice(0, 10);

  return (
    <section id="lineup" className="relative bg-black py-20 px-6" data-aos="fade-up" data-aos-delay="200">
      {/* Title */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Les artistes
        </h2>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {displayedArtists.map((artist, index) => (
            <div
              key={artist.id}
              className="group cursor-pointer"
              onClick={() => openArtistModal(artist)}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="relative">
                <div 
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 80, 40, 0.4), rgba(255, 140, 50, 0.3), rgba(255, 80, 40, 0.4))',
                    filter: 'blur(10px)',
                  }}
                />
                
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div 
                    className="absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                      {artist.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && artists.length > 10 && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-10 py-3 bg-transparent border-2 border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold rounded-full transition-all duration-300"
            >
              View All
            </button>
          </div>
        )}
      </div>

      {/* Artist Modal avec PORTAL */}
      {selectedArtist && createPortal(
        <div 
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${
            isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop'
          }`}
          onClick={closeArtistModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70" />
          
          {/* Modal Content avec logo en background et gradient orange */}
          <div 
            className={`relative backdrop-blur-xl border border-white/20 rounded-3xl max-w-4xl w-full overflow-y-auto shadow-2xl ${
              isClosing ? 'animate-modal-content-out' : 'animate-modal-content'
            }`}
            style={{ 
                maxHeight: '90vh',
                backgroundImage: `linear-gradient(135deg, rgba(60, 30, 10, 0.85), rgba(10, 5, 2, 0.92)), url(${makuaLogo})`,
                backgroundSize: 'cover, 40%',
                backgroundPosition: 'center, right center',
                backgroundRepeat: 'no-repeat, no-repeat'
              }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeArtistModal}
              className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all z-10 border border-white/20"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Modal Content Grid */}
            <div className="grid md:grid-cols-2 gap-0 md:gap-8 p-8 md:p-12">
              <div className="flex flex-col items-center justify-center mb-8 md:mb-0">
                <div className="relative w-full max-w-sm">
                  <div 
                    className="absolute -inset-2 rounded-3xl opacity-60"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 80, 40, 0.5), rgba(255, 140, 50, 0.4))',
                      filter: 'blur(20px)',
                    }}
                  />
                  
                  <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-white/20">
                    <img
                      src={selectedArtist.image}
                      alt={selectedArtist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="mt-6 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-white/70">
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-sm">{selectedArtist.day}</span>
                  </div>
                  <div className="text-white/90 text-sm">
                    <span className="font-medium">{selectedArtist.time}</span>
                  </div>
                </div>

                <button className="mt-6 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium rounded-full transition-all duration-300 flex items-center gap-2">
                  <span>Add to My Lineup</span>
                  <span className="text-xl">+</span>
                </button>
              </div>

              <div className="flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
                  {selectedArtist.name}
                </h2>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Biography:</h3>
                  <p className="text-white/80 text-base leading-relaxed">
                    {selectedArtist.bio}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="inline-block px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <span className="text-white font-medium">{selectedArtist.stage}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Social Media:</h3>
                  <div className="flex gap-3">
                  <a
                      href={selectedArtist.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={selectedArtist.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20"
                    >
                      <Music2 className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={selectedArtist.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all border border-white/20"
                    >
                      <Youtube className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes modal-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-backdrop-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes modal-content-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes modal-content-out {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
        }
        .animate-modal-backdrop {
          animation: modal-backdrop-in 0.3s ease-out;
        }
        .animate-modal-backdrop-out {
          animation: modal-backdrop-out 0.3s ease-out;
        }
        .animate-modal-content {
          animation: modal-content-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-modal-content-out {
          animation: modal-content-out 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
};

export default LineupSection;