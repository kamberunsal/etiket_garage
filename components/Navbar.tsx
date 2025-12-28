import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

interface NavLinkProps {
  item: { name: string; id: SectionId };
  onClick: (id: SectionId) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => (
  <button
    onClick={() => onClick(item.id)}
    className="font-display text-[10px] md:text-xs lg:text-sm font-bold text-gray-300 hover:text-brand-yellow transition-colors duration-200 tracking-widest relative group uppercase whitespace-nowrap"
  >
    {item.name}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
  </button>
);

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Check initial position on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom smooth scroll function with easing
  const smoothScrollTo = (id: SectionId) => {
    setIsMobileMenuOpen(false);
    
    const element = document.getElementById(id);
    if (!element) return;

    // Navbar height (80px) + a small buffer (5px) for perfect alignment
    const headerOffset = 85;
    const elementPosition = element.getBoundingClientRect().top;
    const startPosition = window.scrollY;
    // If it's the hero section, go to the very top (0), otherwise calculate offset
    const targetPosition = id === SectionId.HERO ? 0 : startPosition + elementPosition - headerOffset;
    
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1000ms = 1 second for a slower, softer feel
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + (distance * ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  };

  const leftNavItems = [
    { name: 'ANA SAYFA', id: SectionId.HERO },
    { name: 'HAKKIMIZDA', id: SectionId.ABOUT },
  ];

  const rightNavItems = [
    { name: 'HİZMETLER', id: SectionId.SERVICES },
    { name: 'BLOG', id: SectionId.BLOG },
    { name: 'İLETİŞİM', id: SectionId.CONTACT },
  ];

  const allNavItems = [...leftNavItems, ...rightNavItems];

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* 
        Background Layer
      */}
      <div 
        className={`absolute inset-0 w-full h-full transition-all duration-300 pointer-events-none ${
          isScrolled ? 'bg-brand-dark/95 backdrop-blur-lg border-b border-brand-red/20 shadow-lg' : 'bg-transparent'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Flex Container - Justify Center ensures Logo is always middle */}
        <div className="flex items-center justify-center h-20 relative">
          
          {/* Desktop Left Menu - Visible on MD and up (Tablet/Laptop/Desktop) */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-12 mr-4 lg:mr-10">
            {leftNavItems.map((item) => (
              <NavLink key={item.name} item={item} onClick={smoothScrollTo} />
            ))}
          </div>

          {/* Animated Logo Container */}
          <motion.div 
            className="flex-shrink-0 flex items-center justify-center cursor-pointer z-50 relative group px-2 md:px-6 py-2" 
            onClick={() => smoothScrollTo(SectionId.HERO)}
            initial="expanded"
            whileHover="expanded"
            animate={isScrolled ? "collapsed" : "expanded"}
          >
            {/* Left Text (ETIKET) - Collapses to Right */}
            <motion.div
              variants={{
                collapsed: { width: 0, opacity: 0, x: 20 },
                expanded: { width: "auto", opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="font-display font-black text-lg md:text-2xl tracking-tighter text-brand-red italic block px-2" style={{ textShadow: '0 0 15px rgba(168,5,52,0.3)', transform: 'skewX(-10deg)' }}>
                ETIKET
              </span>
            </motion.div>
            
            {/* Center Lightning Bolt - Always Visible */}
            <motion.div 
              className="relative mx-1 md:mx-2 z-10"
              variants={{
                collapsed: { scale: 1.5, rotate: 0, filter: "drop-shadow(0 0 20px rgba(253,184,19,0.9))" },
                expanded: { scale: 1, rotate: 360, filter: "drop-shadow(0 0 5px rgba(253,184,19,0.5))" }
              }}
              transition={{ duration: 0.6, type: "spring" }}
            >
               <svg 
                 viewBox="0 0 24 40" 
                 className="h-6 w-4 md:h-10 md:w-7 transform skew-x-[-10deg]"
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M16 0L2 22H12L10 40L24 18H14L16 0Z" fill="#fdb813"/>
               </svg>
            </motion.div>
            
            {/* Right Text (GARAGE) - Collapses to Left */}
            <motion.div
              variants={{
                collapsed: { width: 0, opacity: 0, x: -20 },
                expanded: { width: "auto", opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="font-display font-black text-lg md:text-2xl tracking-tighter text-brand-red italic block px-2" style={{ textShadow: '0 0 15px rgba(168,5,52,0.3)', transform: 'skewX(-10deg)' }}>
                GARAGE
              </span>
            </motion.div>
          </motion.div>

          {/* Desktop Right Menu - Visible on MD and up (Tablet/Laptop/Desktop) */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-12 ml-4 lg:ml-10">
            {rightNavItems.map((item) => (
              <NavLink key={item.name} item={item} onClick={smoothScrollTo} />
            ))}
          </div>

          {/* Mobile Menu Button - Hidden on MD and up */}
          <div className="md:hidden absolute right-0 z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 bg-brand-dark/50 rounded-md backdrop-blur-sm"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Premium Full Screen Mobile Menu Overlay - Hidden on MD and up */}
      <div 
        className={`fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-yellow to-brand-red"></div>
        
        <div className="flex flex-col space-y-8 text-center">
          {allNavItems.map((item) => (
            <button
              key={item.name}
              onClick={() => smoothScrollTo(item.id)}
              className="text-3xl font-display font-bold text-white hover:text-brand-red transition-colors tracking-widest relative group"
            >
              {item.name}
              <span className="block h-0.5 bg-brand-yellow w-0 group-hover:w-full transition-all duration-300 mx-auto mt-2"></span>
            </button>
          ))}
        </div>

        <div className="absolute bottom-10 text-gray-500 text-xs font-sans tracking-widest">
          ETIKET GARAGE © 2024
        </div>
      </div>
    </nav>
  );
};