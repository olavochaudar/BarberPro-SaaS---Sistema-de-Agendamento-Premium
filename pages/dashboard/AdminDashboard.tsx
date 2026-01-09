
import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Home, LayoutGrid, Calendar, ShoppingBag, Users, Scissors, BarChart3, TrendingUp, Clock, User, 
  Zap, UploadCloud, X, Trash2, Edit3, ArrowRight, Eye, EyeOff, CalendarDays, MoreVertical, 
  AlertCircle, UserCheck, DollarSign, Briefcase, Star, Search, Shield, ArrowUpRight, ArrowDownRight,
  Wallet, PieChart, Receipt, CreditCard, ChevronRight, Download, Award, Sparkles
} from 'lucide-react';
import { Service, Product, Appointment, Barber, AppointmentStatus } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from 'recharts';

interface AdminDashboardProps {
  activeTab?: 'overview' | 'services' | 'products' | 'staff' | 'schedule' | 'clients' | 'financial';
  services: Service[];
  setServices: (services: Service[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  staff: Barber[];
  setStaff: (staff: Barber[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  activeTab: currentTabProp = 'overview', 
  services, setServices, products, setProducts, appointments, setAppointments, staff, setStaff 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'service' | 'product' | 'barber'>('service');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterBarber, setFilterBarber] = useState<string>('all');
  const [formState, setFormState] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adminTabs = [
    { id: 'overview', label: 'Início', icon: Home, path: '/dashboard' },
    { id: 'schedule', label: 'Agenda', icon: Calendar, path: '/dashboard/agenda' },
    { id: 'services', label: 'Serviços', icon: LayoutGrid, path: '/dashboard/servicos' },
    { id: 'products', label: 'Loja', icon: ShoppingBag, path: '/dashboard/produtos' },
    { id: 'clients', label: 'Clientes', icon: Users, path: '/dashboard/clientes' },
    { id: 'staff', label: 'Equipe', icon: Scissors, path: '/dashboard/staff' },
    { id: 'financial', label: 'Financeiro', icon: BarChart3, path: '/dashboard/financeiro' },
  ];

  // Logic to filter appointments
  const filteredAppointments = useMemo(() => {
    if (filterBarber === 'all') return appointments;
    return appointments.filter(apt => apt.barberName === filterBarber);
  }, [appointments, filterBarber]);

  // Financial Metrics - Advanced Calculation
  const financialStats = useMemo(() => {
    const revenueServices = appointments.reduce((acc, curr) => acc + curr.price, 0);
    const revenueProducts = products.length * 45; // Simulated product revenue
    const grossRevenue = revenueServices + revenueProducts;
    const commissions = Math.round(revenueServices * 0.40); // 40% commission
    const expenses = Math.round(grossRevenue * 0.20); // 20% fixed expenses
    const netProfit = grossRevenue - commissions - expenses;
    
    return {
      gross: grossRevenue,
      net: netProfit,
      expenses: commissions + expenses,
      avgTicket: appointments.length ? Math.round(grossRevenue / appointments.length) : 0,
    };
  }, [appointments, products]);

  const chartData = [
    { name: 'Seg', revenue: 1200, profit: 800 },
    { name: 'Ter', revenue: 1900, profit: 1100 },
    { name: 'Qua', revenue: 1500, profit: 950 },
    { name: 'Qui', revenue: 2200, profit: 1400 },
    { name: 'Sex', revenue: 3100, profit: 1900 },
    { name: 'Sáb', revenue: 4500, profit: 2800 },
    { name: 'Dom', revenue: 800, profit: 400 },
  ];

  const handleSave = () => {
    if (modalType === 'service') {
      if (editingId) setServices(services.map(s => s.id === editingId ? { ...s, ...formState } : s));
      else setServices([...services, { ...formState, id: Date.now().toString(), isActive: true }]);
    } else if (modalType === 'product') {
      if (editingId) setProducts(products.map(p => p.id === editingId ? { ...p, ...formState } : p));
      else setProducts([...products, { ...formState, id: Date.now().toString() }]);
    } else if (modalType === 'barber') {
      if (editingId) setStaff(staff.map(b => b.id === editingId ? { ...b, ...formState } : b));
      else setStaff([...staff, { ...formState, id: Date.now().toString(), status: 'available', rating: 5.0, specialties: ['Corte', 'Barba'] }]);
    }
    closeModal();
  };

  const openModal = (type: 'service' | 'product' | 'barber', data?: any) => {
    setModalType(type);
    if (data) {
      setEditingId(data.id);
      setFormState({ ...data });
    } else {
      setEditingId(null);
      setFormState({});
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState({ ...formState, [modalType === 'barber' ? 'avatar' : 'image']: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-40 max-w-7xl mx-auto w-full relative">
      
      {/* 1. NAVEGAÇÃO SUPERIOR - STICKY AND IMPROVED SPACING */}
      <div className="sticky top-0 z-[60] bg-zinc-950/80 backdrop-blur-2xl py-6 -mx-4 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto relative p-1.5 bg-zinc-900/60 border border-white/5 rounded-[2.5rem] flex items-center gap-1 overflow-x-auto scrollbar-hide shadow-2xl">
          {adminTabs.map((tab) => {
            const isActive = currentTabProp === tab.id;
            return (
              <Link 
                key={tab.id} 
                to={tab.path} 
                className={`relative px-6 py-3.5 rounded-full transition-all flex items-center gap-3 group whitespace-nowrap outline-none ${isActive ? 'text-zinc-950' : 'text-zinc-500 hover:text-zinc-100'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="adminNavPill"
                    className="absolute inset-0 bg-amber-500 rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.3)]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <tab.icon size={15} className="relative z-10" strokeWidth={isActive ? 3 : 2} />
                <span className="relative z-10 text-[9px] font-black uppercase tracking-widest">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-4 px-4">
        <AnimatePresence mode="wait">
          
          {/* VIEW: OVERVIEW */}
          {currentTabProp === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { label: "Serviços Hoje", val: appointments.length, icon: Scissors, trend: '+12%', color: 'text-amber-500' },
                   { label: "Faturamento", val: `R$ ${financialStats.gross}`, icon: BarChart3, trend: '+8%', color: 'text-green-500' },
                   { label: "Ticket Médio", val: `R$ ${financialStats.avgTicket}`, icon: TrendingUp, trend: '+5%', color: 'text-blue-500' },
                   { label: "Staff Ativo", val: staff.filter(b => b.status === 'available').length, icon: Users, trend: 'Estável', color: 'text-purple-500' }
                 ].map((stat, i) => (
                   <div key={i} className="bg-[#0a0a0c] border border-white/5 p-8 rounded-[3rem] text-center space-y-4 relative overflow-hidden group shadow-xl">
                      <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:scale-125 transition-transform">
                         <stat.icon size={100} />
                      </div>
                      <stat.icon size={22} className={`mx-auto ${stat.color}`} />
                      <div>
                         <p className="text-3xl font-black text-white italic tracking-tighter leading-none">{stat.val}</p>
                         <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mt-3">{stat.label}</p>
                      </div>
                      <div className="text-[7px] font-black uppercase text-zinc-800 tracking-[0.4em]">{stat.trend}</div>
                   </div>
                 ))}
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#0a0a0c] border border-white/5 rounded-[3rem] p-10 space-y-12 shadow-2xl">
                  <div className="flex justify-between items-center">
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-4"><PieChart size={24} className="text-amber-500" /> Rendimento Estratégico</h3>
                     <div className="flex gap-6">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div><span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Receita</span></div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-zinc-800"></div><span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Lucro</span></div>
                     </div>
                  </div>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                        <XAxis dataKey="name" stroke="#3f3f46" fontSize={10} axisLine={false} tickLine={false} tick={{dy: 10}} />
                        <YAxis stroke="#3f3f46" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '16px' }} 
                          itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={5} fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area type="monotone" dataKey="profit" stroke="#27272a" strokeWidth={2} fill="transparent" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#0a0a0c] border border-white/5 rounded-[3rem] p-10 flex flex-col space-y-10 shadow-2xl">
                   <h3 className="text-xl font-black text-white uppercase tracking-tighter">Fluxo <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">em tempo real.</span></h3>
                   <div className="flex-1 space-y-5 overflow-y-auto pr-2 scrollbar-hide">
                      {appointments.slice(0, 5).map((apt, idx) => (
                         <div key={idx} className="flex items-center justify-between p-5 bg-zinc-950/40 rounded-3xl border border-white/5 group hover:border-amber-500/20 transition-all">
                            <div className="flex items-center gap-5">
                               <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-green-500 shadow-inner group-hover:scale-110 transition-transform">
                                  <ArrowUpRight size={18} />
                               </div>
                               <div>
                                  <p className="text-xs font-black text-white uppercase tracking-tight">{apt.clientName}</p>
                                  <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mt-1">{apt.serviceName}</p>
                               </div>
                            </div>
                            <span className="text-sm font-black text-white italic">+R${apt.price}</span>
                         </div>
                      ))}
                   </div>
                   <button className="w-full py-5 bg-zinc-950 border border-white/5 text-zinc-600 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:text-white transition-all">Relatório Completo</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW: SCHEDULE */}
          {currentTabProp === 'schedule' && (
            <motion.div key="schedule" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Mapa de <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">atendimentos.</span></h2>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Sincronização de agenda ativa
                    </p>
                 </div>
                 <div className="flex bg-zinc-900/60 p-2 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
                   <button onClick={() => setFilterBarber('all')} className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${filterBarber === 'all' ? 'bg-amber-500 text-zinc-950 shadow-xl scale-105' : 'text-zinc-600'}`}>Todos</button>
                   {staff.map(b => (
                     <button key={b.id} onClick={() => setFilterBarber(b.name)} className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${filterBarber === b.name ? 'bg-amber-500 text-zinc-950 shadow-xl scale-105' : 'text-zinc-600'}`}>{b.name.split(' ')[0]}</button>
                   ))}
                 </div>
              </div>

              <div className="grid gap-6">
                 {filteredAppointments.length > 0 ? filteredAppointments.map((apt) => {
                   const isImperial = apt.serviceName === 'Barba Imperial';
                   return (
                     <div key={apt.id} className={`bg-[#0a0a0c] border border-white/5 rounded-[3rem] p-8 flex items-center gap-10 group hover:bg-zinc-900/40 transition-all shadow-xl relative overflow-hidden ${isImperial ? 'ring-1 ring-amber-500/30' : ''}`}>
                        {isImperial && (
                          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                             <Sparkles size={120} className="text-amber-500" />
                          </div>
                        )}
                        <div className={`w-24 h-24 bg-zinc-950 rounded-[2rem] flex flex-col items-center justify-center border border-white/5 shadow-inner transition-colors ${isImperial ? 'border-amber-500/20' : 'group-hover:border-amber-500/30'}`}>
                           <Clock size={20} className="text-amber-500 mb-2" />
                           <span className="text-white font-black text-2xl italic tracking-tighter">{apt.time}</span>
                        </div>
                        <div className="flex-1 space-y-2">
                           <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none group-hover:text-amber-500 transition-colors">{apt.clientName}</h4>
                           <div className="flex items-center gap-4">
                             <p className={`text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${isImperial ? 'text-amber-500' : 'text-zinc-600'}`}>
                               {apt.serviceName}
                               {isImperial && <Sparkles size={12} className="animate-pulse" />}
                             </p>
                             <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                             <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{apt.barberName}</p>
                           </div>
                        </div>
                        <div className="text-right flex items-center gap-10">
                           <div className="hidden md:block">
                              <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-1.5">Status</p>
                              <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border ${apt.status === AppointmentStatus.CONFIRMED ? 'border-green-500/20 text-green-500 bg-green-500/5' : 'border-amber-500/20 text-amber-500 bg-amber-500/5'}`}>{apt.status}</span>
                           </div>
                           <button className="w-14 h-14 bg-zinc-950 rounded-2xl border border-white/5 text-zinc-600 hover:text-white flex items-center justify-center transition-all shadow-xl active:scale-90"><MoreVertical size={20}/></button>
                        </div>
                     </div>
                   );
                 }) : (
                   <div className="py-32 text-center border border-dashed border-white/5 rounded-[5rem] text-zinc-800 space-y-6">
                      <CalendarDays className="mx-auto" size={56} strokeWidth={1} />
                      <p className="text-xs font-black uppercase tracking-[0.6em] italic">Nenhuma reserva encontrada</p>
                   </div>
                 )}
              </div>
            </motion.div>
          )}

          {/* VIEW: SERVICES (CATALOGO) */}
          {currentTabProp === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Catálogo de <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">serviços.</span></h2>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest italic">Gestão de rituais e experiências signature</p>
                 </div>
                 <button onClick={() => openModal('service')} className="px-12 py-6 bg-white text-zinc-950 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-amber-500 transition-all shadow-2xl scale-105"><Plus size={22} /> NOVO SERVIÇO</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {services.map((s) => (
                   <div key={s.id} className="bg-[#0a0a0c] border border-white/5 rounded-[3.5rem] overflow-hidden group hover:border-amber-500/20 transition-all shadow-xl">
                      <div className="aspect-[4/3] bg-zinc-950 overflow-hidden relative">
                         <img src={s.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={s.name} />
                         <div className="absolute top-6 right-6">
                            <span className="px-3 py-1.5 bg-zinc-950/80 backdrop-blur-md border border-white/5 rounded-xl text-[7px] font-black text-white uppercase tracking-[0.3em]">{s.durationMinutes} MIN</span>
                         </div>
                      </div>
                      <div className="p-8 space-y-6">
                         <div>
                            <h4 className="text-sm font-black text-white uppercase truncate tracking-tight">{s.name}</h4>
                            <p className="text-amber-500 font-black text-xl italic mt-2">R$ {s.price}</p>
                         </div>
                         <div className="flex gap-3 pt-4 border-t border-white/5">
                            <button onClick={() => openModal('service', s)} className="flex-1 py-4 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-white transition-all flex items-center justify-center"><Edit3 size={16} /></button>
                            <button onClick={() => setServices(services.filter(srv => srv.id !== s.id))} className="flex-1 py-4 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-red-500 transition-all flex items-center justify-center"><Trash2 size={16} /></button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {/* VIEW: PRODUCTS */}
          {currentTabProp === 'products' && (
            <motion.div key="products" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Estoque & <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">boutique.</span></h2>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest italic">Gestão de SKUs e curadoria de produtos</p>
                 </div>
                 <button onClick={() => openModal('product')} className="px-12 py-6 bg-white text-zinc-950 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-amber-500 transition-all shadow-2xl scale-105"><Plus size={22} /> NOVO ITEM</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {products.map((p) => (
                   <div key={p.id} className="bg-[#0a0a0c] border border-white/5 rounded-[3.5rem] overflow-hidden group hover:border-amber-500/20 transition-all shadow-xl">
                      <div className="aspect-square bg-zinc-950 overflow-hidden relative">
                         <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={p.name} />
                         <div className="absolute top-6 right-6">
                            <span className="px-3 py-1.5 bg-zinc-950/80 backdrop-blur-md border border-white/5 rounded-xl text-[7px] font-black text-white uppercase tracking-[0.3em]">{p.category}</span>
                         </div>
                      </div>
                      <div className="p-8 space-y-6">
                         <div>
                            <h4 className="text-sm font-black text-white uppercase truncate tracking-tight">{p.name}</h4>
                            <p className="text-amber-500 font-black text-xl italic mt-2">R$ {p.price}</p>
                         </div>
                         <div className="flex gap-3 pt-4 border-t border-white/5">
                            <button onClick={() => openModal('product', p)} className="flex-1 py-4 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-white transition-all flex items-center justify-center"><Edit3 size={16} /></button>
                            <button onClick={() => setProducts(products.filter(pr => pr.id !== p.id))} className="flex-1 py-4 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-red-500 transition-all flex items-center justify-center"><Trash2 size={16} /></button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {/* VIEW: CLIENTS */}
          {currentTabProp === 'clients' && (
            <motion.div key="clients" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Base de <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">membros.</span></h2>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest italic">Gestão de CRM e fidelidade elite</p>
                 </div>
                 <div className="relative w-full max-w-md">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700" size={20} />
                   <input type="text" placeholder="Localizar membro pelo nome..." className="w-full bg-[#0a0a0c] border border-white/5 rounded-full py-6 pl-16 pr-8 text-xs text-white outline-none focus:border-amber-500/20 transition-all shadow-2xl" />
                 </div>
              </div>
              <div className="bg-[#0a0a0c] border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl">
                 <div className="overflow-x-auto scrollbar-hide">
                   <table className="w-full text-left">
                      <thead className="bg-zinc-950 border-b border-white/5">
                         <tr>
                            <th className="px-12 py-8 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Cliente</th>
                            <th className="px-12 py-8 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Status</th>
                            <th className="px-12 py-8 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Fidelidade</th>
                            <th className="px-12 py-8 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] text-right">Ações</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {Array.from(new Set(appointments.map(a => a.clientName))).map((name: string, i) => (
                            <tr key={i} className="hover:bg-zinc-900/40 transition-colors group">
                               <td className="px-12 py-8">
                                  <div className="flex items-center gap-5">
                                     <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center font-black text-amber-500 group-hover:scale-110 transition-transform shadow-inner">
                                        {name[0]}
                                     </div>
                                     <div className="space-y-1">
                                        <span className="text-base font-black text-white uppercase tracking-tight leading-none block">{name}</span>
                                        <span className="text-[9px] font-bold text-zinc-700 uppercase italic tracking-widest">{name.toLowerCase().replace(' ', '.')}@elite.pro</span>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-12 py-8"><span className="px-4 py-1.5 bg-green-500/10 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-500/10">Membro Ativo</span></td>
                               <td className="px-12 py-8">
                                  <div className="flex items-center gap-3">
                                     <Award size={16} className="text-amber-500" />
                                     <span className="text-sm font-black text-zinc-400 italic">1.250 <span className="text-[8px] uppercase not-italic">pts</span></span>
                                  </div>
                               </td>
                               <td className="px-12 py-8 text-right"><button className="p-4 bg-zinc-950 rounded-2xl text-zinc-700 hover:text-white transition-all shadow-xl active:scale-90"><MoreVertical size={20}/></button></td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                 </div>
              </div>
            </motion.div>
          )}

          {/* VIEW: STAFF */}
          {currentTabProp === 'staff' && (
            <motion.div key="staff" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 px-4">
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Quadro de <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">mestres.</span></h2>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest italic">Gestão de talentos e escalas operacionais</p>
                 </div>
                 <button onClick={() => openModal('barber')} className="px-12 py-6 bg-white text-zinc-950 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-amber-500 transition-all shadow-2xl scale-105"><Plus size={22} /> ADICIONAR STAFF</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {staff.map((b) => (
                 <div key={b.id} className="bg-[#0a0a0c] border border-white/5 rounded-[4rem] p-10 flex flex-col items-center text-center gap-8 group hover:border-amber-500/20 transition-all shadow-2xl relative">
                    <div className="relative">
                       <div className="absolute inset-0 bg-amber-500/10 blur-[30px] rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                       <img src={b.avatar} className="relative w-36 h-36 rounded-[3rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 border-2 border-white/5 shadow-2xl" alt={b.name} />
                       <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-2xl border-4 border-[#0a0a0c] shadow-xl ${b.status === 'available' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-3xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-amber-500 transition-colors">{b.name}</h4>
                       <div className="flex flex-wrap justify-center gap-2">
                          {b.specialties.map(s => <span key={s} className="px-4 py-1.5 bg-zinc-950 border border-white/5 rounded-xl text-[8px] font-black text-zinc-600 uppercase tracking-widest">{s}</span>)}
                       </div>
                       <div className="flex items-center justify-center gap-8 pt-4">
                          <span className="flex items-center gap-2 text-[11px] font-black text-amber-500 uppercase tracking-[0.2em]"><Star size={14} fill="currentColor" /> {b.rating}</span>
                          <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest italic">Barbeiro Senior</span>
                       </div>
                    </div>
                    <div className="flex w-full gap-4 pt-8 border-t border-white/5">
                       <button onClick={() => openModal('barber', b)} className="flex-1 py-5 bg-zinc-950 rounded-[1.8rem] text-[10px] font-black text-zinc-600 hover:text-white transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3"><Edit3 size={16}/> Editar</button>
                       <button onClick={() => setStaff(staff.filter(s => s.id !== b.id))} className="w-16 h-16 bg-zinc-950 rounded-[1.8rem] text-zinc-600 hover:text-red-500 transition-all flex items-center justify-center shadow-xl active:scale-90"><Trash2 size={18}/></button>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>
        )}

        {/* VIEW: FINANCIAL */}
        {currentTabProp === 'financial' && (
          <motion.div key="financial" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-4">
               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Fluxo de <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">capital.</span></h2>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest italic flex items-center gap-3">
                     <Shield className="text-amber-500" size={14} /> Sistema de Conciliação Auditada Signature v4.2
                  </p>
               </div>
               <div className="flex gap-4">
                  <button className="px-8 py-5 bg-zinc-900 border border-white/5 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white hover:text-zinc-950 transition-all flex items-center gap-3 shadow-xl"><Download size={16} /> EXPORTAR BI</button>
                  <button className="px-8 py-5 bg-amber-500 text-zinc-950 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl scale-105">NOVA ENTRADA</button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-[#0a0a0c] border border-white/5 p-12 rounded-[4rem] space-y-6 relative overflow-hidden group shadow-2xl">
                  <div className="absolute -right-6 -bottom-6 p-8 opacity-5 text-green-500 group-hover:scale-110 transition-transform">
                     <DollarSign size={140}/>
                  </div>
                  <div className="flex justify-between items-start relative z-10">
                     <div className="w-16 h-16 bg-green-500/10 rounded-[1.8rem] border border-green-500/10 flex items-center justify-center text-green-500"><DollarSign size={28}/></div>
                     <span className="text-[9px] font-black text-green-500 bg-green-500/10 px-4 py-2 rounded-full uppercase tracking-widest border border-green-500/10">+12.4%</span>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-4xl font-black text-white italic tracking-tighter">R$ {financialStats.gross}</h4>
                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] mt-3">Receita Bruta Projetada</p>
                  </div>
               </div>
               <div className="bg-[#0a0a0c] border border-white/5 p-12 rounded-[4rem] space-y-6 relative overflow-hidden group shadow-2xl">
                  <div className="absolute -right-6 -bottom-6 p-8 opacity-5 text-amber-500 group-hover:scale-110 transition-transform">
                     <Wallet size={140}/>
                  </div>
                  <div className="flex justify-between items-start relative z-10">
                     <div className="w-16 h-16 bg-amber-500/10 rounded-[1.8rem] border border-amber-500/10 flex items-center justify-center text-amber-500"><Wallet size={28}/></div>
                     <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full uppercase tracking-widest border border-amber-500/10">+8.2%</span>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-4xl font-black text-white italic tracking-tighter">R$ {financialStats.net}</h4>
                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] mt-3">Lucro Líquido Real</p>
                  </div>
               </div>
               <div className="bg-[#0a0a0c] border border-white/5 p-12 rounded-[4rem] space-y-6 relative overflow-hidden group shadow-2xl">
                  <div className="absolute -right-6 -bottom-6 p-8 opacity-5 text-red-500 group-hover:scale-110 transition-transform">
                     <Receipt size={140}/>
                  </div>
                  <div className="flex justify-between items-start relative z-10">
                     <div className="w-16 h-16 bg-red-500/10 rounded-[1.8rem] border border-red-500/10 flex items-center justify-center text-red-500"><Receipt size={28}/></div>
                     <span className="text-[9px] font-black text-red-500 bg-red-500/10 px-4 py-2 rounded-full uppercase tracking-widest border border-red-500/10">-4.1%</span>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-4xl font-black text-white italic tracking-tighter">R$ {financialStats.expenses}</h4>
                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] mt-3">Custos & Comissões</p>
                  </div>
               </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
               <div className="bg-[#0a0a0c] border border-white/5 rounded-[4rem] p-12 space-y-12 shadow-2xl">
                  <div className="flex justify-between items-center">
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-4"><BarChart3 size={24} className="text-amber-500" /> Histórico de Rendimento</h3>
                     <div className="flex bg-zinc-950 p-1.5 rounded-2xl border border-white/5">
                        <button className="px-5 py-2.5 bg-zinc-900 rounded-xl text-[9px] font-black text-white uppercase tracking-widest">30d</button>
                        <button className="px-5 py-2.5 rounded-xl text-[9px] font-black text-zinc-600 uppercase tracking-widest">90d</button>
                     </div>
                  </div>
                  <div className="h-[400px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={chartData}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                         <XAxis dataKey="name" stroke="#3f3f46" fontSize={10} axisLine={false} tickLine={false} />
                         <YAxis stroke="#3f3f46" fontSize={10} axisLine={false} tickLine={false} />
                         <Tooltip 
                            contentStyle={{ backgroundColor: '#09090b', border: '1px solid #18181b', borderRadius: '24px', padding: '16px' }}
                            cursor={{ fill: '#18181b', radius: 10 }}
                         />
                         <Bar dataKey="revenue" radius={[15, 15, 0, 0]} barSize={40}>
                           {chartData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index === 5 ? '#f59e0b' : '#27272a'} />
                           ))}
                         </Bar>
                       </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               <div className="bg-[#0a0a0c] border border-white/5 rounded-[4rem] p-12 space-y-10 shadow-2xl flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Últimas <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">transações.</span></h3>
                    <div className="w-12 h-12 bg-zinc-950 rounded-2xl border border-white/5 flex items-center justify-center text-zinc-800"><ArrowRight size={20}/></div>
                  </div>
                  <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
                    {appointments.slice(0, 8).map((apt, idx) => (
                      <div key={idx} className="flex items-center justify-between p-6 bg-zinc-950/40 rounded-[2rem] border border-white/5 group hover:border-green-500/20 transition-all">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-green-500 shadow-inner group-hover:rotate-12 transition-transform">
                             <CreditCard size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-white uppercase tracking-tight leading-none mb-1">{apt.clientName}</p>
                            <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{apt.date} • {apt.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-base font-black text-white italic">+R$ {apt.price}</p>
                           <p className="text-[7px] font-black text-green-500 uppercase tracking-widest">Liquidado</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

      {/* MODAL: CRUD UNIFICADO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} className="relative w-full max-w-lg bg-[#080808] border border-white/10 rounded-[3rem] p-12 shadow-2xl space-y-8">
               <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Gerenciar <span className="text-amber-500">{modalType === 'barber' ? 'Staff' : modalType === 'product' ? 'Produto' : 'Serviço'}</span></h3>
                  <button onClick={closeModal} className="text-zinc-600 hover:text-white transition-all"><X size={24}/></button>
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-4">Nome Completo</label>
                     <input value={formState.name || ''} onChange={e => setFormState({...formState, name: e.target.value})} type="text" className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-5 px-8 text-sm text-white focus:border-amber-500/30 outline-none" placeholder="Ex: Master Signature" />
                  </div>
                  {modalType !== 'barber' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-4">Preço (R$)</label>
                      <input value={formState.price || ''} onChange={e => setFormState({...formState, price: Number(e.target.value)})} type="number" className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-5 px-8 text-sm text-white focus:border-amber-500/30 outline-none" />
                    </div>
                  )}
                  {modalType === 'service' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-4">Duração (MIN)</label>
                      <input value={formState.durationMinutes || ''} onChange={e => setFormState({...formState, durationMinutes: Number(e.target.value)})} type="number" className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-5 px-8 text-sm text-white focus:border-amber-500/30 outline-none" placeholder="45" />
                    </div>
                  )}
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-4">Mídia de Apresentação</label>
                     <div className="flex gap-4">
                        <input value={formState.image || formState.avatar || ''} onChange={e => setFormState({...formState, [modalType === 'barber' ? 'avatar' : 'image']: e.target.value})} type="text" className="flex-1 bg-zinc-950 border border-white/5 rounded-2xl py-5 px-8 text-sm text-white outline-none" placeholder="URL da imagem..." />
                        <button onClick={() => fileInputRef.current?.click()} className="p-5 bg-zinc-900 rounded-2xl text-zinc-600 hover:text-white transition-all border border-white/5"><UploadCloud size={20}/></button>
                        <input ref={fileInputRef} type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                     </div>
                  </div>
                  <button onClick={handleSave} className="w-full py-7 bg-amber-500 text-zinc-950 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl hover:bg-white transition-all active:scale-95">Sincronizar Dados</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .outline-text-gold {
          -webkit-text-stroke: 1.5px rgba(245, 158, 11, 0.08);
          color: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
