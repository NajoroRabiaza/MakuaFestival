import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Check, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HebergementPage = () => {
  const [currentHotelIndex, setCurrentHotelIndex] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const [currentVillaIndex, setCurrentVillaIndex] = useState(0);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [hoveredVilla, setHoveredVilla] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);

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
        'Restaurant gastronomique sur place',
      ],
      contact: '+261 34 12 345 67',
    },
    {
      id: 2,
      name: 'Hôtel Joffre',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      description: "L'Hôtel Joffre est un établissement confortable au cœur de Toamasina. Cet hôtel 4 étoiles offre un excellent rapport qualité-prix avec des chambres modernes et bien équipées. Le restaurant sur place sert des spécialités malgaches et internationales. Idéal pour les festivaliers recherchant le confort sans compromettre leur budget.",
      tagline: 'Confort et authenticité au cœur de Toamasina.',
      stars: 4,
      price: '120,000 Ar',
      features: [
        'Chambre double confortable',
        'Petit-déjeuner continental',
        "WiFi gratuit dans tout l'hôtel",
        'Restaurant spécialités malgaches',
        'Navette festival quotidienne',
        'Pass Festival 3 jours inclus',
        'Parking sécurisé gratuit',
        'Bar et terrasse panoramique',
      ],
      contact: '+261 34 12 345 68',
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
        'Proximité centre-ville',
      ],
      contact: '+261 34 12 345 69',
    },
  ];

  const villas = [
    {
      id: 1,
      name: 'Villa Maeva',
      subtitle: 'Villa Privée avec Piscine',
      image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800',
      description: 'Villa luxueuse avec 4 chambres, piscine privée et jardin tropical. Idéale pour un groupe de 6-8 personnes.',
      price: '250,000 Ar',
      fullContent: 'Villa Maeva est une magnifique villa privée située dans un quartier calme de Toamasina. Elle dispose de 4 chambres spacieuses avec climatisation, une piscine privée, un grand jardin tropical et une cuisine entièrement équipée.',
      features: ['4 chambres doubles climatisées', 'Piscine privée', 'Jardin tropical aménagé', 'Cuisine équipée complète', 'WiFi haut débit', 'Navette festival quotidienne', 'Pass Festival 3 jours inclus (x8)', 'Gardien et ménage quotidien'],
      capacity: '6-8 personnes',
      contact: '+261 34 12 345 70',
    },
    {
      id: 2,
      name: 'Maison Chez Bema',
      subtitle: "Maison d'Hôtes Familiale",
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      description: "Maison d'hôtes chaleureuse tenue par une famille locale. Petit-déjeuner malgache traditionnel inclus.",
      price: '60,000 Ar',
      fullContent: "Chez Bema, vous vivez une expérience authentique au sein d'une famille malgache accueillante.",
      features: ['3 chambres confortables', 'Petit-déjeuner malgache traditionnel', 'Accueil familial chaleureux', 'Découverte de la culture locale', 'Navette festival quotidienne', 'Pass Festival 3 jours inclus (x2)', 'Conseils touristiques personnalisés'],
      capacity: '2-4 personnes',
      contact: '+261 34 12 345 71',
    },
    {
      id: 3,
      name: 'Bungalow Akany',
      subtitle: 'Bungalow Traditionnel',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      description: "Bungalow traditionnel malgache avec terrasse privée. Parfait pour les couples recherchant l'authenticité.",
      price: '90,000 Ar',
      fullContent: 'Le Bungalow Akany offre une expérience unique avec sa terrasse privée donnant sur un jardin de vanille et de ravinala.',
      features: ['Bungalow en bois traditionnel', 'Terrasse privée', 'Jardin de vanille et ravinala', 'Salle de bain privée', 'Petit-déjeuner continental', 'Navette festival quotidienne', 'Pass Festival 3 jours inclus (x2)', 'Hammac et coin détente'],
      capacity: '2 personnes',
      contact: '+261 34 12 345 72',
    },
    {
      id: 4,
      name: 'Villa Baobab',
      subtitle: 'Villa de Luxe Vue Mer',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      description: "Villa haut de gamme avec vue panoramique sur l'océan Indien. Piscine à débordement et service de majordome.",
      price: '400,000 Ar',
      fullContent: "Villa Baobab est une propriété d'exception avec une vue imprenable sur l'océan Indien. 5 suites, piscine à débordement, espace spa et service de majordome.",
      features: ['5 suites avec vue mer', 'Piscine à débordement', 'Espace spa privé', 'Service de majordome', 'Chef privé (sur demande)', 'Navette festival en véhicule privé', 'Pass Festival 3 jours VIP inclus (x10)', 'WiFi haut débit et TV satellite'],
      capacity: '8-10 personnes',
      contact: '+261 34 12 345 73',
    },
    {
      id: 5,
      name: 'Trano Gasy',
      subtitle: 'Maison Traditionnelle Malgache',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      description: 'Maison traditionnelle authentique avec toit de chaume. Expérience culturelle immersive garantie.',
      price: '50,000 Ar',
      fullContent: 'Trano Gasy est une authentique maison traditionnelle construite selon les techniques ancestrales avec soirées musicales locales.',
      features: ['Architecture traditionnelle malgache', 'Toit de chaume authentique', '2 chambres traditionnelles', 'Cuisine au feu de bois', 'Soirées musicales locales', 'Navette festival quotidienne', 'Pass Festival 3 jours inclus (x4)', 'Cours de cuisine malgache'],
      capacity: '4 personnes',
      contact: '+261 34 12 345 74',
    },
    {
      id: 6,
      name: 'B&B Vanille',
      subtitle: 'Bed & Breakfast Cosy',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      description: 'Petit B&B intimiste avec jardin. Petit-déjeuner fait maison avec produits locaux.',
      price: '70,000 Ar',
      fullContent: 'B&B Vanille est un bed & breakfast cosy tenu par Marie, passionnée de cuisine locale.',
      features: ['3 chambres cosy', 'Petit-déjeuner fait maison', 'Produits locaux et bio', 'Jardin fleuri', 'Bibliothèque et coin lecture', 'Navette festival quotidienne', 'Pass Festival 3 jours inclus (x2)', 'Thé et café à volonté'],
      capacity: '2 personnes',
      contact: '+261 34 12 345 75',
    },
  ];

  // ─── Packs Complets ───────────────────────────────────────────────────────
  const packs = [
    {
      id: 1,
      tag: 'PACK SIMPLE',
      name: 'Festival & Confort',
      price: '230,000 Ar',
      priceDetail: 'par personne / 3 nuits',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200',
      intro: 'Le point de départ idéal pour vivre le MAKUA Festival sans vous soucier de la logistique.',
      description: "Ce pack combine l'hébergement à l'Hôtel Calypso 3★, le pass festival 3 jours et la navette aller-retour depuis votre hôtel jusqu'au site.",
      includes: [
        "3 nuits à l'Hôtel Calypso (chambre double)",
        'Petit-déjeuner continental chaque matin',
        'Pass Festival 3 jours — Fan Zone',
        'Navette hôtel ↔ festival quotidienne',
        'Accueil & assistance sur place',
      ],
      contact: '+261 34 12 345 80',
    },
    {
      id: 2,
      tag: 'PACK PREMIUM',
      name: 'Festival & Luxe',
      price: '420,000 Ar',
      priceDetail: 'par personne / 3 nuits',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200',
      intro: 'Pour ceux qui veulent vivre le festival à son plein potentiel.',
      description: "Séjour à l'Hôtel Neptune & SPA 5★, accès VIP au festival, dîner gastronomique inclus le premier soir et service de conciergerie dédié tout au long de votre séjour.",
      includes: [
        "3 nuits à l'Hôtel Neptune & SPA (chambre vue mer)",
        'Petit-déjeuner buffet international',
        'Pass Festival 3 jours — Silver VIP',
        'Navette privée hôtel ↔ festival',
        'Dîner gastronomique J1 inclus',
        'Accès illimité SPA & piscine',
        'Conciergerie dédiée 24h/24',
      ],
      contact: '+261 34 12 345 81',
    },
    {
      id: 3,
      tag: 'PACK GROUPE',
      name: 'Festival & Villa',
      price: '180,000 Ar',
      priceDetail: 'par personne / 3 nuits (min. 6 pers.)',
      image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1200',
      intro: "Venez en groupe et profitez d'une villa privée entière rien que pour vous.",
      description: "Ce pack comprend la location de la Villa Maeva avec piscine, les pass festival pour tous les membres du groupe, et une navette collective dédiée.",
      includes: [
        "3 nuits en Villa Maeva (jusqu'à 8 pers.)",
        'Petit-déjeuner servi chaque matin',
        'Pass Festival 3 jours — Fan Zone (x8)',
        'Navette collective villa ↔ festival',
        'Barbecue et soirée privée J2',
        'Gardien et ménage quotidien',
        'Coordination de groupe sur place',
      ],
      contact: '+261 34 12 345 82',
    },
  ];

  const currentHotel = hotels[currentHotelIndex];
  const maxHotelIndex = hotels.length - 1;
  const cardsPerView = 3;
  const maxVillaIndex = villas.length - cardsPerView;

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [currentHotelIndex]);

  const nextHotel = () => setCurrentHotelIndex((p) => (p >= maxHotelIndex ? 0 : p + 1));
  const prevHotel = () => setCurrentHotelIndex((p) => (p <= 0 ? maxHotelIndex : p - 1));
  const nextVilla = () => setCurrentVillaIndex((p) => (p >= maxVillaIndex ? 0 : p + 1));
  const prevVilla = () => setCurrentVillaIndex((p) => (p <= 0 ? maxVillaIndex : p - 1));

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 30) nextVilla();
      else if (e.deltaX < -30) prevVilla();
    }
  };
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setTranslateX(0);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setTranslateX((e.pageX - carouselRef.current.offsetLeft - startX) * 1.5);
  };
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (translateX > 100) prevVilla();
    else if (translateX < -100) nextVilla();
    setTranslateX(0);
  };
  const handleTouchStart = (e) => setStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTranslateX(e.touches[0].clientX - startX);
  const handleTouchEnd = () => {
    if (translateX > 100) prevVilla();
    else if (translateX < -100) nextVilla();
    setTranslateX(0);
  };

  const openModal = (item) => {
    setSelectedHotel(item);
    setSelectedVilla(item);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedHotel(null);
      setSelectedVilla(null);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 300);
  };

  const getAlphabetPosition = (char) => {
    const code = char.toLowerCase().charCodeAt(0);
    return code >= 97 && code <= 122 ? code - 97 : -1;
  };
  const renderAnimatedText = (text) => (
    <span key={animationKey}>
      {text.split('').map((char, index) => {
        const delay = getAlphabetPosition(char) >= 0 ? getAlphabetPosition(char) * 0.03 : 0;
        return (
          <span key={index} className="inline-block animate-letter-fade-in" style={{ animationDelay: `${delay}s`, opacity: 0, animationFillMode: 'forwards' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );

  const selectedItem = selectedHotel || selectedVilla;

  return (
    <div className="bg-black min-h-screen">
      <Header />

      {/* ─── Section Hôtels ─────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <h2 className="text-5xl uppercase tracking-widest text-white/90 mb-4 font-medium">Les Hôtels</h2>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] mb-8">
                <img src={currentHotel.image} alt={currentHotel.name} className="w-full h-full object-cover transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="flex items-center justify-center gap-6">
                <button onClick={prevHotel} className="w-12 h-12 rounded-full border-2 border-white/40 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:border-white/80 hover:bg-white/10 transition-all">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden max-w-xs">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 transition-all duration-500" style={{ width: `${((currentHotelIndex + 1) / hotels.length) * 100}%` }} />
                </div>
                <button onClick={nextHotel} className="w-12 h-12 rounded-full border-2 border-white/40 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:border-white/80 hover:bg-white/10 transition-all">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-500">{currentHotel.name}</h2>
              {currentHotel.stars > 0 && (
                <div className="flex gap-1 mb-6">
                  {[...Array(currentHotel.stars)].map((_, i) => <span key={i} className="text-orange-500 text-2xl">⭐</span>)}
                </div>
              )}
              <p className="text-white/80 text-lg leading-relaxed mb-4 min-h-[180px]">{renderAnimatedText(currentHotel.description)}</p>
              <p className="text-white/60 italic mb-8">{currentHotel.tagline}</p>
              <button onClick={() => openModal(currentHotel)} className="px-10 py-3.5 bg-gradient-to-r from-orange-600 to-yellow-700 hover:from-orange-700 hover:to-yellow-800 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-orange-500/50 flex items-center gap-2">
                MORE INFO <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section Villas ─────────────────────────────────────── */}
      <section className="relative bg-black py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Villas & Maisons Traditionnelles</h2>
          <p className="text-lg text-white/60">Vivez une expérience authentique et culturelle</p>
        </div>
        <div className="relative max-w-7xl mx-auto mb-12">
          <div ref={carouselRef} className="overflow-visible px-4 cursor-grab active:cursor-grabbing" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onWheel={handleWheel}>
            <div className="flex gap-6" style={{ transform: `translateX(calc(-${currentVillaIndex * (100 / cardsPerView)}% + ${translateX}px))`, transition: isDragging ? 'none' : 'transform 0.5s ease-out' }}>
              {villas.map((villa) => (
                <div key={villa.id} className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] p-2" onMouseEnter={() => setHoveredVilla(villa.id)} onMouseLeave={() => setHoveredVilla(null)}>
                  <div className="relative">
                    <div className={`absolute -inset-1.5 rounded-3xl transition-all duration-700 ${hoveredVilla === villa.id ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(135deg, rgba(255,80,40,0.35), rgba(255,140,50,0.25), rgba(255,80,40,0.35))', filter: 'blur(8px)', zIndex: 0 }} />
                    <div className="relative group cursor-pointer h-[400px] rounded-3xl overflow-hidden z-10">
                      <img src={villa.image} alt={villa.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" draggable="false" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute inset-0 rounded-3xl transition-all duration-700 pointer-events-none" style={{ boxShadow: hoveredVilla === villa.id ? '0 0 0 1.5px rgba(200,200,200,0.4), inset 0 0 40px rgba(255,255,255,0.12)' : 'none' }} />
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <span className="text-orange-400 font-bold">{villa.price}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{villa.name}</h3>
                        <p className="text-white/90 text-base leading-relaxed">{villa.description}</p>
                      </div>
                      <div className={`absolute bottom-0 left-0 right-0 flex justify-center pb-6 transition-all duration-500 z-20 ${hoveredVilla === villa.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                        <button onClick={() => openModal(villa)} className="px-8 py-2.5 bg-white/90 backdrop-blur-sm hover:bg-white/70 text-black font-medium text-sm rounded-full transition-all duration-300 border border-white/20">MORE INFO</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 max-w-md mx-auto">
          <button onClick={prevVilla} className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${((currentVillaIndex + 1) / (maxVillaIndex + 1)) * 100}%` }} />
          </div>
          <button onClick={nextVilla} className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </section>

      {/* ─── Section Pack Complet──────────── */}
      <section style={{ backgroundColor: '#130608' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* En-tête */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Pack Complet</h2>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50 mb-3 font-medium">Tout compris</p>
            <p className="text-white/60 text-base max-w-xl leading-relaxed">
              Choisissez la formule qui vous correspond.
            </p>
          </div>

          {/* Packs — layout alterné*/}
          <div className="flex flex-col gap-2">
            {packs.map((pack, index) => {
              const imageLeft = index % 2 === 0;
              return (
                <div
                  key={pack.id}
                  className="grid md:grid-cols-2 gap-10 items-center py-14"
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Image — contenue avec coins arrondis*/}
                  <div className={`${imageLeft ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                      <img
                        src={pack.image}
                        alt={pack.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      {/* Overlay léger */}
                      <div className="absolute inset-0 bg-black/15" />
                    </div>
                  </div>

                  {/* Texte */}
                  <div className={`${imageLeft ? 'md:order-2' : 'md:order-1'}`}>
                    {/* Tag */}
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4 font-medium">
                      {pack.tag}
                    </p>

                    {/* Titre */}
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                      {pack.name}
                    </h3>

                    {/* Prix */}
                    <p className="text-white/60 text-sm mb-5">
                      À partir de{' '}
                      <span className="text-white font-semibold">{pack.price}</span>
                      {' '}— {pack.priceDetail}
                    </p>

                    {/* Intro */}
                    <p className="text-white/90 text-base leading-relaxed mb-2">
                      {pack.intro}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {pack.description}
                    </p>

                    {/* Liste inclus */}
                    <ul className="space-y-2.5 mb-8">
                      {pack.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80 text-sm leading-relaxed">
                          <span className="text-white/40 mt-0.5 flex-shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* CTA bouton bordé discret */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`tel:${pack.contact.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 px-7 py-3 border border-white/40 hover:border-white text-white text-sm font-medium rounded-full transition-all duration-300 hover:bg-white/5"
                      >
                        MORE INFO <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://wa.me/${pack.contact.replace(/\s/g, '').replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-orange-600 to-yellow-700 hover:from-orange-700 hover:to-yellow-800 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-orange-900/40"
                      >
                        Réserver via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* ─── Modal unifié ──────────────────────────────────────── */}
      {selectedItem && createPortal(
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop'}`} onClick={closeModal}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className={`relative bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${isClosing ? 'animate-modal-content-out' : 'animate-modal-content'}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all z-10 border border-white/20">
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="relative h-64 rounded-t-3xl overflow-hidden">
              <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute bottom-6 left-8 md:left-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{selectedItem.name}</h2>
                {selectedItem.stars > 0 && (
                  <div className="flex gap-1">
                    {[...Array(selectedItem.stars)].map((_, i) => <span key={i} className="text-orange-500 text-2xl">⭐</span>)}
                  </div>
                )}
                {selectedItem.subtitle && <p className="text-white/80 text-lg mt-2">{selectedItem.subtitle}</p>}
              </div>
            </div>
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <div className="text-4xl font-bold text-orange-500 mb-2">{selectedItem.price}</div>
                <div className="text-white/60">{selectedItem.capacity ? `Pour ${selectedItem.capacity}` : 'par nuit/personne'}</div>
              </div>
              {selectedItem.fullContent && (
                <div className="mb-8">
                  <p className="text-white/80 text-lg leading-relaxed">{selectedItem.fullContent}</p>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-6">Ce package inclut :</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {selectedItem.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:${selectedItem.contact.replace(/\s/g, '')}`} className="px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-700 hover:from-orange-700 hover:to-yellow-800 text-white font-semibold rounded-full transition-all duration-300 text-center shadow-lg shadow-orange-500/50">
                  Appeler : {selectedItem.contact}
                </a>
                <a href={`https://wa.me/${selectedItem.contact.replace(/\s/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 text-center border border-white/20">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style jsx>{`
        @keyframes letter-fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-letter-fade-in { animation: letter-fade-in 0.15s ease-out; }
        @keyframes modal-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-backdrop-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes modal-content-in {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modal-content-out {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.95) translateY(20px); }
        }
        .animate-modal-backdrop { animation: modal-backdrop-in 0.3s ease-out; }
        .animate-modal-backdrop-out { animation: modal-backdrop-out 0.3s ease-out; }
        .animate-modal-content { animation: modal-content-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-modal-content-out { animation: modal-content-out 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default HebergementPage;