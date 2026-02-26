import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronRight, MapPin } from 'lucide-react';

// Couleur bordeaux
const TML_COLOR = 'linear-gradient(135deg, #8B1A4A 0%, #C0255F 100%)';
const TML_BG = '#0e0608';
const TML_CARD_BG = '#160a0d';
const TML_BORDER = 'rgba(139,26,74,0.35)';

// ─── Données du programme ────────────────────────────────────────────────────

const days = [
  {
    id: 1,
    label: 'JOUR 1',
    date: '29 Octobre',
    fullDate: 'Jeudi 29 Octobre 2026',
    theme: 'Grand Carnaval & Ouverture',
    highlights: ['Grand Carnaval', 'Défilé de rue', 'Cérémonie officielle', 'DJ Opening'],
    stages: [
      {
        name: 'DANS LES RUES',
        host: 'Grand Carnaval',
        artists: [
          { name: 'Rassemblement', note: 'Point de départ carnaval' },
          { name: 'Défilé Carnaval', note: 'Costumes & percussions' },
          { name: 'Parade Colorée', note: 'Rues principales de Tamatave' },
          { name: 'Animations', note: 'Groupes de danse de rue' },
          { name: 'Cortège Final', note: "Arrivée Place de l'Hôtel de Ville" },
        ],
      },
      {
        name: 'SCÈNE OFFICIELLE',
        host: "Cérémonie d'Ouverture",
        artists: [
          { name: 'Cérémonie Officielle', note: 'Discours & inauguration' },
          { name: 'Shyn — Allocution', note: 'Co-fondateur MAKUA' },
          { name: 'Commune de Toamasina', note: 'Représentant institutionnel' },
          { name: 'Performance Inaugurale', note: 'Artiste surprise' },
          { name: 'DJ Set Ouverture', note: 'Lancement des festivités' },
          { name: 'Animations Nocturnes', note: 'Soirée de bienvenue' },
        ],
      },
      {
        name: 'VILLAGE CULTUREL',
        host: 'Vita Malagasy',
        artists: [
          { name: 'Ouverture des Stands', note: 'Inauguration village' },
          { name: 'Artisanat Local', note: 'Démos en direct' },
          { name: 'Gastronomie Est', note: 'Spécialités malgaches' },
          { name: 'Percussions Traditionnelles', note: 'Initiation instruments' },
          { name: 'Soirée Culturelle', note: 'Contes & musique locale' },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'JOUR 2',
    date: '30 Octobre',
    fullDate: 'Vendredi 30 Octobre 2026',
    theme: 'Jeunes Talents & Découverte',
    highlights: ['Mad Max', 'LJO', 'Reko Band', 'Artistes émergents'],
    stages: [
      {
        name: 'SCÈNE PRINCIPALE',
        host: null,
        artists: [
          { name: 'DJ Makua', note: 'Opening Set' },
          { name: 'Tamatave Youth', note: 'Sélection locale jeunesse' },
          { name: 'Reko Band', note: 'Folk / Fusion' },
          { name: 'LJO', note: 'Hip-Hop / R&B' },
          { name: 'Mad Max', note: 'Urbain / Rap' },
          { name: 'DJ Set Closing', note: 'Animations nocturnes' },
        ],
      },
      {
        name: 'SCÈNE DÉCOUVERTE',
        host: 'Révélations 2026',
        artists: [
          { name: 'Kalinda', note: 'Révélation locale' },
          { name: 'Tsiory', note: 'Acoustic / Pop' },
          { name: 'Aina B', note: 'Soul / Afro' },
          { name: 'Ndriky', note: 'Rap malgache' },
          { name: 'Voniny', note: 'R&B / Fusion' },
          { name: 'More to be announced', note: '' },
        ],
      },
      {
        name: 'VILLAGE CULTUREL',
        host: 'Vita Malagasy',
        artists: [
          { name: 'Ateliers Artisanat', note: 'Vannerie & sculpture' },
          { name: 'Bijoux Locaux', note: 'Pierres semi-précieuses' },
          { name: 'Cuisine Live', note: 'Démo gastronomique' },
          { name: 'Tisserands', note: 'Tissage traditionnel' },
          { name: 'Soirée Artisans', note: 'Ventes & rencontres' },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'JOUR 3',
    date: '31 Octobre',
    fullDate: 'Samedi 31 Octobre 2026',
    theme: 'Culture & Patrimoine',
    highlights: ['Joyce Mena', 'Basta Lion', 'Lion Hill', 'Rim-Ka'],
    stages: [
      {
        name: 'SCÈNE PRINCIPALE',
        host: null,
        artists: [
          { name: 'Joyce Mena', note: 'Soul / Pop' },
          { name: 'Rim-Ka', note: 'Rap / Urbain' },
          { name: 'Basta Lion', note: 'Reggae / Dancehall' },
          { name: 'Lion Hill', note: 'Musique Urbaine' },
          { name: 'DJ Set', note: 'Soirée dansante' },
          { name: 'More to be announced', note: '' },
        ],
      },
      {
        name: 'SCÈNE DÉCOUVERTE',
        host: 'Patrimoine & Traditions',
        artists: [
          { name: 'Hira Gasy', note: 'Art traditionnel' },
          { name: 'Salegy Band', note: 'Rythmes du Nord' },
          { name: 'Tsapiky Crew', note: 'Sud de Madagascar' },
          { name: 'Marovany', note: 'Instruments anciens' },
          { name: 'Chorale Est', note: 'Voix de Tamatave' },
        ],
      },
      {
        name: 'VILLAGE CULTUREL',
        host: 'Stand-Musée Tamatave',
        artists: [
          { name: 'Expo Photos', note: 'Histoire de Tamatave' },
          { name: 'Tenues Traditionnelles', note: 'Défilé & présentation' },
          { name: "Cérémonie Laurier d'Or", note: 'Distinction honorifique 2026' },
          { name: 'Gastronomie', note: 'Sainte-Marie & Maroantsetra' },
          { name: 'Reboisement', note: 'Sensibilisation écologique' },
        ],
      },
    ],
  },
  {
    id: 4,
    label: 'JOUR 4',
    date: '1er Novembre',
    fullDate: '1er Novembre 2026',
    theme: 'Grande Finale',
    highlights: ['DENISE', 'SHYN', 'Lion Hill', 'Basta Lion'],
    stages: [
      {
        name: 'SCÈNE PRINCIPALE',
        host: null,
        artists: [
          { name: 'Joyce Mena', note: 'Set spécial clôture' },
          { name: 'Lion Hill', note: 'Musique Urbaine' },
          { name: 'Basta Lion', note: 'Reggae / Dancehall' },
          { name: 'DENISE', note: 'Pop / Afro-Pop ★' },
          { name: 'SHYN', note: 'R&B / Pop — Headliner ★' },
          { name: 'After — DJ jusqu\'à l\'aube', note: '' },
        ],
      },
      {
        name: 'SCÈNE DÉCOUVERTE',
        host: 'Surprise Acts',
        artists: [
          { name: 'Jeunes Talents', note: 'Révélations 2026' },
          { name: 'Reko Band', note: 'Set acoustique spécial' },
          { name: 'LJO', note: 'Hip-Hop' },
          { name: 'Mad Max', note: 'Rap / Énergie' },
          { name: '??? Surprise Guest', note: 'Invité inattendu' },
        ],
      },
      {
        name: 'VILLAGE CULTUREL',
        host: 'Clôture & Héritage',
        artists: [
          { name: 'Marché Final', note: 'Dernière chance achats' },
          { name: "Plantation d'Arbres", note: 'Un billet = un arbre' },
          { name: 'Parade de Clôture', note: 'Défilé final coloré' },
          { name: "Feux d'Artifice", note: 'Spectacle pyrotechnique' },
          { name: 'Mot de Clôture', note: 'Shyn & Denise — Au revoir' },
        ],
      },
    ],
  },
];

// ─── Modal ───────────────────────────────────────────────────────────────────

const ScheduleModal = ({ day, onClose }) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-5xl mx-4 my-10 rounded-xl overflow-hidden shadow-2xl animate-tml-modal"
        style={{ backgroundColor: TML_BG, border: `1px solid ${TML_BORDER}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header modal */}
        <div
          className="relative px-8 py-8 flex items-start justify-between"
          style={{ background: TML_COLOR, borderBottom: `1px solid rgba(255,255,255,0.1)` }}
        >
          <div>
            <p className="text-white/60 text-xs uppercase tracking-[0.35em] mb-1 font-medium">
              MAKUA FESTIVAL 2026
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{day.label} — {day.fullDate}</h2>
            <p className="text-white/70 text-sm uppercase tracking-widest mt-1">{day.theme}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* style de Colonnes */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {day.stages.map((stage, si) => (
              <div
                key={si}
                className="flex flex-col rounded-lg overflow-hidden"
                style={{ backgroundColor: TML_CARD_BG, border: `1px solid ${TML_BORDER}` }}
              >
                {/* En-tête colonne bordeaux */}
                <div
                  className="px-4 py-4 text-center"
                  style={{ background: TML_COLOR }}
                >
                  <p className="text-white font-bold text-xs uppercase tracking-[0.2em]">
                    {stage.name}
                  </p>
                  {stage.host && (
                    <>
                      <div
                        className="w-10 mx-auto my-2"
                        style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.35)' }}
                      />
                      <p className="text-white/70 text-xs uppercase tracking-[0.15em]">
                        {stage.host}
                      </p>
                    </>
                  )}
                </div>

                {/* Liste artistes — noms centrés, espacés, style TML */}
                <div className="flex flex-col">
                  {stage.artists.map((artist, ai) => (
                    <div
                      key={ai}
                      className="px-4 py-3.5 text-center"
                      style={{
                        borderBottom: ai < stage.artists.length - 1
                          ? '1px solid rgba(139,26,74,0.2)'
                          : 'none',
                      }}
                    >
                      <p
                        className="text-sm font-medium tracking-wide"
                        style={{
                          color: artist.name.includes('More to be') || artist.name.includes('???')
                            ? 'rgba(255,255,255,0.4)'
                            : 'rgba(255,255,255,0.92)',
                          fontStyle: artist.name.includes('More to be') ? 'italic' : 'normal',
                        }}
                      >
                        {artist.name}
                      </p>
                      {artist.note && (
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {artist.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-center text-xs mt-6 tracking-wide"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            Programme indicatif · sujet à modifications · Avenue de l'Indépendance, Toamasina
          </p>
        </div>
      </div>

      <style>{`
        @keyframes tml-modal-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-tml-modal {
          animation: tml-modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>,
    document.body
  );
};

// ─── Section Principale ──────────────────────────────────────────────────────

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState(null);

  return (
    <section style={{ backgroundColor: TML_BG }} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* En-tête */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Au programme</h2>
          <p className="text-base max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            4 jours de festival sur l'Avenue de l'Indépendance.<br />
            Cliquez sur un jour pour voir le programme complet.
          </p>
        </div>

        {/* 4 cartes de jours — style TML */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day)}
              className="group text-left rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: TML_CARD_BG,
                border: `1px solid ${TML_BORDER}`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
            >
              {/* Header carte bordeaux */}
              <div
                className="px-5 py-5 text-center"
                style={{ background: TML_COLOR }}
              >
                <p className="text-white/70 text-xs uppercase tracking-[0.25em] font-medium mb-1">
                  {day.label}
                </p>
                <p className="text-white font-bold text-lg leading-tight">{day.date}</p>
                <div
                  className="w-8 mx-auto my-2"
                  style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}
                />
                <p className="text-white/65 text-xs uppercase tracking-wider">{day.theme}</p>
              </div>

              {/* Corps carte */}
              <div className="px-5 py-5">
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-3 font-medium"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Têtes d'affiche
                </p>
                <ul className="space-y-2.5 mb-5">
                  {day.highlights.map((name, i) => (
                    <li
                      key={i}
                      className="text-sm font-medium text-center"
                      style={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                      {name}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div
                  className="flex items-center justify-center gap-2 pt-4 text-xs font-medium transition-colors"
                  style={{
                    borderTop: '1px solid rgba(139,26,74,0.3)',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  <span className="group-hover:text-white/70 transition-colors">
                    Programme complet
                  </span>
                  <ChevronRight
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:text-white/70"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Mention lieu */}
        <div
          className="flex items-center gap-2 mt-8 text-xs"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          <MapPin className="w-3.5 h-3.5" />
          Avenue de l'Indépendance, Toamasina — Entrée à partir de 12h chaque jour
        </div>
      </div>

      {/* Modal */}
      {activeDay && (
        <ScheduleModal day={activeDay} onClose={() => setActiveDay(null)} />
      )}
    </section>
  );
};

export default ScheduleSection;