import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Hammer, Sparkles, Layers, Sun, CarFront } from 'lucide-react';
import { SectionId } from '../types';
import { generateImage } from '../services/geminiService';

const services = [
  {
    icon: <Shield className="h-8 w-8 md:h-10 md:w-10" />,
    title: "PPF Kaplama",
    desc: "Yüksek teknoloji poliüretan filmler ile aracınızı taş, çizik ve çevresel etkilere karşı zırhlayın.",
    accent: "border-brand-yellow" // Orange
  },
  {
    icon: <Hammer className="h-8 w-8 md:h-10 md:w-10" />,
    title: "Boyasız Göçük Düzeltme",
    desc: "Aracınızın orijinalliğini bozmadan, dolu hasarı ve park göçüklerini PDR tekniği ile kusursuz onarıyoruz.",
    accent: "border-brand-red" // Red
  },
  {
    icon: <Sparkles className="h-8 w-8 md:h-10 md:w-10" />,
    title: "Seramik Kaplama",
    desc: "Derin parlaklık ve hidrofobik etki. Aracınızın boyasını kimyasallara ve UV ışınlarına karşı mühürleyin.",
    accent: "border-brand-yellow"
  },
  {
    icon: <CarFront className="h-8 w-8 md:h-10 md:w-10" />,
    title: "Detaylı Temizlik",
    desc: "Motor, iç mekan ve dış yüzeyde sterilizasyon ve show-room temizliği.",
    accent: "border-brand-red"
  },
  {
    icon: <Layers className="h-8 w-8 md:h-10 md:w-10" />,
    title: "Renk Değişim",
    desc: "Özel seri folyolar ile aracınıza tamamen yeni bir kimlik ve mat/metalik dokular kazandırın.",
    accent: "border-brand-yellow"
  },
  {
    icon: <Sun className="h-8 w-8 md:h-10 md:w-10" />,
    title: "Cam Filmi",
    desc: "UV koruması ve ısı reddi sağlayan yüksek performanslı cam filmleri ile konforunuzu artırın.",
    accent: "border-brand-red"
  }
];

export const Services: React.FC = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const loadServiceImage = async () => {
      const isMobile = window.innerWidth < 768;
      const cacheKey = isMobile ? 'services_bg_mobile_v7_mix' : 'services_bg_desktop_v7_mix';
      
      let prompt = "";
      let ratio: "16:9" | "9:16" = "16:9";
      let fallbackUrl = "";

      if (isMobile) {
        prompt = "Vertical macro abstract shot of car paint curves, carbon fiber details, with intertwined orange and red light reflections, dark background, 8k.";
        ratio = "9:16";
        fallbackUrl = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop"; 
      } else {
        prompt = "Macro close-up abstract shot of a car's glossy paint curve and carbon fiber, dual lighting with orange and red highlights, automotive art, high contrast.";
        ratio = "16:9";
        fallbackUrl = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"; 
      }

      // 1. Check Cache
      const cachedImage = localStorage.getItem(cacheKey);
      if (cachedImage) {
        setBgImage(cachedImage);
        return;
      }

      // 2. Set Fallback Immediately
      setBgImage(fallbackUrl);

      // 3. Try AI
      try {
        const image = await generateImage(prompt, ratio);
        if (image) {
          setBgImage(image);
          try {
            localStorage.setItem(cacheKey, image);
          } catch (e) { console.warn("Storage full"); }
        }
      } catch (e) {
        console.warn("Using fallback due to error");
      }
    };
    loadServiceImage();
  }, []);

  return (
    <section id={SectionId.SERVICES} className="py-16 md:py-20 lg:py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
          {bgImage && (
             <img 
             src={bgImage}
             alt="Car Detail Background" 
             className="w-full h-full object-cover opacity-30"
           />
          )}
           <div className="absolute inset-0 bg-brand-dark/85"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-brand-yellow font-display font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-3">Uzmanlık Alanlarımız</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
            TEKNOLOJİK <span className="text-brand-red">ÇÖZÜMLER</span>
          </h3>
          <div className="h-1 w-24 bg-gradient-to-r from-brand-yellow to-brand-red mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative bg-brand-gray/80 backdrop-blur-md p-6 md:p-6 lg:p-8 border-l-4 ${service.accent} hover:bg-[#252525] transition-all duration-300 hover:-translate-y-2 border border-white/5 shadow-lg`}
            >
              <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-full bg-brand-dark inline-block group-hover:scale-110 transition-transform duration-300 ${service.accent === 'border-brand-red' ? 'text-brand-red shadow-[0_0_15px_rgba(207,0,0,0.3)]' : 'text-brand-yellow shadow-[0_0_15px_rgba(255,107,0,0.3)]'}`}>
                {service.icon}
              </div>
              <h4 className="text-lg md:text-xl font-display font-bold text-white mb-3 md:mb-4 group-hover:text-brand-yellow transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-400 font-sans leading-relaxed text-xs md:text-sm">
                {service.desc}
              </p>
              
              <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                <div className={`absolute top-0 right-0 w-2 h-2 ${service.accent === 'border-brand-red' ? 'bg-brand-red' : 'bg-brand-yellow'} rounded-bl-lg`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};