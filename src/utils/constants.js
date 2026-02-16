// Festival configuration
export const FESTIVAL_CONFIG = {
  name: 'MAKUA FESTIVAL',
  dates: {
    start: '29 Octobre',
    end: '1 Novembre 2026',
    target: new Date('2026-10-29T00:00:00').getTime() // Fixed: October 29, 2026
  },
  location: {
    city: 'Toamasina',
    region: 'Tamatave',
    country: 'MADAGASCAR'
  },
  organizers: {
    main: 'Makua Entertainment',
    founders: 'Shyn & Denise',
    partner: 'Commune Urbaine de Toamasina'
  },
  description: 'Festival culturel et musical malgache - Musique, danse, traditions locales, artisanat et carnaval'
};

// Video configuration
export const VIDEO_CONFIG = {
  // src: '/MAKUA_FESTIVAL.mp4',
  type: 'video/mp4'
};

// Navigation items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'lineup', label: 'Lineup' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'info', label: 'Info' }
];