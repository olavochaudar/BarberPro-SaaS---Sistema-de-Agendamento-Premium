import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  Users,
  Scissors,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ShoppingBag,
  Zap,
  Home,
  LayoutGrid,
  BarChart3,
  ShieldCheck,
  ClipboardList,
  UserCheck,
  LifeBuoy,
  Info,
  FileText,
  MessageCircle,
  Sparkles,
  Bot,
} from 'lucide-react';
import { User, UserRole } from '../types';
import { BRAND_NAME } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  user: User;
  onLogout: () => void;
  isMobileOpen: boolean;
  toggleMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  onLogout,
  isMobileOpen,
  toggleMobile,
}) => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Início',
      icon: Home,
      path: '/dashboard',
      roles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
    },
    {
      name: 'Serviços',
      icon: LayoutGrid,
      path: '/dashboard/servicos',
      roles: [UserRole.CLIENT, UserRole.ADMIN],
    },
    {
      name: 'Produtos',
      icon: ShoppingBag,
      path: '/dashboard/produtos',
      roles: [UserRole.CLIENT, UserRole.ADMIN],
    },
    {
      name: 'Agendamentos',
      icon: ClipboardList,
      path: '/dashboard/agendamentos',
      roles: [UserRole.CLIENT],
    },
    {
      name: 'Meus Dados',
      icon: UserCheck,
      path: '/dashboard/dados-pessoais',
      roles: [UserRole.CLIENT],
    },
    {
      name: 'Agenda',
      icon: Calendar,
      path: '/dashboard/agenda',
      roles: [UserRole.ADMIN, UserRole.BARBER],
    },
    {
      name: 'Clientes',
      icon: Users,
      path: '/dashboard/clientes',
      roles: [UserRole.ADMIN],
    },
    {
      name: 'Equipe',
      icon: Scissors,
      path: '/dashboard/staff',
      roles: [UserRole.ADMIN],
    },
    {
      name: 'Financeiro',
      icon: BarChart3,
      path: '/dashboard/financeiro',
      roles: [UserRole.ADMIN],
    },
    {
      name: 'Ajustes',
      icon: Settings,
      path: '/dashboard/configuracoes',
      roles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
    },
    {
      name: 'Suporte',
      icon: LifeBuoy,
      path: '/dashboard/ajuda',
      roles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
    },
  ].filter((item) => item.roles.includes(user.role));

  const SidebarContent = () => (
    <div className='flex flex-col h-full bg-zinc-950 border-r border-white/5 w-52 shadow-2xl'>
      <div className='p-5 pb-6 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-2 group'>
          <div className='bg-amber-500 p-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform'>
            <Scissors className='text-zinc-950 size-3.5' />
          </div>
          <span className='text-sm font-black tracking-tighter text-white uppercase'>
            {BRAND_NAME}
          </span>
        </Link>
        <button
          onClick={toggleMobile}
          className='lg:hidden text-zinc-600 hover:text-white'
        >
          <X size={16} />
        </button>
      </div>

      <nav className='flex-1 px-3 space-y-0.5 overflow-y-auto'>
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === '/dashboard' && location.pathname === '/dashboard/');
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group ${
                isActive
                  ? 'bg-zinc-900 text-amber-500 border border-white/5 shadow-lg'
                  : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/30'
              }`}
            >
              <item.icon
                size={14}
                strokeWidth={isActive ? 2.5 : 2}
                className={
                  isActive
                    ? 'text-amber-500'
                    : 'text-zinc-600 group-hover:text-zinc-400'
                }
              />
              <span className='text-[7.5px] uppercase tracking-[0.15em] font-black'>
                {item.name}
              </span>
            </Link>
          );
        })}

        <div className='pt-3 mt-3 border-t border-white/5 mb-4'>
          <button
            onClick={onLogout}
            className='w-full flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-700 hover:text-red-400 hover:bg-red-500/5 transition-all group'
          >
            <LogOut size={14} />
            <span className='text-[7.5px] uppercase tracking-widest font-black'>
              Sair
            </span>
          </button>
        </div>
      </nav>

      <div className='p-3'>
        <div className='p-2.5 rounded-xl bg-zinc-900/40 border border-white/5 flex items-center gap-2.5'>
          <div className='relative'>
            <img
              src={user.avatar}
              alt={user.name}
              className='w-7 h-7 rounded-lg grayscale'
            />
          </div>
          <div className='overflow-hidden'>
            <p className='text-[8px] font-black truncate text-white uppercase leading-none'>
              {user.name.split(' ')[0]}
            </p>
            <p className='text-[6px] text-zinc-600 uppercase font-black tracking-widest mt-1 leading-none'>
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className='hidden lg:block fixed inset-y-0 left-0 z-60'>
        <SidebarContent />
      </div>
      <AnimatePresence>
        {isMobileOpen && (
          <div className='fixed inset-0 z-100 lg:hidden'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobile}
              className='absolute inset-0 bg-black/90 backdrop-blur-md'
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className='relative h-full w-52'
            >
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Header: React.FC<{
  title: string;
  onToggleSidebar: () => void;
}> = ({ title, onToggleSidebar }) => (
  <header className='h-14 bg-zinc-950/60 backdrop-blur-3xl border-b border-white/5 px-4 lg:px-8 sticky top-0 z-50 flex items-center shadow-lg'>
    <div className='max-w-6xl mx-auto w-full flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <button
          onClick={onToggleSidebar}
          className='lg:hidden p-2 bg-zinc-900 border border-white/10 text-zinc-400 hover:text-amber-500 rounded-lg transition-all active:scale-95'
        >
          <Menu size={16} />
        </button>
        <div className='hidden md:flex flex-col border-l border-white/5 pl-4 h-6 justify-center'>
          <span className='text-[8px] font-black text-white uppercase tracking-widest leading-none'>
            {title}
          </span>
        </div>
      </div>

      <div className='flex items-center gap-2.5 px-4 py-1.5 bg-zinc-900/80 border border-amber-500/20 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.1)]'>
        <Scissors size={12} className='text-amber-500' />
        <span className='text-[9px] font-black text-white uppercase tracking-[0.3em]'>
          {BRAND_NAME}
        </span>
      </div>

      <div className='flex items-center gap-3'>
        <button className='relative p-2 bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white rounded-lg transition-all shadow-xl group'>
          <Bell size={15} />
          <span className='absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full border border-zinc-900'></span>
        </button>
      </div>
    </div>
  </header>
);

export const BottomNavigation: React.FC<{
  user: User;
  onChatClick?: () => void;
}> = ({ user, onChatClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (user.role !== UserRole.CLIENT) return null;

  const tabs = [
    { name: 'Início', icon: Home, path: '/dashboard' },
    { name: 'Reserva', icon: Zap, path: '/booking' },
    { name: 'Produtos', icon: ShoppingBag, path: '/dashboard/produtos' },
    { name: 'Concierge', icon: Bot, path: 'chat-trigger' },
  ];

  const handleTabClick = (path: string) => {
    if (path === 'chat-trigger') {
      onChatClick?.();
      return;
    }
    navigate(path);
  };

  return (
    <div className='lg:hidden fixed bottom-6 left-0 right-0 z-70 px-6 pointer-events-none'>
      <div className='max-w-md mx-auto bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-full px-2 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-around pointer-events-auto relative overflow-hidden'>
        {tabs.map((tab) => {
          const isChat = tab.path === 'chat-trigger';
          const isActive =
            !isChat &&
            (location.pathname === tab.path ||
              (tab.path === '/dashboard' &&
                location.pathname === '/dashboard/'));

          return (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.path)}
              className='relative flex-1 py-3 outline-none focus:outline-none'
            >
              {isActive && (
                <motion.div
                  layoutId='navPill'
                  className='absolute inset-0 bg-white/3 border border-white/5 rounded-full z-0'
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className='relative z-10 flex flex-col items-center gap-1 transition-all duration-300'>
                <div
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'text-amber-500 scale-110'
                      : isChat
                      ? 'text-amber-400'
                      : 'text-zinc-600'
                  }`}
                >
                  {isChat ? (
                    <div className='relative'>
                      <tab.icon size={18} strokeWidth={2.5} />
                      <div className='absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse border border-zinc-900'></div>
                    </div>
                  ) : (
                    <tab.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  )}
                </div>

                <span
                  className={`text-[7px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : isChat
                      ? 'text-amber-500/60'
                      : 'text-zinc-600 opacity-60'
                  }`}
                >
                  {tab.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId='activeDot'
                    className='w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] absolute -bottom-1'
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
