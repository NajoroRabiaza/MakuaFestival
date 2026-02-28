import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Ticket, BedDouble } from 'lucide-react';
import Header from '../components/Header';

const NotFoundPage = () => {
  const [particles, setParticles] = useState([]);

  // Générer des particules flottantes une seule fois
  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    );
  }, []);

  const links = [
    { to: '/',            icon: Home,    label: 'Accueil',     sub: 'Retour à la page principale' },
    { to: '/billetterie', icon: Ticket,  label: 'Billetterie', sub: 'Acheter vos pass festival' },
    { to: '/hebergement', icon: BedDouble, label: 'Hébergement', sub: 'Réserver votre séjour' },
  ];

  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      <Header />

      {/* Particules flottantes */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `rgba(234, 88, 12, ${p.opacity})`,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Halo de lumière arrière */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* 404 grand */}
        <div className="relative mb-6 select-none">
        <p
        className="font-black leading-none tracking-tighter"
        style={{
            fontSize: 'clamp(120px, 25vw, 220px)',
            // Augmentation légère de l'opacité (18% -> 8%)
            background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            letterSpacing: '-0.04em',
        }}
        >
            404
          </p>
          {/* Ligne orange sous le 404 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              bottom: '8px',
              width: '60px',
              height: '3px',
              background: 'linear-gradient(to right, #ea580c, #f59e0b)',
            }}
          />
        </div>

        {/* Texte */}
        <p className="text-xs uppercase tracking-[0.35em] text-orange-500 mb-4 font-medium">
          MAKUA FESTIVAL 2026
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page introuvable
        </h1>
        <p className="text-white/50 text-base max-w-md leading-relaxed mb-12">
          Cette page n'existe pas ou a été déplacée.<br />
          Le festival, lui, est bien au rendez-vous — <span className="text-white/70">29 Oct au 1er Nov 2026</span>.
        </p>

        {/* Liens rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-12">
          {links.map(({ to, icon: Icon, label, sub }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-center gap-3 rounded-2xl px-6 py-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #ea580c, #f59e0b)' }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-white/40 text-xs mt-0.5">{sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Retour simple */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Revenir à la page précédente
        </button>
      </div>

      <style>{`
        @keyframes float-particle {
          from { transform: translateY(0px) translateX(0px); }
          to   { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;