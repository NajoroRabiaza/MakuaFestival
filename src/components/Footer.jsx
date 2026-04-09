import React from 'react';
import { Facebook, Instagram, Youtube, Music } from 'lucide-react';
import makuaLogo from '../assets/makua-logo.jpeg';

const Footer = () => {
  // Liste de tes sponsors
  const sponsors = [
    { name: 'Canal+', src: '/image/canal+.png' },
    { name: 'CFAO Mobility', src: '/image/cfao.jpeg' },
    { name: 'Nova Terre', src: '/image/novaterre.png' },
    { name: 'SOATRANS Plus', src: '/image/soatrans.png' },
    { name: 'World Cola', src: '/image/word_cola.png' },
    { name: 'Yas', src: '/image/yas.svg' }
  ];

  return (
    <footer className="relative bg-black text-white py-16 px-6 md:px-12">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img 
          src={makuaLogo} 
          alt="MAKUA Festival" 
          className="h-24 md:h-32 w-auto object-contain"
        />
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mb-16">
        <a 
          href="https://www.facebook.com/MakuaFestivalMusic" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
          aria-label="Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a 
          href="https://www.instagram.com/makuafestival" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a 
          href="https://www.tiktok.com/@makuafestival" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
          aria-label="TikTok"
        >
          <Music className="w-5 h-5" />
        </a>
        <a 
          href="https://www.youtube.com/@makuafestival" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
          aria-label="YouTube"
        >
          <Youtube className="w-5 h-5" />
        </a>
      </div>

      {/* Sponsors Section */}
      <div className="border-t border-white/10 pt-12 mb-12">
        <h3 className="text-center text-sm uppercase tracking-wider text-white/60 mb-8">
          Nos Partenaires
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index} 
              className="w-32 h-16 bg-white rounded-md flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={sponsor.src} 
                alt={`Logo ${sponsor.name}`} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="border-t border-white/10 pt-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-white/60">
          <p>©2026 MAKUA FESTIVAL By NajoroRabiaza</p>
          <span className="hidden md:inline">•</span>
          <a href="#terms" className="hover:text-white transition-colors">
            CONDITIONS D'UTILISATION
          </a>
          <span className="hidden md:inline">•</span>
          <a href="#privacy" className="hover:text-white transition-colors">
            POLITIQUE DE CONFIDENTIALITÉ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;