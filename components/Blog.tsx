import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, Wrench, Shield, CloudHail, AlertCircle } from 'lucide-react';
import { SectionId } from '../types';

interface BlogPost {
  id: number;
  title: string;
  icon: React.ReactNode;
  summary: string;
  content: React.ReactNode;
}

export const Blog: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Boyasız Göçük Düzeltme (PDR) Nedir?",
      icon: <Wrench className="w-6 h-6 text-brand-yellow" />,
      summary: "Aracınızın orijinalliğini koruyarak yapılan modern onarım tekniği hakkında bilmeniz gerekenler.",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            <strong>Boyasız Göçük Düzeltme (PDR)</strong>, aracın kaporta aksamında oluşan, boyanın zarar görmediği göçüklerin özel el aletleri ve tekniklerle düzeltilmesi işlemidir. Özellikle İstanbul trafiğinde sıkça yaşanan park hasarları için en etkili çözümdür.
          </p>
          <p>
            Bu işlem, geleneksel kaporta-boya işlemlerine göre çok daha hızlıdır ve en önemlisi aracınızın <strong>orijinal boyasını korur</strong>. Araç üzerinde macun ve boya işlemi yapılmadığı için TRAMER kaydı oluşmaz ve aracınızın ikinci el değeri düşmez.
          </p>
          <p>
            <strong>İstoç Oto Ticaret Merkezi</strong>'ndeki stüdyomuzda, aracınızın değerini korumak için mikron hassasiyetinde çalışıyoruz.
          </p>
          <ul className="list-disc pl-5 text-gray-400 space-y-1 mt-2">
            <li>Orijinallik %100 korunur.</li>
            <li>Boya ton farkı oluşmaz.</li>
            <li>İstanbul içi aynı gün teslim imkanı.</li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      title: "PPF Kaplama Araca Zarar Verir Mi?",
      icon: <Shield className="w-6 h-6 text-brand-red" />,
      summary: "Boya Koruma Filmi (PPF) hakkında doğru bilinen yanlışlar ve koruma teknolojisi.",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Kaliteli bir <strong>PPF (Paint Protection Film)</strong> uygulaması, araca asla zarar vermez; aksine onu taş vuruklarından, kuş pisliğinden ve güneş yanığından koruyan bir kalkan görevi görür.
          </p>
          <p>
            Etiket Garage olarak kullandığımız üst segment TPU (Termoplastik Poliüretan) tabanlı filmler, ısı ile <strong>kendi kendini yenileyebilen (self-healing)</strong> teknolojiye sahiptir. Ancak, piyasada "PVC" tabanlı ucuz filmler boyaya yapışabilir ve zamanla sararabilir.
          </p>
          <p className="text-brand-yellow italic border-l-2 border-brand-yellow pl-3">
            "Önemli olan kullanılan malzemenin kalitesi ve söküm işleminin profesyonelce yapılmasıdır. Doğru uygulanan PPF, söküldüğünde boyayı ilk günkü parlaklığında bırakır."
          </p>
        </div>
      )
    },
    {
      id: 3,
      title: "Dolu Hasarı Nasıl Düzeltilir?",
      icon: <CloudHail className="w-6 h-6 text-brand-yellow" />,
      summary: "Mevsim geçişlerinin kabusu dolu yağışlarına karşı en etkili çözüm PDR yöntemidir.",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            İstanbul'da sıkça karşılaşılan dolu yağışları, araç üzerinde yüzlerce küçük göçük (gamze) oluşturabilir. Bu hasarları geleneksel yöntemle (macun+boya) düzeltmek aracın tavanını ve kaputunu boyalı hale getireceği için ciddi değer kaybına yol açar.
          </p>
          <p>
            Dolu hasarında <strong>masaj yöntemi</strong> ve <strong>vakumlu öpücük sistemi</strong> kullanılır. Profesyonel PDR ışıklandırması altında milimetrik hassasiyetle çalışılarak göçükler dışarıdan fark edilemeyecek duruma getirilir.
          </p>
          <p>
            Etiket Garage olarak, binlerce dolu göçüğünü tek bir parça boya kullanmadan onardık ve müşterilerimizi değer kaybından kurtardık.
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: "Çizik Ne Zaman Boyasız Gider?",
      icon: <AlertCircle className="w-6 h-6 text-brand-red" />,
      summary: "Her çizik için boya gerekmez. Pasta cila ve rötüş ile neleri kurtarabiliriz?",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Bir çiziğin boyasız giderilip giderilemeyeceğini anlamak için basit bir <strong>"tırnak testi"</strong> yapabilirsiniz.
          </p>
          <p>
            Eğer tırnağınız çiziğe takılıyorsa, çizik verniği aşıp boya katmanına inmiş demektir. Bu durumda tam anlamıyla yok etmek için boya veya rötüş gerekebilir. Ancak tırnağın takılmadığı yüzeysel (kılcal) çizikler, profesyonel <strong>pasta ve polisaj</strong> işlemleriyle %100 oranında giderilebilir.
          </p>
          <p>
            Derin çiziklerde ise "mikro rötüş" ve "zımpara" teknikleriyle hasarı %80-%90 oranında gizleyerek boya işleminden kaçınabiliyoruz. Ücretsiz ekspertiz için sizi İstoç'taki stüdyomuza bekleriz.
          </p>
        </div>
      )
    }
  ];

  return (
    <section id={SectionId.BLOG} className="py-16 md:py-24 bg-[#0a0a0a] border-b border-brand-gray relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-brand-red font-display font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-3">Sıkça Sorulan Sorular</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
            BİLGİ <span className="text-brand-yellow">MERKEZİ</span>
          </h3>
          <p className="mt-4 text-gray-400 font-light text-sm md:text-base max-w-2xl mx-auto">
            Aklınızdaki soruların cevapları ve otomotiv dünyasındaki teknik detaylar için hazırladığımız rehber.
          </p>
        </div>

        {/* Schema.org FAQPage Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" itemScope itemType="https://schema.org/FAQPage">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`bg-brand-gray/50 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${expandedId === post.id ? 'border-brand-yellow/50 shadow-[0_0_15px_rgba(255,107,0,0.1)]' : 'hover:border-gray-600'}`}
              itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-md bg-brand-dark ${expandedId === post.id ? 'text-white' : 'text-gray-400'}`}>
                    {post.icon}
                  </div>
                  <div>
                    <h4 itemProp="name" className={`font-display font-bold text-sm md:text-base transition-colors ${expandedId === post.id ? 'text-white' : 'text-gray-300'}`}>
                      {post.title}
                    </h4>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedId === post.id ? 'rotate-180 text-brand-yellow' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {expandedId === post.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                  >
                    <div className="px-6 pb-6 pt-0 text-gray-400 font-sans text-sm leading-relaxed border-t border-gray-800/50 mt-2">
                       <div className="pt-4" itemProp="text">
                         {post.content}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!expandedId && (
                <div className="px-6 pb-6 text-xs text-gray-500 font-sans line-clamp-2">
                   {post.summary}
                </div>
              )}
            </motion.article>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-brand-red text-xs font-display tracking-widest bg-brand-red/5 px-4 py-2 rounded-full border border-brand-red/20">
                <BookOpen className="w-4 h-4" />
                <span>DAHA FAZLA BİLGİ İÇİN İSTOÇ STÜDYOMUZA BEKLERİZ</span>
            </div>
        </div>
      </div>
    </section>
  );
};