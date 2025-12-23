import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { SectionId } from '../types';
import { generateImage } from '../services/geminiService';

export const Hero: React.FC = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const loadHeroImage = async () => {
      // 1. Detect Screen Size
      const isMobile = window.innerWidth < 768;
      
      // 2. Define Cache Key based on device (v7 for Orange/Red theme)
      const cacheKey = isMobile ? 'hero_bg_mobile_v7_mix' : 'hero_bg_desktop_v7_mix';
      
      const cachedImage = localStorage.getItem(cacheKey);
      if (cachedImage) {
        setBgImage(cachedImage);
        return;
      }

      // 3. Customize Prompt & Aspect Ratio for Mobile
      let prompt = "";
      let ratio: "16:9" | "9:16" = "16:9";
      // Fallback URLs (Orange/Red themed)
      let fallbackUrl = "";

      if (isMobile) {
         prompt = "Vertical cinematic shot of a matte black hypercar front view. Split lighting: intense orange neon on the left, aggressive red neon on the right. Dark, smoky garage atmosphere. 8k, photorealistic.";
         ratio = "9:16";
         fallbackUrl = "https://images.unsplash.com/photo-1618359103063-4246b9766946?q=80&w=1964&auto=format&fit=crop"; // Dark moody car
      } else {
         prompt = "A photorealistic, cinematic wide shot of a customized black super car in a futuristic garage. Dual tone lighting: vibrant orange overhead lights and red ground effects/underglow. Highly detailed, sharp focus, glossy reflections, aggressive stance.";
         ratio = "16:9";
         fallbackUrl = "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064&auto=format&fit=crop"; // Car with warm/red lighting
      }

      // Try generating AI image
      let image = await generateImage(prompt, ratio);
      
      // If AI fails, use fallback
      if (!image) {
        console.log("Using fallback image for Hero");
        image = fallbackUrl;
      }
      
      if (image) {
        setBgImage(image);
        try {
          // Only cache if it's a data URL (AI generated), don't necessarily need to cache external URLs but it's fine
          localStorage.setItem(cacheKey, image);
        } catch (e) {
          console.warn("Storage full, cannot cache image");
        }
      }
    };

    loadHeroImage();
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
        {bgImage ? (
          <img
            src={bgImage}
            alt="Luxury Garage Background"
            // Increased opacity from 60 to 80 and removed heavy blur
            className="w-full h-full object-cover opacity-80 scale-105 transition-opacity duration-1000"
          />
        ) : (
          // Better Loading Placeholder - Visible Grid Pattern
          <div className="w-full h-full bg-brand-dark relative overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
          </div>
        )}
        
        {/* Lighter gradients to allow image to show through */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-brand-dark/80"></div>
        
        {/* Dual Accent Glows: Orange (Left) and Red (Right) */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-yellow/10 blur-[150px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-red/10 blur-[150px] rounded-full mix-blend-screen"></div>
        
        {/* Reduced noise opacity */}
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
            {/* Direct Orange Text (brand-yellow is defined as orange in config) */}
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