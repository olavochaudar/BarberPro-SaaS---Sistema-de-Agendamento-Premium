
import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Globe, ShieldCheck, Heart, Zap, Sparkles } from 'lucide-react';
import { BRAND_NAME } from '../../constants';

const AboutPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto space-y-20 pb-32"
    >
      <header className="text-center space-y-8">
         <div className="w-20 h-20 bg-amber-500 rounded-[2.5rem] flex items-center justify-center text-zinc-950 mx-auto shadow-[0_0_40px_rgba(245,158,11,0.3)]">
            <Scissors size={32} />
         </div>
         <div className="space-y-4">
            <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">{BRAND_NAME} <span className="text-amber-500">Elite.</span></h1>
            <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.8em] italic">Building the future of grooming</p>
         </div>
      </header>

      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
           <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Nossa <br/><span className="text-zinc-800 font-serif italic normal-case tracking-normal lowercase">essência.</span></h2>
           <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
             O BarberPro nasceu da necessidade de unir a arte clássica da barbearia com a precisão da era digital. Não somos apenas um software de agendamento; somos o parceiro silencioso do barbeiro artesão e o portal de luxo do cliente moderno.
           </p>
           <div className="flex gap-10">
              <div className="space-y-1">
                 <p className="text-2xl font-black text-white italic tracking-tighter">50k+</p>
                 <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Usuários Ativos</p>
              </div>
              <div className="space-y-1">
                 <p className="text-2xl font-black text-white italic tracking-tighter">1.2M</p>
                 <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Rituais Realizados</p>
              </div>
           </div>
        </div>
        <div className="bg-zinc-900/40 p-10 rounded-[4rem] border border-white/5 space-y-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-500">
              <Sparkles size={120} />
           </div>
           {[
             { icon: Globe, title: "Visão Global", desc: "Expandindo os horizontes do grooming masculino." },
             { icon: Heart, title: "Artesanato Digital", desc: "Design focado na experiência humana." },
             { icon: Zap, title: "Performance", desc: "Tecnologia de ponta para agilidade absoluta." }
           ].map((item, idx) => (
             <div key={idx} className="flex gap-6 items-start">
                <div className="p-3 bg-zinc-950 rounded-2xl border border-white/5 text-amber-500">
                   <item.icon size={18} />
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{item.title}</h4>
                   <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <footer className="pt-20 border-t border-white/5 text-center space-y-4">
         <div className="inline-flex items-center gap-4 px-6 py-2 bg-zinc-900 rounded-full border border-white/5">
            <ShieldCheck className="text-green-500" size={14} />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">BarberPro Version 2.5.4 LTS Stable</span>
         </div>
         <p className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.8em]">© 2025 ELITE GROOMING SOLUTIONS INC.</p>
      </footer>
    </motion.div>
  );
};

export default AboutPage;
