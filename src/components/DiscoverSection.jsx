import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const discoverCards = [
  {
    id: 1,
    title: "Culture Malgache",
    subtitle: "L'âme de l'Est",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
    description: "Découvrez la richesse de la culture malgache à travers le MAKUA Festival. Musique traditionnelle, danses ancestrales et chants locaux se mêlent aux rythmes modernes pour créer une expérience unique.",
    fullContent: "Le MAKUA Festival est une célébration vivante de la culture de la région Atsinanana. Chaque année, des artistes locaux et nationaux se réunissent pour partager leur passion et faire découvrir les traditions malgaches aux visiteurs du monde entier. Des percussions traditionnelles aux instruments modernes, la musique est au cœur de cette célébration culturelle. Les danseurs en costumes traditionnels racontent l'histoire de Madagascar à travers leurs mouvements gracieux et énergiques."
  },
  {
    id: 2,
    title: "Reboisement & Environnement",
    subtitle: "Protéger notre île",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    description: "Le MAKUA Festival s'engage pour l'environnement. Une partie des bénéfices est reversée à des actions de reboisement pour protéger les forêts de Madagascar.",
    fullContent: "L'engagement environnemental est au cœur des valeurs du MAKUA Festival. Chaque édition contribue activement à la préservation de l'environnement malgache. Des milliers de plants d'arbres sont distribués et plantés dans la région de Toamasina. Le festival sensibilise également les participants à l'importance de la protection de la biodiversité unique de Madagascar. Des stands éducatifs, des ateliers de sensibilisation et des actions concrètes de nettoyage sont organisés tout au long de l'événement."
  },
  {
    id: 3,
    title: "Village Artisanal",
    subtitle: "Vita Malagasy",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800",
    description: "Explorez le village artisanal avec ses stands de produits 'Vita Malagasy' (Made in Madagascar). Découvrez l'artisanat local, les créations uniques et la gastronomie traditionnelle.",
    fullContent: "Le Village Artisanal du MAKUA Festival est une véritable vitrine du savoir-faire malgache. Plus de 50 artisans locaux présentent leurs créations : vannerie, sculpture sur bois, tissage traditionnel, bijoux en pierres semi-précieuses et bien plus encore. C'est l'occasion parfaite de découvrir et d'acheter des produits authentiques 'Vita Malagasy'. Les visiteurs peuvent observer les artisans au travail, apprendre leurs techniques ancestrales et repartir avec des souvenirs uniques. Une partie des ventes soutient directement les communautés locales."
  },
  {
    id: 4,
    title: "Grand Carnaval",
    subtitle: "Couleurs et traditions",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    description: "Assistez au spectaculaire défilé du Grand Carnaval MAKUA. Costumes traditionnels colorés, danses folkloriques et animations de rue créent une atmosphère festive inoubliable.",
    fullContent: "Le Grand Carnaval est le moment le plus spectaculaire du MAKUA Festival. Des centaines de participants défilent dans les rues de Toamasina, vêtus de costumes traditionnels éclatants. Les groupes de danseurs présentent des chorégraphies inspirées des différentes régions de Madagascar. Les rythmes des tambours résonnent dans toute la ville, créant une ambiance électrique. C'est un spectacle haut en couleur qui célèbre la diversité culturelle de l'île. Chaque groupe raconte une histoire à travers sa performance, mêlant tradition et créativité moderne."
  },
  {
    id: 5,
    title: "Cuisine Locale",
    subtitle: "Saveurs de l'océan Indien",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    description: "Dégustez les délices de la gastronomie malgache. Des plats traditionnels aux créations modernes, les saveurs de l'océan Indien s'invitent au festival.",
    fullContent: "La cuisine malgache est à l'honneur au MAKUA Festival avec une dizaine de stands gastronomiques. Découvrez le romazava, le ravitoto, le vary amin'anana et bien d'autres spécialités locales préparées par des chefs talentueux. Les fruits de mer frais de Toamasina sont particulièrement mis en avant. Des ateliers culinaires permettent d'apprendre à préparer ces plats traditionnels. Les boissons locales comme le ranon'ampango et les jus de fruits tropicaux fraîchement pressés complètent cette expérience gustative unique."
  },
  {
    id: 6,
    title: "Histoire du Festival",
    subtitle: "Naissance d'une légende",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    description: "Découvrez l'histoire du MAKUA Festival, depuis sa création en 2024 par Shyn et Denise jusqu'à aujourd'hui. Une aventure culturelle qui ne fait que commencer.",
    fullContent: "Le MAKUA Festival est né de la vision de deux artistes passionnés : Shyn et Denise. En 2024, ils ont organisé la première édition avec un objectif simple : célébrer la culture malgache et promouvoir la scène musicale de l'Est. Le festival tire son nom de l'identité 'Makua' chère à la région de Toamasina. Dès la première édition, plus de 30 artistes se sont produits sur scène devant des milliers de spectateurs. Le succès a été immédiat, transformant cet événement en rendez-vous annuel incontournable. En partenariat avec la Commune Urbaine de Toamasina, le festival continue de grandir tout en restant fidèle à ses valeurs : culture, partage et authenticité."
  }
];

const DiscoverSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Durée de l'animation
      once: true, // Animation se joue une seule fois
      easing: 'ease-out',
    });
  }, []);

  const cardsPerView = 3;
  const maxIndex = discoverCards.length - cardsPerView;

  // Wheel handler for trackpad gestures
    const handleWheel = (e) => {
    // Détecte le défilement horizontal sur trackpad
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      
      // deltaX > 0 = swipe vers la gauche (next slide)
      // deltaX < 0 = swipe vers la droite (prev slide)
      if (e.deltaX > 30) {
        nextSlide();
      } else if (e.deltaX < -30) {
        prevSlide();
      }
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const openModal = (card) => {
    setSelectedCard(card);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedCard(null);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 100);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setTranslateX(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    setTranslateX(walk);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (translateX > 100) {
      prevSlide();
    } else if (translateX < -100) {
      nextSlide();
    }
    setTranslateX(0);
  };

  // Touch handlers for trackpad/mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const walk = e.touches[0].clientX - startX;
    setTranslateX(walk);
  };

  const handleTouchEnd = () => {
    if (translateX > 100) {
      prevSlide();
    } else if (translateX < -100) {
      nextSlide();
    }
    setTranslateX(0);
  };

  return (
    <section className="relative bg-black py-20 px-6 overflow-hidden" data-aos="fade-up"
    data-aos-delay="800">
      {/* Title */}
      <div className="max-w-7xl mx-auto mb-4 text-center ">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Découvrir MAKUA
        </h2>
        <p className="text-lg text-white/60">
          Explorez les multiples facettes du festival
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto mb-12">
        {/* Cards Grid */}
        <div 
          ref={carouselRef}
          className="overflow-visible px-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div 
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{ 
              transform: `translateX(calc(-${currentIndex * (100 / cardsPerView)}% + ${translateX}px))`,
              transition: isDragging ? 'none' : 'transform 0.5s ease-out'
            }}
          >
            {discoverCards.map((card) => (
              <div
                key={card.id}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] p-2"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Wrapper pour l'effet de glow externe */}
                <div className="relative">
                  {/* Bordure lumineuse externe floue (SUBTIL) */}
                  <div 
                    className={`absolute -inset-1.5 rounded-3xl transition-all duration-700 ${
                      hoveredCard === card.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 80, 40, 0.35), rgba(255, 140, 50, 0.25), rgba(255, 80, 40, 0.35))',
                      filter: 'blur(8px)',
                      zIndex: 0
                    }}
                  />
                  
                  {/* Carte principale */}
                  <div className="relative group cursor-pointer h-[400px] rounded-3xl overflow-hidden z-10">
                    {/* Image */}
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable="false"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Bordure lumineuse interne SUBTILE */}
                    <div 
                      className="absolute inset-0 rounded-3xl transition-all duration-700 pointer-events-none"
                      style={{
                        boxShadow: hoveredCard === card.id 
                          ? '0 0 0 1.5px rgba(200, 200, 200, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.12)' 
                          : 'none'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Hover Button */}
                    <div 
                      className={`absolute bottom-0 left-0 right-0 flex justify-center pb-6 transition-all duration-500 z-20 ${
                        hoveredCard === card.id 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8 pointer-events-none'
                      }`}
                    >
                      <button
                        onClick={() => openModal(card)}
                        className="px-8 py-2.5 bg-white/90 backdrop-blur-sm hover:bg-white/70 text-black font-medium text-sm rounded-full transition-all duration-300 border border-white/20 hover:border-white/30"
                      >
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-8 max-w-md mx-auto">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
          />
        </div>

        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Modal avec Animation d'ouverture ET de fermeture */}
      {selectedCard && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
            isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop'
          }`}
          onClick={closeModal}
        >
          {/* Backdrop sans blur */}
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Modal Content avec Animation */}
          <div 
            className={`relative bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl ${
              isClosing ? 'animate-modal-content-out' : 'animate-modal-content'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all z-10 border border-white/20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Modal Image */}
            <div className="relative h-72 overflow-hidden">
              <img 
                src={selectedCard.image} 
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </div>

            {/* Modal Text Content */}
            <div className="p-8 md:p-10 overflow-y-auto max-h-[calc(85vh-288px)]">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {selectedCard.title}
              </h3>
              <p className="text-orange-400 text-lg mb-6 font-medium">
                {selectedCard.subtitle}
              </p>
              <p className="text-white/90 text-lg leading-relaxed">
                {selectedCard.fullContent}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Animations CSS - Ouverture ET Fermeture */}
      <style jsx>{`
        @keyframes modal-backdrop-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modal-backdrop-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
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

export default DiscoverSection;