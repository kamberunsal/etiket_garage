import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  // Static Images - Night city / Red taillight theme
  const desktopImage = "https://images.unsplash.com/photo-1549556238-04d306e98188?q=80&w=2070&auto=format&fit=crop"; 
  const mobileImage = "https://images.unsplash.com/photo-1542223616-9de78bd9f1f4?q=80&w=1974&auto=format&fit=crop";

  return (
    <section id={SectionId.CONTACT} className="relative py-16 md:py-24 bg-[#050505] border-t border-brand-red/10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
         <picture className="block w-full h-full">
           <source media="(max-width: 768px)" srcSet={mobileImage} />
           <img 
             src={desktopImage} 
             alt="Dark Car Silhouette" 
             className="w-full h-full object-cover opacity-25"
           />
         </picture>
         <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          
          {/* Info Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 md:mb-8 text-center lg:text-left drop-shadow-lg">
              İLETİŞİME <span className="text-brand-yellow">GEÇİN</span>
            </h2>
            <p className="text-gray-400 mb-8 md:mb-10 lg:mb-12 font-light text-center lg:text-left text-sm md:text-base">
              Aracınızı profesyonel ellere emanet etmek veya fiyat teklifi almak için
              bizi ziyaret edin veya arayın. Kahvemiz her zaman taze.
            </p>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start space-x-4 group bg-brand-gray/40 backdrop-blur-sm p-4 rounded-lg lg:bg-transparent lg:p-0">
                <div className="bg-brand-gray p-3 rounded-sm group-hover:bg-brand-red transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold mb-1">Stüdyo</h4>
                  <p className="text-gray-400 text-sm">Göztepe Mah. İstoç 5. Cadde<br />P Blok No:4, İç Kapı: Z13<br />Bağcılar / İstanbul</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group bg-brand-gray/40 backdrop-blur-sm p-4 rounded-lg lg:bg-transparent lg:p-0">
                <div className="bg-brand-gray p-3 rounded-sm group-hover:bg-brand-yellow group-hover:text-black transition-colors duration-300">
                  <Phone className="h-6 w-6 text-white group-hover:text-black" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold mb-1">Telefon</h4>
                  <p className="text-gray-400 text-sm">+90 (212) 555 0123</p>
                  <p className="text-gray-400 text-sm">+90 (532) 555 6789</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group bg-brand-gray/40 backdrop-blur-sm p-4 rounded-lg lg:bg-transparent lg:p-0">
                <div className="bg-brand-gray p-3 rounded-sm group-hover:bg-brand-red transition-colors duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold mb-1">Çalışma Saatleri</h4>
                  <p className="text-gray-400 text-sm">Pzt - Cmt: 09:00 - 19:00</p>
                  <p className="text-gray-400 text-sm">Pazar: Kapalı</p>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 flex justify-center lg:justify-start space-x-4">
               <button className="flex items-center space-x-2 border border-gray-700 bg-brand-dark/50 backdrop-blur-sm px-6 py-3 rounded-sm hover:border-brand-red hover:text-brand-red transition-all text-gray-300 w-full lg:w-auto justify-center">
                  <Instagram className="h-5 w-5" />
                  <span className="font-display font-medium">@etiketgarage</span>
               </button>
            </div>
          </div>

          {/* Map Side */}
          <div className="relative h-[300px] md:h-[450px] lg:h-full w-full bg-brand-gray rounded-sm overflow-hidden border border-gray-800 group mt-4 lg:mt-0 shadow-2xl">
            {/* Using a styled map image to fit the theme */}
            <div className="absolute inset-0 bg-brand-dark/20 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.966444005187!2d28.835158!3d41.064575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa55963300001%3A0x0!2zNDHCsDAzJzUyLjQiTiAyOMKwNTAnMDYuNiJF!5e0!3m2!1sen!2str!4v1633000000000!5m2!1sen!2str" 
              width="100%" 
              height="100%" 
              style={{border:0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)'}} 
              allowFullScreen={false} 
              loading="lazy"
              className="grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-500"
            ></iframe>
            
            <div className="absolute bottom-4 right-4 z-20 bg-brand-red text-white px-4 py-2 font-display text-sm font-bold shadow-lg">
              ROTA OLUŞTUR
            </div>
          </div>

        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 pt-8 border-t border-gray-800 text-center relative z-10">
          <p className="text-gray-500 text-xs font-sans">
            &copy; 2024 Etiket Garage. Tüm hakları saklıdır. Tasarım: Modern Minimalist.
          </p>
        </div>
      </div>
    </section>
  );
};