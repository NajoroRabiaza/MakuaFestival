import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag } from 'lucide-react';
import { FESTIVAL_CONFIG } from '../utils/constants';
import makuaLogo from '../assets/makua-logo.jpeg';

const menuItems = [
  {
    label: 'ACCUEIL',
    path: '/',
    type: 'page'
  },
  {
    label: 'DÉCOUVRIR',
    path: '/',
    sectionId: 'discover',
    type: 'section'
  },
  {
    label: 'ARTISTS',
    path: '/',
    sectionId: 'lineup',
    type: 'section'
  },
  {
    label: 'BILLETTERIE',
    path: '/billetterie',
    type: 'page'
  },
  {
    label: 'HÉBERGEMENT',
    path: '/hebergement',
    type: 'page'
  }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Détection du scroll pour changer le style du header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuItemClick = (item, e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (item.type === 'section') {
      // Si on est déjà sur la homepage
      if (location.pathname === '/') {
        // Attendre un peu que le menu se ferme
        setTimeout(() => {
          scrollToSection(item.sectionId);
        }, 50);
      } else {
        // Sinon, naviguer vers homepage puis scroller
        navigate('/');
        setTimeout(() => {
          scrollToSection(item.sectionId);
        }, 300);
      }
    } else if (item.type === 'page') {
      navigate(item.path);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-5 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center transition-transform hover:scale-105">
        <img 
          src={makuaLogo} 
          alt="MAKUA Festival" 
          className={`w-auto object-contain transition-all duration-300 ${
            isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-20 lg:h-24'
          }`}
        />
      </Link>

      {/* Center Menu Button with Dropdown */}
      <div 
        className="absolute left-1/2 -translate-x-1/2"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
          <Menu className="w-5 h-5 text-white" />
        </button>

        {/* Dropdown Menu Horizontal*/}
        {isMenuOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 animate-menu-fade-in">
            {/* Menu content horizontal */}
            <div className="relative bg-black/60 backdrop-blur-xl border-t border-white/10 px-8 py-4 rounded-sm shadow-2xl">
              <div className="flex items-center gap-12">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.type === 'page' ? item.path : `#${item.sectionId}`}
                    onClick={(e) => handleMenuItemClick(item, e)}
                    className="group relative py-2 transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                    <span className="text-white/90 group-hover:text-white font-medium text-sm uppercase tracking-wider transition-colors">
                      {item.label}
                    </span>
                    
                    {/* Underline on hover*/}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Language Selector */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
          <span className="text-white text-sm font-medium">FR</span>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Shopping Bag */}
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
          <ShoppingBag className="w-5 h-5 text-white" />
        </button>

        {/* Sign Up Button */}
        <button className="hidden md:block px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/20 transition-all">
          Sign Up
        </button>

        {/* Log In Button */}
        <button className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all">
          Log In
        </button>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes menu-fade-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .animate-menu-fade-in {
          animation: menu-fade-in 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;