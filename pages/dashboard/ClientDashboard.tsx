
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, ShoppingBag, LayoutGrid, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User } from '../../types';

const ClientDashboard: React.FC<{ user: User }> = ({ user }) => {
  const points = user.points || 1250;
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    return hour < 12 ? "bom dia," : hour < 18 ? "boa tarde," : "boa noite,";
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6 pb-32 max-w-md mx-auto px-2"
    >
      <div className="fixed top-0 left-0 w-full h-full hero-glow pointer-events-none -z-10"></div>

      {/* Header Signature */}
      <section className="space-y-6 pt-4">
        <div className="px-4">
           <p className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">{greeting}</p>
           <h1 className="text-6xl font-serif italic text-white tracking-tighter lowercase leading-[0.8]">
             {user.name.split(' ')[0]}
           </h1>
        </div>

        <div className="px-2">
          <Link 
            to="/booking" 
            className="group h-16 w-full bg-amber-500 text-zinc-950 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(245,158,11,0.2)] active:scale-95 transition-all"
          >
             <Zap size={18} className="fill-current" />
             Agendar Agora
          </Link>
        </div>
      </section>

      {/* Loyalty Card Elite */}
      <section className="px-2">
        <div className="glass-card rounded-[3rem] p-8 relative overflow-hidden border-white/5 bg-zinc-900/60 ring-1 ring-white/10">
          <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12">
            <Shield size={220} />
          </div>

          <div className="relative z-10 space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-500 text-zinc-950 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(245,158,11,0.3)]">
                  <Shield size={28} />
                </div>
                <div>
                  <p className="text-zinc-500 font-black text-[9px] uppercase tracking-[0.4em] mb-0.5">Status</p>
                  <p className="text-white font-black text-base uppercase tracking-tight">Membro Elite</p>
                </div>
              </div>
              <div className="bg-white/5 w-10 h-10 rounded-xl flex items-center justify-center border border-white/5">
                 <Award size={18} className="text-zinc-600" />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-zinc-600 font-black text-[9px] uppercase tracking-[0.5em] mb-2 block">Saldo</span>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-white text-6xl font-black tracking-tighter leading-none">
                    {points}
                  </h4>
                  <span className="text-xs font-black text-amber-500 uppercase tracking-widest">PTS</span>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">Próximo: Corte Cortesia</p>
                    <p className="text-amber-500 font-black text-[9px] uppercase tracking-widest">Faltam 750</p>
                 </div>
                 <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden p-[1px] border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '62.5%' }} 
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]" 
                    />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Grid */}
      <section className="grid grid-cols-2 gap-4 px-2">
        <Link to="/dashboard/servicos" className="glass-card p-6 rounded-[2.5rem] border-white/5 flex flex-col items-center gap-4 active:scale-95 transition-all bg-zinc-900/40">
          <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-zinc-500 border border-white/5">
            <LayoutGrid size={20} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Serviços</span>
        </Link>
        <Link to="/dashboard/produtos" className="glass-card p-6 rounded-[2.5rem] border-white/5 flex flex-col items-center gap-4 active:scale-95 transition-all bg-zinc-900/40">
          <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-zinc-500 border border-white/5">
            <ShoppingBag size={20} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Loja</span>
        </Link>
      </section>
    </motion.div>
  );
};

export default ClientDashboard;
