
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Crown, Gift, History, ChevronRight, CheckCircle2 } from 'lucide-react';
import { User, LoyaltyTier } from '../../types';

const LoyaltyPage: React.FC<{ user: User }> = ({ user }) => {
  const points = user.points || 1250;
  
  const rewards = [
    { name: 'Corte Grátis', cost: 2000, description: 'Resgate um corte social completo.' },
    { name: 'Pomada Matte', cost: 1000, description: 'Escolha qualquer pomada da loja.' },
    { name: 'Combo Especial', cost: 3500, description: 'Corte + Barba + Massagem.' },
  ];

  return (
    <div className="space-y-8">
      {/* Current Balance */}
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-amber-500/10 p-4 rounded-full mb-4">
            <Award className="text-amber-500 size-12" />
          </div>
          <h2 className="text-4xl font-black text-white">{points}</h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Pontos Disponíveis</p>
          <p className="text-zinc-400 text-sm mt-4 max-w-xs">Você está a apenas 750 pontos de resgatar um Corte Grátis!</p>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Crown size={200} />
        </div>
      </div>

      {/* Tiers Information */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <History className="text-amber-500" /> Níveis do Clube
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Bronze', color: 'bg-orange-800', points: '0+', active: false },
            { name: 'Prata', color: 'bg-slate-500', points: '1000+', active: true },
            { name: 'Ouro', color: 'bg-amber-500', points: '5000+', active: false },
          ].map((t) => (
            <div key={t.name} className={`p-6 rounded-3xl border ${t.active ? 'border-amber-500 bg-amber-500/5' : 'border-zinc-800 bg-zinc-900'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className={`w-3 h-3 rounded-full ${t.color}`}></div>
                {t.active && <span className="bg-amber-500 text-zinc-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Atual</span>}
              </div>
              <h4 className="text-white font-bold">{t.name}</h4>
              <p className="text-zinc-500 text-xs">{t.points} pontos</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards List */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Gift className="text-amber-500" /> Resgates Disponíveis
        </h3>
        <div className="grid gap-4">
          {rewards.map((reward) => (
            <div key={reward.name} className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold">{reward.name}</h4>
                <p className="text-zinc-500 text-sm">{reward.description}</p>
              </div>
              <div className="text-right">
                <button 
                  disabled={points < reward.cost}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    points >= reward.cost 
                    ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400' 
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  {reward.cost} pts
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;
