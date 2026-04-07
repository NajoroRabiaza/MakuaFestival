import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, ChevronDown, ChevronUp, X } from 'lucide-react';
import { FESTIVAL_CONFIG } from '../utils/constants';
import makuaLogo from '../assets/makua-logo.jpeg';

const menuItems = [
  {
    label: 'ACCUEIL',
    path: '/',
    type: 'page',
    hasSubmenu: true,
    submenu: [
      { label: 'Découvrir', path: '/', sectionId: 'discover', type: 'section' },
      { label: 'Artists', path: '/', sectionId: 'lineup', type: 'section' },
      { label: 'Programme', path: '/', sectionId: 'schedule', type: 'section' }
    ]
  },
  { label: 'BILLETTERIE', path: '/billetterie', type: 'page' },
  { label: 'HÉBERGEMENT', path: '/hebergement', type: 'page' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile au changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  const handleMenuItemClick = (item, e) => {
    e.preventDefault();

    if (item.hasSubmenu) {
      setOpenSubmenu(openSubmenu === item.label ? null : item.label);
      return;
    }

    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);

    if (item.type === 'section') {
      if (location.pathname === '/') {
        setTimeout(() => scrollToSection(item.sectionId), 50);
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(item.sectionId), 300);
      }
    } else if (item.type === 'page') {
      navigate(item.path);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-12 md:py-5 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center transition-transform hover:scale-105 z-10">
          <img
            src={makuaLogo}
            alt="MAKUA Festival"
            className={`w-auto object-contain transition-all duration-300 ${
              isScrolled ? 'h-10 md:h-16' : 'h-12 md:h-20 lg:h-24'
            }`}
          />
        </Link>

        {/* Desktop Center Menu Button */}
        <div
          className="absolute left-1/2 -translate-x-1/2 hidden md:block"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => { setIsMenuOpen(false); setOpenSubmenu(null); }}
        >
          <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
            <Menu className="w-5 h-5 text-white" />
          </button>

          {isMenuOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 animate-menu-fade-in">
              <div className="relative bg-black/60 backdrop-blur-xl border-t border-white/10 px-8 py-4 rounded-sm shadow-2xl">
                <div className="flex items-center gap-12">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="relative"
                      onMouseEnter={() => item.hasSubmenu && setOpenSubmenu(item.label)}
                      onMouseLeave={() => item.hasSubmenu && setOpenSubmenu(null)}
                    >
                      <a
                        href={item.path}
                        onClick={(e) => handleMenuItemClick(item, e)}
                        className="group relative py-2 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2"
                      >
                        <span className="text-white/90 group-hover:text-white font-medium text-sm uppercase tracking-wider transition-colors">
                          {item.label}
                        </span>
                        {item.hasSubmenu && (
                          openSubmenu === item.label
                            ? <ChevronUp className="w-3.5 h-3.5 text-white/90" />
                            : <ChevronDown className="w-3.5 h-3.5 text-white/90" />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </a>

                      {item.hasSubmenu && openSubmenu === item.label && (
                        <div className="absolute left-1/2 -translate-x-1/2 animate-submenu-fade-in">
                          <div className="absolute left-0 right-0 h-6" />
                          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl px-6 py-2">
                            <div className="flex items-center gap-12">
                              {item.submenu.map((subItem, subIndex) => (
                                <a
                                  key={subIndex}
                                  href={subItem.path}
                                  onClick={(e) => handleMenuItemClick(subItem, e)}
                                  className="group relative py-2 cursor-pointer whitespace-nowrap"
                                >
                                  <span className="text-white font-medium text-sm uppercase tracking-wider">
                                    {subItem.label}
                                  </span>
                                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4 z-10">
          {/* Shopping Bag */}
          <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>

          {/* Sign Up — desktop only */}
          <button className="hidden md:block px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/20 transition-all">
            Sign Up
          </button>

          {/* Log In */}
          <button className="px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-white text-black font-semibold text-sm md:text-base hover:bg-white/90 transition-all">
            Log In
          </button>

          {/* Burger mobile only */}
          <button
            className="md:hidden w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen
              ? <X className="w-4 h-4 text-white" />
              : <Menu className="w-4 h-4 text-white" />
            }
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-72 bg-black/90 backdrop-blur-xl border-l border-white/10 flex flex-col pt-24 px-8 pb-8 animate-slide-in">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.path}
                    onClick={(e) => handleMenuItemClick(item, e)}
                    className="flex items-center justify-between py-4 border-b border-white/10 text-white font-medium text-sm uppercase tracking-wider hover:text-white/70 transition-colors"
                  >
                    {item.label}
                    {item.hasSubmenu && (
                      openSubmenu === item.label
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                    )}
                  </a>

                  {item.hasSubmenu && openSubmenu === item.label && (
                    <div className="flex flex-col pl-4 py-2 gap-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.path}
                          onClick={(e) => handleMenuItemClick(subItem, e)}
                          className="py-3 text-white/70 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Sign Up dans le menu mobile */}
            <div className="mt-auto">
              <button className="w-full py-3 rounded-full bg-white/10 border border-white/30 text-white font-medium hover:bg-white/20 transition-all">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes menu-fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes submenu-fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-menu-fade-in { animation: menu-fade-in 0.2s ease-out; }
        .animate-submenu-fade-in { animation: submenu-fade-in 0.2s ease-out; }
        .animate-slide-in { animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </>
  );
};

export default Header;