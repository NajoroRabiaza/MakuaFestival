// Festival configuration
export const FESTIVAL_CONFIG = {
  name: 'MAKUA FESTIVAL',
  dates: {
    start: '29 Octobre',
    end: '1 Novembre 2026',
    target: new Date('2026-10-29T00:00:00').getTime()
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

// ✅ Video hébergée sur Cloudinary
export const VIDEO_CONFIG = {
  src: 'https://res.cloudinary.com/dvmuwvc4l/video/upload/v1775510481/MAKUA_FESTIVAL_jsq9fi.mp4',
  poster: '/MAKUA_FESTIVAL_poster.jpg',
  type: 'video/mp4'
};

// Navigation items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'lineup', label: 'Lineup' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'info', label: 'Info' }
];