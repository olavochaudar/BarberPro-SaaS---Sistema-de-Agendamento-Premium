
import React from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Settings, LogOut, ChevronRight, Bell, Shield, CreditCard, HelpCircle } from 'lucide-react';
import { User } from '../../types';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  const sections = [
    { title: 'Conta', icon: UserIcon, items: ['Dados Pessoais', 'Meus Agendamentos', 'Histórico'] },
    { title: 'Pagamento', icon: CreditCard, items: ['Cartões Salvos', 'Assinatura Ativa', 'Faturas'] },
    { title: 'Preferências', icon: Bell, items: ['Notificações', 'Barbeiro Favorito', 'Privacidade'] },
    { title: 'Suporte', icon: HelpCircle, items: ['Central de Ajuda', 'Sobre o App', 'Termos de Uso'] },
  ];

  return (
    <div className="space-y-8">
      {/* Header Profile */}
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-4">
          <img 
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=f59e0b&color=fff`} 
            alt={user.name} 
            className="w-24 h-24 rounded-[2rem] border-4 border-zinc-900 shadow-2xl object-cover"
          />
          <button className="absolute -bottom-2 -right-2 bg-amber-500 p-2 rounded-xl text-zinc-950 border-4 border-zinc-950">
            <Settings size={16} />
          </button>
        </div>
        <h2 className="text-2xl font-black text-white">{user.name}</h2>
        <p className="text-zinc-500 text-sm">{user.email}</p>
      </div>

      {/* Menu Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 ml-2">{section.title}</h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
              {section.items.map((item, i) => (
                <button 
                  key={item} 
                  className={`w-full flex items-center justify-between p-5 hover:bg-zinc-800/50 transition-colors ${
                    i !== section.items.length - 1 ? 'border-b border-zinc-800/50' : ''
                  }`}
                >
                  <span className="text-zinc-300 font-medium">{item}</span>
                  <ChevronRight size={18} className="text-zinc-600" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="pt-4">
        <button 
          onClick={onLogout}
          className="w-full py-5 bg-red-500/10 text-red-500 rounded-3xl border border-red-500/20 font-black flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut size={20} /> Sair da Conta
        </button>
        <p className="text-center text-zinc-600 text-[10px] mt-6 font-bold uppercase tracking-widest">BarberPro v2.4.0 • Built with ❤️</p>
      </div>
    </div>
  );
};

export default ProfilePage;
