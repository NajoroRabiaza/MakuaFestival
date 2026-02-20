import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HebergementPage = () => {
  const [currentHotelIndex, setCurrentHotelIndex] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Pour forcer re-render des animations

  const hotels = [
    {
      id: 1,
      name: 'Hôtel Neptune & SPA',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      description: "Vivez l'expérience ultime du luxe à l'Hôtel Neptune & SPA. Situé en bord de mer à Toamasina, cet établissement 5 étoiles propose des chambres spacieuses avec vue sur l'océan Indien. Profitez du SPA, de la piscine à débordement et d'un restaurant gastronomique. Une navette quotidienne vers le festival MAKUA est incluse.",
      tagline: "Découvrez le luxe absolu au bord de l'océan Indien.",
      stars: 5,
      price: '180,000 Ar',
      features: [
        'Chambre double climatisée avec vue mer',
        'Petit-déjeuner buffet international',
        'Accès illimité au SPA et à la piscine',
        'WiFi haut débit gratuit',
        'Navette festival MAKUA quotidienne',
        'Pass Festival 3 jours inclus',
        'Service de conciergerie 24h/24',
        'Restaurant gastronomique sur place'
      ],
      contact: '+261 34 12 345 67'
    },
    {
      id: 2,
      name: 'Hôtel Joffre',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      description: "L'Hôtel Joffre est un établissement confortable au cœur de Toamasina. Cet hôtel 4 étoiles offre un excellent rapport qualité-prix avec des chambres modernes et bien équipées. Le restaurant sur place sert des spécialités malgaches et internationales. Idéal pour les festivaliers recherchant le confort sans compromettre leur budget.",
      tagline: "Confort et authenticité au cœur de Toamasina.",
      stars: 4,
      price: '120,000 Ar',
      features: [
        'Chambre double confortable',
        'Petit-déjeuner continental',
        'WiFi gratuit dans tout l\'hôtel',
        'Restaurant spécialités malgaches',
        'Navette festival quotidienne',
        'Pass Festival 3 jours inclus',
        'Parking sécurisé gratuit',
        'Bar et terrasse panoramique'
      ],
      contact: '+261 34 12 345 68'
    },
    {
      id: 3,
      name: 'Hôtel Calypso',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      description: "L'Hôtel Calypso est votre point de chute économique et convivial pour le festival MAKUA. Cet établissement 3 étoiles propose des chambres simples mais confortables, parfaites pour les voyageurs à petit budget. L'ambiance familiale et l'emplacement central en font un choix populaire auprès des jeunes festivaliers.",
      tagline: "L'option économique sans compromis sur l'essentiel.",
      stars: 3,
      price: '80,000 Ar',
      features: [
        'Chambre double climatisée',
        'Petit-déjeuner simple',
        'WiFi gratuit',
        'Navette festival quotidienne',
        'Pass Festival 3 jours inclus',
        'Réception 24h/24',
        'Proximité centre-ville'
      ],
      contact: '+261 34 12 345 69'
    }
  ];

  const currentHotel = hotels[currentHotelIndex];
  const maxIndex = hotels.length - 1;

  // Reset animation when hotel changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentHotelIndex]);

  const nextHotel = () => {
    setCurrentHotelIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevHotel = () => {
    setCurrentHotelIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const openModal = () => {
    setSelectedHotel(currentHotel);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedHotel(null);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 300);
  };

  // Fonction pour diviser le texte en mots et ajouter animation
  // Fonction pour obtenir la position alphabétique d'un caractère
const getAlphabetPosition = (char) => {
    const lowerChar = char.toLowerCase();
    const code = lowerChar.charCodeAt(0);
    
    // a = 97, z = 122 en ASCII
    if (code >= 97 && code <= 122) {
      return code - 97; // a=0, b=1, c=2, ..., z=25
    }
    
    // Les espaces, ponctuations apparaissent immédiatement
    return -1;
  };
  
  // Fonction pour diviser le texte et animer lettre par lettre par ordre alphabétique
  const renderAnimatedText = (text) => {
    return (
      <span key={animationKey}>
        {text.split('').map((char, index) => {
          const alphabetPos = getAlphabetPosition(char);
          const delay = alphabetPos >= 0 ? alphabetPos * 0.03 : 0; // 80ms entre chaque lettre de l'alphabet
          
          return (
            <span
              key={index}
              className="inline-block animate-letter-fade-in"
              style={{
                animationDelay: `${delay}s`,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />

      {/* Section Hôtels */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image + Navigation (GAUCHE) */}
            <div className="relative">
              {/* Petit titre au-dessus de l'image */}
              <h2 className="text-5xl uppercase tracking-widest text-white/90 mb-4 font-medium">
                Les Hôtels
              </h2>
              {/* Image avec bordures arrondies */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] mb-8">
                <img
                  src={currentHotel.image}
                  alt={currentHotel.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Navigation Controls EN DESSOUS de l'image */}
              <div className="flex items-center justify-center gap-6">
                {/* Bouton Previous */}
                <button
                  onClick={prevHotel}
                  className="w-12 h-12 rounded-full border-2 border-white/40 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:border-white/80 hover:bg-white/10 transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* Barre de progression */}
                <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden max-w-xs">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 transition-all duration-500"
                    style={{ width: `${((currentHotelIndex + 1) / hotels.length) * 100}%` }}
                  />
                </div>

                {/* Bouton Next */}
                <button
                  onClick={nextHotel}
                  className="w-12 h-12 rounded-full border-2 border-white/40 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:border-white/80 hover:bg-white/10 transition-all"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Texte (DROITE) */}
            <div>
              {/* Titre avec animation */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-500">
                {currentHotel.name}
              </h2>

              {/* Étoiles */}
              {currentHotel.stars > 0 && (
                <div className="flex gap-1 mb-6">
                  {[...Array(currentHotel.stars)].map((_, i) => (
                    <span key={i} className="text-orange-500 text-2xl">⭐</span>
                  ))}
                </div>
              )}

              {/* Description avec animation mot par mot */}
              <p className="text-white/80 text-lg leading-relaxed mb-4 min-h-[180px]">
                {renderAnimatedText(currentHotel.description)}
              </p>

              {/* Tagline */}
              <p className="text-white/60 italic mb-8">
                {currentHotel.tagline}
              </p>

              {/* Bouton More Info (style Tomorrowland) */}
              <button
                onClick={openModal}
                className="px-10 py-3.5 bg-gradient-to-r from-orange-600 to-yellow-700 hover:from-orange-700 hover:to-yellow-800 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-orange-500/50 flex items-center gap-2"
              >
                MORE INFO
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal avec Portal */}
      {selectedHotel && createPortal(
        <div 
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${
            isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop'
          }`}
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          <div 
  className={`relative bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
    isClosing ? 'animate-modal-content-out' : 'animate-modal-content'
  }`}
  onClick={(e) => e.stopPropagation()}
>
  <button
    onClick={closeModal}
    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all z-10 border border-white/20"
    aria-label="Close modal"
  >
    <X className="w-6 h-6 text-white" />
  </button>

  {/* Header avec image en background */}
  <div className="relative h-64 rounded-t-3xl overflow-hidden">
    <img
      src={selectedHotel.image}
      alt={selectedHotel.name}
      className="w-full h-full object-cover"
    />
    {/* Gradient overlay pour lisibilité */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

    {/* Titre + étoiles posés sur l'image */}
    <div className="absolute bottom-6 left-8 md:left-12">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
        {selectedHotel.name}
      </h2>
      {selectedHotel.stars > 0 && (
        <div className="flex gap-1">
          {[...Array(selectedHotel.stars)].map((_, i) => (
            <span key={i} className="text-orange-500 text-2xl">⭐</span>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Contenu du modal */}
  <div className="p-8 md:p-12">
    <div className="mb-8">
      <div className="text-4xl font-bold text-orange-500 mb-2">
        {selectedHotel.price}
      </div>
      <div className="text-white/60">par nuit/personne</div>
    </div>
    <h3 className="text-2xl font-bold text-white mb-6">Ce package inclut :</h3>
    
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {selectedHotel.features.map((feature, i) => (
        <div key={i} className="flex items-start gap-3">
          <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
          <span className="text-white/90">{feature}</span>
        </div>
      ))}
    </div>
    <div className="flex flex-col sm:flex-row gap-4">
      <a 
        href={`tel:${selectedHotel.contact.replace(/\s/g, '')}`}
        className="px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-700 hover:from-orange-700 hover:to-yellow-800 text-white font-semibold rounded-full transition-all duration-300 text-center shadow-lg shadow-orange-500/50"
      >
        Appeler : {selectedHotel.contact}
      </a>
      <a 
        href={`https://wa.me/${selectedHotel.contact.replace(/\s/g, '').replace('+', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 text-center border border-white/20"
      >
        WhatsApp
      </a>
    </div>
  </div>
</div>
        </div>,
        document.body
      )}

      {/* Animations CSS */}
      {/* Animations CSS */}
<style jsx>{`
  @keyframes letter-fade-in {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-letter-fade-in {
    animation: letter-fade-in 0.15s ease-out;
  }

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
    </div>
  );
};

export default HebergementPage;