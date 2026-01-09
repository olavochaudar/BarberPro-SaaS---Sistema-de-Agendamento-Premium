
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Scissors, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User, Service } from '../../types';
import { FALLBACK_IMAGE } from '../../constants';

interface ServicesPageProps {
  user: User;
  services: Service[];
}

const ServicesPage: React.FC<ServicesPageProps> = ({ user, services }) => {
  return (
    <div className="space-y-16 max-w-7xl mx-auto pb-40 lg:pb-12 px-2 md:px-6 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-6">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-amber-500"></div>
              <span className="text-amber-500 font-black text-[11px] uppercase tracking-[0.6em] italic block">Nossas Experiências</span>
           </div>
           <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter font-display uppercase leading-[0.8]">
             Ateliê de <br/>
             <span className="text-zinc-800 font-serif italic normal-case tracking-normal lowercase">grooming.</span>
           </h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link to="/booking" className="group flex items-center gap-6 bg-white text-zinc-950 px-12 py-6 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.2em] hover:bg-amber-500 transition-all shadow-2xl active:scale-95">
             Reservar Agora <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {services.map((s, idx) => (
          <ServiceCard key={s.id} service={s} idx={idx} />
        ))}
      </div>

      <div className="py-24 text-center space-y-6 border-t border-white/5 opacity-50 hover:opacity-100 transition-opacity">
         <Scissors className="mx-auto text-zinc-800" size={40} />
         <p className="text-zinc-600 text-[11px] font-black uppercase tracking-[0.8em] max-w-md mx-auto leading-relaxed">
           Excelência em cada detalhe, precisão em cada linha.
         </p>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ service: Service; idx: number }> = ({ service, idx }) => {
  const [imgSrc, setImgSrc] = useState(service.image);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group rounded-[4rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl cursor-pointer ring-1 ring-white/5"
    >
      <div className="relative h-[400px] md:h-[480px] overflow-hidden bg-zinc-950">
         {isLoading && (
           <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse z-0"></div>
         )}
         
         <img 
           src={imgSrc} 
           onLoad={() => setIsLoading(false)}
           onError={() => {
             if (!hasError) {
               setImgSrc(FALLBACK_IMAGE);
               setHasError(true);
               setIsLoading(false);
             }
           }}
           className={`relative z-10 w-full h-full object-cover transition-all duration-1000 ease-out 
             ${isLoading ? 'opacity-0' : 'opacity-100'} 
             ${hasError ? 'brightness-50 grayscale' : 'brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all'}`} 
           alt={service.name} 
           loading="lazy"
         />
         
         <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
         
         <div className="absolute top-10 left-10 z-30">
            <div className="px-8 py-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] shadow-2xl">
               <span className="text-amber-500 font-black text-2xl tracking-tighter italic font-display leading-none">R$ {service.price}</span>
            </div>
         </div>

         <div className="absolute top-10 right-10 z-30">
            <div className="w-16 h-16 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
               <div className="text-center">
                  <p className="text-white font-black text-sm leading-none">{service.durationMinutes}</p>
                  <p className="text-zinc-600 text-[7px] uppercase font-black tracking-widest mt-1 leading-none">MIN</p>
               </div>
            </div>
         </div>
      </div>

      <div className="p-14 pt-8 space-y-8">
         <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-10 bg-amber-500/40"></div>
              <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.5em]">{service.isCombo ? 'Ritual Master' : 'Signature Experience'}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
               <h3 className="text-5xl md:text-6xl font-serif italic text-white tracking-tighter transition-colors group-hover:text-amber-500 duration-700 leading-none">{service.name}</h3>
            </div>
         </div>
         
         <p className="text-zinc-400 text-base leading-relaxed font-medium max-w-lg italic opacity-80 group-hover:opacity-100 transition-opacity">
           "{service.description}"
         </p>

         <div className="pt-8">
            <Link 
              to="/booking" 
              className="w-full py-6 bg-zinc-950 border border-white/10 text-white rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all shadow-2xl"
            >
               Reservar Ritual <ChevronRight size={18} />
            </Link>
         </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;
