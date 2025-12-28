import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { AIChat } from './components/AIChat';
import { SectionId } from './types';

function App() {
  // Static Images - Clean Garage / Detail Studio theme
  const desktopImage = "https://images.unsplash.com/photo-1550523000-843c08272559?q=80&w=2070&auto=format&fit=crop"; 
  const mobileImage = "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1969&auto=format&fit=crop";

  const [aboutBg, setAboutBg] = useState<string>(desktopImage);

  useEffect(() => {
    const updateImage = () => {
      setAboutBg(window.innerWidth < 768 ? mobileImage : desktopImage);
    };
    updateImage();
    window.addEventListener('resize', updateImage);
    return () => window.removeEventListener('resize', updateImage);
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
                <img 
                  src={aboutBg} 
                  alt="Clean Garage Workshop" 
                  className="w-full h-full object-cover opacity-40"
                />
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