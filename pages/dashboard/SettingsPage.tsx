
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Moon, Smartphone, Eye, Globe, ChevronRight } from 'lucide-react';
import { User } from '../../types';

const SettingsPage: React.FC<{ user: User }> = ({ user }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const SettingRow = ({ icon: Icon, title, desc, action }: any) => (
    <div className="flex items-center justify-between p-6 bg-[#0a0a0c] border border-white/5 rounded-[2rem] hover:bg-zinc-900/50 transition-all group">
      <div className="flex items-center gap-5">
        <div className="p-3 bg-zinc-900 rounded-2xl border border-white/5 text-zinc-600 group-hover:text-amber-500 transition-colors">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="text-[11px] font-black text-white uppercase tracking-widest leading-none mb-1.5">{title}</h4>
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{desc}</p>
        </div>
      </div>
      {action}
    </div>
  );

  const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`w-14 h-7 rounded-full transition-all relative p-1 ${active ? 'bg-amber-500' : 'bg-zinc-800'}`}
    >
      <motion.div 
        animate={{ x: active ? 28 : 0 }}
        className="w-5 h-5 bg-zinc-950 rounded-full shadow-lg"
      />
    </button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="space-y-12 max-w-3xl mx-auto pb-32"
    >
      <header>
         <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.5em] mb-2 block italic">Application Control</span>
         <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Configurações <br/><span className="text-zinc-800 font-serif italic normal-case tracking-normal lowercase">avançadas.</span></h1>
      </header>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-6 italic">Preferências do Sistema</h3>
        <div className="grid gap-3">
          <SettingRow 
            icon={Bell} 
            title="Notificações Push" 
            desc="Alertas de agendamentos e promoções" 
            action={<Toggle active={notifications} onToggle={() => setNotifications(!notifications)} />}
          />
          <SettingRow 
            icon={Moon} 
            title="Modo Noir" 
            desc="Interface otimizada para ambientes escuros" 
            action={<Toggle active={darkMode} onToggle={() => setDarkMode(!darkMode)} />}
          />
          <SettingRow 
            icon={Globe} 
            title="Idioma do Sistema" 
            desc="Português (Brasil)" 
            action={<button className="text-[9px] font-black text-zinc-500 hover:text-white flex items-center gap-2 uppercase tracking-widest">Alterar <ChevronRight size={12}/></button>}
          />
        </div>
      </div>

      <div className="space-y-4 pt-6">
        <h3 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-6 italic">Privacidade e Segurança</h3>
        <div className="grid gap-3">
          <SettingRow 
            icon={Shield} 
            title="Autenticação em Dois Fatores" 
            desc="Adicione uma camada extra de proteção" 
            action={<button className="px-4 py-2 bg-zinc-900 border border-white/5 text-[8px] font-black text-zinc-400 uppercase tracking-widest rounded-xl hover:text-white transition-all">Configurar</button>}
          />
          <SettingRow 
            icon={Eye} 
            title="Visibilidade do Perfil" 
            desc="Controlar quem vê suas conquistas" 
            action={<Toggle active={true} onToggle={() => {}} />}
          />
        </div>
      </div>

      <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 text-center">
         <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] leading-relaxed">
           As alterações são salvas automaticamente em nosso <br/> servidor seguro de nuvem criptografada.
         </p>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
