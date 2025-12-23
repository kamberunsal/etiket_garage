import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { AIChat } from './components/AIChat';
import { SectionId } from './types';
import { generateImage } from './services/geminiService';

function App() {
  const [aboutBg, setAboutBg] = useState<string | null>(null);

  useEffect(() => {
    const loadAboutImage = async () => {
      const isMobile = window.innerWidth < 768;
      const cacheKey = isMobile ? 'about_bg_mobile_v4' : 'about_bg_desktop_v4';

      let prompt = "";
      let ratio: "16:9" | "9:16" = "16:9";
      let fallbackUrl = "";

      if (isMobile) {
        prompt = "Vertical interior shot of modern high-end auto detailing studio, hexagonal lights on ceiling, clean polished floor reflection, 8k vertical.";
        ratio = "9:16";
        fallbackUrl = "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1969&auto=format&fit=crop"; // Auto detail vertical
      } else {
        prompt = "Interior of a modern high-end auto detailing studio, bright hexagonal ceiling lights, clean reflections on polished floor, professional workshop environment, depth of field, well lit.";
        ratio = "16:9";
        fallbackUrl = "https://images.unsplash.com/photo-1550523000-843c08272559?q=80&w=2070&auto=format&fit=crop"; // Auto detail shop
      }

      // 1. Check Cache
      const cachedImage = localStorage.getItem(cacheKey);
      if (cachedImage) {
        setAboutBg(cachedImage);
        return;
      }

      // 2. Set Fallback Immediately
      setAboutBg(fallbackUrl);

      // 3. Try AI
      try {
        const image = await generateImage(prompt, ratio);
        if (image) {
          setAboutBg(image);
          try {
            localStorage.setItem(cacheKey, image);
          } catch (e) { console.warn("Storage full"); }
        }
      } catch (e) {
        console.warn("Using fallback");
      }
    };
    loadAboutImage();
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-red selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* About Section Wrapper */}
        <section id={SectionId.ABOUT} className="relative py-12 md:py-16 lg:py-20 border-b border-brand-gray overflow-hidden">
            {/* Background for About Section */}
            <div className="absolute inset-0 z-0">
                {aboutBg ? (
                  <img 
                    src={aboutBg} 
                    alt="Clean Garage Workshop" 
                    // Increased opacity to 40
                    className="w-full h-full object-cover opacity-40"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-dark"></div>
                )}
                {/* Reduced overlay opacity */}
                <div className="absolute inset-0 bg-brand-dark/85"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-4 md:mb-6">GÜVEN VE <span className="text-brand-yellow">KALİTE</span></h2>
                <p className="text-gray-200 font-sans leading-relaxed text-sm md:text-base lg:text-lg px-2 lg:px-0 font-medium">
                    Etiket Garage, otomotiv estetiğinde mükemmelliği hedefleyen bir tutku projesidir. 
                    Kullandığımız her malzeme sertifikalıdır, uyguladığımız her işlem garanti altındadır. 
                    Şimşek kadar hızlı değil, şimşek kadar etkileyici sonuçlar için çalışıyoruz.
                </p>
                {/* Optimized Grid: 2 cols on mobile/tablet, 4 cols on desktop */}
                <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    <div className="p-4 md:p-6 border border-gray-700/50 rounded-sm bg-brand-dark/60 backdrop-blur-md hover:bg-brand-gray/40 transition-colors duration-300">
                        <span className="block text-2xl md:text-4xl font-display font-bold text-brand-red">500+</span>
                        <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1 block">Mutlu Müşteri</span>
                    </div>
                    <div className="p-4 md:p-6 border border-gray-700/50 rounded-sm bg-brand-dark/60 backdrop-blur-md hover:bg-brand-gray/40 transition-colors duration-300">
                        <span className="block text-2xl md:text-4xl font-display font-bold text-brand-red">5</span>
                        <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1 block">Yıl Garanti</span>
                    </div>
                    <div className="p-4 md:p-6 border border-gray-700/50 rounded-sm bg-brand-dark/60 backdrop-blur-md hover:bg-brand-gray/40 transition-colors duration-300">
                        <span className="block text-2xl md:text-4xl font-display font-bold text-brand-red">100%</span>
                        <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1 block">Müşteri Memnuniyeti</span>
                    </div>
                    <div className="p-4 md:p-6 border border-gray-700/50 rounded-sm bg-brand-dark/60 backdrop-blur-md hover:bg-brand-gray/40 transition-colors duration-300">
                        <span className="block text-2xl md:text-4xl font-display font-bold text-brand-red">1</span>
                        <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1 block">Günde Teslim (PDR)</span>
                    </div>
                </div>
            </div>
        </section>

        <Services />
        <Contact />
      </main>

      <AIChat />
    </div>
  );
}

export default App;