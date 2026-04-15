import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Instagram, Music2, Youtube, Check, Plus } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import makuaLogo from '../assets/makua-logo.jpeg';
import { useLineup } from '../contexts/LineupContext';

const artists = [
  {
    id: 1,
    name: "SHYN",
    image: "/image/shyn.jpeg",
    bio: "Shyn, de son vrai nom Be Jean Prosper (originaire de Toamasina), est l'un des artistes phares du RnB et afro-pop malgache. Auteur-compositeur depuis vingt ans, il a percé avec le titre Mahatsara Zaho (2007) et remporté le trophée « révélation de l'année » aux AFRIMA 2017. Il a collaboré avec des artistes internationaux (dont Doc Gyneco) et dirige le label Makua, soutenant des talents comme Joyce Mena et LJo. Fondateur du Makua Festival à Tamatave, il reste très actif tout en pilotant cet événement phare de la musique malgache moderne.",
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
    image: "/image/denise.jpeg",
    bio: "Denise (née Alaignina Nancy Jadot en 1989 à Toamasina) est une chanteuse malgache de pop urbaine et afro-pop. Révélée sous le nom Deenyz en remportant Island Africa Talent en 2014, elle signe ensuite chez Universal Music Africa. Mariée à Shyn, elle forme avec lui un couple artistique très médiatisé. Sa chanson Allofo (2017) mêle afro-pop et musiques traditionnelles, et elle a participé à Coke Studio Africa aux côtés de Jason Derulo. Invitée régulière du Makua Festival, elle contribue activement à la promotion de la scène malgache contemporaine.",
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
    image: "/image/basta.jpeg",
    bio: "Basta Lion, de son vrai nom Veloarson Maurizio Loïc (né le 27 décembre 1991 à Mahajanga), est un artiste malgache de dancehall et reggae. En 2024, son titre Wyfl Riddim, en collaboration avec le sound system jamaïcain Little Lion Sound, a atteint la 1ère place du classement officiel de Kingston, berceau du reggae — une première pour un artiste malgache. Ancien footballeur reconverti à la musique, il travaille désormais à des projets internationaux et s'est produit au Makua Festival 2024.",
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
    image: "/image/LJO.png",
    bio: "LJo est un auteur-compositeur-interprète malgache d'Antananarivo, actif depuis la fin des années 2010. Il évolue dans l'afro-pop et l'afrobeat urbain, fusionnant rythmes modernes et sonorités traditionnelles malgaches (valiha, marovany…). Ses titres phares — Sao Hanegnina, Ninao, Tsy nofy, Za maka anao, Avia — mêlent grooves africains et influences locales. Son EP Valise (2024) a été bien accueilli. Il a collaboré avec Lion Hill et Black Nadia, et a participé au Makua Festival 2024 avec une performance très applaudie.",
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
    image: "/image/ceasar.jpeg",
    bio: "Ceasar, également connu sous le nom César Lee, est un chanteur malgache d'urbano-pop et R&B. Il s'est fait remarquer avec des singles populaires tels que Tsy ho zakanao, Azo et Milliard. En 2025, il a été sacré « Africa's Musical Superstar » lors de la 9ᵉ édition des ODA Awards, une distinction soulignant son rayonnement continental. Il se concentre sur des projets internationaux et locaux ambitieux, s'imposant comme l'une des voix les plus prometteuses de la nouvelle génération malgache.",
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
    image: "/image/joyce_mena.jpeg",
    bio: "Joyce Mena est une rappeuse malgache née à Toamasina. Révélée dès 2014 avec le tube Tsis Tsis Koz, elle signe son premier album Nenga en 2024 — « Nenga » signifiant « le passé » — alliant rap urbain, jazz, trap et rythmes ethniques malgaches (tsapiky, vakôndrazana). Découverte par Shyn en 2009, elle est aujourd'hui signée sur son label Makua. Artiste à la double personnalité puissante et mélodique, elle a participé au Makua Festival et poursuit une carrière toujours ascendante.",
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
    image: "/image/black_nadia.png",
    bio: "Black Nadia (Kantoniaina Ornella Edith Nadia, née le 25 mai 1986 à Amboasary-Sud) est une chanteuse et auteure-compositrice malgache de black music tropicale. Ancienne danseuse, elle s'est imposée comme l'une des pionnières du coupé-décalé malgache depuis 2011. Son répertoire mêle coupé-décalé, reggae, ragga, slow et instruments traditionnels locaux. Son premier album Ampiasao le system Vol.1 (2013) lui vaut une grande popularité. Elle assure elle-même l'écriture et la production de ses spectacles, et a été invitée au Makua Festival 2024.",
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
    image: "/image/wada_yoongs.jpeg",
    bio: "Wada & Yoongs est un duo de rappeurs malgaches (vrais noms Ando et Ialy), issus du groupe Jiolambups. Ils ont popularisé la « jajins music », mélange de soukous congolais et de rythmes malgaches aux textes évoquant la réalité sociale. Leur tube Malaheloisation (feat. DJ Ceymci, fin 2022) est devenu viral lors du Nouvel An 2023 à Antananarivo. Depuis 2023, ils multiplient les tournées internationales (Paris, Mayotte…). En octobre 2024, ils ont participé et remercié officiellement le Makua Festival de Tamatave sur les réseaux sociaux.",
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
  // justAdded state pour l'animation de feedback
  const [justAdded, setJustAdded] = useState(false);
  const { toggleArtist, isInLineup } = useLineup();

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
    setJustAdded(false);
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


                {/**
                * Le bouton est maintenant toggle : si l'artiste est déjà dans le lineup
                * il affiche ✓ "Added to My Lineup" en orange, hover passe en rouge pour signaler qu'on peut retirer
                * Animation scale-105 pendant 1.5s au moment de l'ajout
                * Le justAdded se remet à zéro à chaque ouverture de modal
                *
                  */}
                <button
                  onClick={() => {
                    const alreadyIn = isInLineup(selectedArtist.id);
                    toggleArtist(selectedArtist);
                    if (!alreadyIn) {
                      setJustAdded(true);
                      setTimeout(() => setJustAdded(false), 1500);
                    }
                  }}
                  className={`mt-6 px-8 py-3 border font-medium rounded-full transition-all duration-300 flex items-center gap-2 ${
                    isInLineup(selectedArtist.id)
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400 hover:bg-red-500/20 hover:border-red-400 hover:text-red-400'
                      : 'bg-white/10 hover:bg-white/20 border-white/30 text-white'
                  } ${justAdded ? 'scale-105' : 'scale-100'}`}
                >
                  {isInLineup(selectedArtist.id) ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to My Lineup</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to My Lineup</span>
                    </>
                  )}
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