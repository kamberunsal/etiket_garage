import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  // Static Images
  const desktopImage = "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064&auto=format&fit=crop"; // Black Supercar with warm lighting
  const mobileImage = "https://images.unsplash.com/photo-1618359103063-4246b9766946?q=80&w=1964&auto=format&fit=crop"; // Vertical dark aggressive car

  const [bgImage, setBgImage] = useState<string>(desktopImage);

  useEffect(() => {
    // Simple responsive image selection
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setBgImage(mobileImage);
      } else {
        setBgImage(desktopImage);
      }
    };

    updateImage();
    window.addEventListener('resize', updateImage);
    return () => window.removeEventListener('resize', updateImage);
  }, []);

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 85;
    const elementPosition = element.getBoundingClientRect().top;
    const startPosition = window.scrollY;
    const targetPosition = startPosition + elementPosition - headerOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
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

  return (
    <div id={SectionId.HERO} className="relative h-screen w-full overflow-hidden bg-brand-dark flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Luxury Garage Background"
          className="w-full h-full object-cover opacity-80 scale-105"
        />
        
        {/* Overlays for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-brand-dark/80"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

        {/* Dual Accent Glows: Orange (Left) and Red (Right) */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-yellow/10 blur-[150px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-red/10 blur-[150px] rounded-full mix-blend-screen"></div>
        
        {/* Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left w-full mt-10 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 mb-4 md:mb-6 backdrop-blur-sm">
            <ShieldCheck className="h-3 w-3 md:h-4 md:w-4 text-brand-yellow" />
            <span className="text-brand-yellow text-[10px] md:text-xs font-display tracking-widest uppercase">Premium Araç Koruma</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-white leading-tight mb-4 md:mb-6 drop-shadow-2xl shadow-black">
            ARACINIZA <br className="hidden md:block" />
            DEĞER KATAN <br />
            <span className="text-brand-yellow drop-shadow-sm">ETİKET</span>
          </h1>
          
          <p className="mt-2 md:mt-4 max-w-2xl text-base md:text-lg lg:text-xl text-gray-200 font-sans font-light leading-relaxed mx-auto lg:mx-0 drop-shadow-md bg-black/30 backdrop-blur-sm p-4 rounded-lg lg:bg-transparent lg:p-0">
            Aracınız sadece bir taşıt değil, bir yatırımdır. Etiket Garage olarak, 
            en son teknoloji PPF ve boyasız göçük düzeltme teknikleriyle aracınızın değerini koruyoruz.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto px-4 sm:px-0">
            {/* Primary Button: Orange */}
            <button 
              onClick={() => smoothScrollTo(SectionId.SERVICES)}
              className="w-full sm:w-auto group relative px-8 py-4 bg-brand-yellow overflow-hidden rounded-sm font-display font-bold tracking-wider text-black shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              <span className="flex items-center justify-center lg:justify-start">
                HİZMETLERİ KEŞFET
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            {/* Secondary Button: Red Border */}
            <button 
              onClick={() => smoothScrollTo(SectionId.CONTACT)}
              className="w-full sm:w-auto px-8 py-4 border border-gray-600 hover:border-brand-red text-white hover:text-brand-red rounded-sm font-display font-bold tracking-wider transition-all duration-300 backdrop-blur-md bg-brand-dark/30 hover:bg-brand-red/10"
            >
              RANDEVU AL
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-dark to-transparent"></div>
    </div>
  );
};