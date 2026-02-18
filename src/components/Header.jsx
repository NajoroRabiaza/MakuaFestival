import React from 'react';
import { Menu, ShoppingBag } from 'lucide-react';
import { FESTIVAL_CONFIG } from '../utils/constants';
import makuaLogo from '../assets/makua-logo.jpeg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-6">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="block hover:opacity-90 transition-opacity">
          <img 
            src={makuaLogo} 
            alt="MAKUA Festival" 
            className="h-16 md:h-20 lg:h-28 w-auto object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Center Menu Button */}
      <button className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Language Selector */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
          {/* <span className="text-xl">🇬🇧</span> */}
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
    </header>
  );
};

export default Header;
