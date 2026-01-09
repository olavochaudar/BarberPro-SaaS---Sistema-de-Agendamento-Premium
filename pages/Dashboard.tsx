
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar, Header, BottomNavigation } from '../components/Layout';
import { User, UserRole, Service, Product, Appointment, Barber } from '../types';
import { X, Bot } from 'lucide-react';
import AdminDashboard from './dashboard/AdminDashboard';
import BarberDashboard from './dashboard/BarberDashboard';
import ClientDashboard from './dashboard/ClientDashboard';
import StorePage from './dashboard/StorePage';
import LoyaltyPage from './dashboard/LoyaltyPage';
import ServicesPage from './dashboard/ServicesPage';
import MyAppointmentsPage from './dashboard/MyAppointmentsPage';
import PersonalDataPage from './dashboard/PersonalDataPage';
import SettingsPage from './dashboard/SettingsPage';
import HelpCenterPage from './dashboard/HelpCenterPage';
import AboutPage from './dashboard/AboutPage';
import TermsPage from './dashboard/TermsPage';
import CheckoutPage from './dashboard/CheckoutPage';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  services: Service[];
  setServices: (services: Service[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  staff: Barber[];
  setStaff: (staff: Barber[]) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, onLogout, services, setServices, products, setProducts, appointments, setAppointments, staff, setStaff 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const getDashboardTitle = () => {
    switch(user.role) {
      case UserRole.ADMIN: return "Console de Gestão";
      case UserRole.BARBER: return "Painel de Atendimento";
      case UserRole.CLIENT: return "Experiência Signature";
      default: return "Aplicativo";
    }
  };

  const adminProps = {
    services, setServices, products, setProducts, appointments, setAppointments, staff, setStaff
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col lg:flex-row overflow-x-hidden">
      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        isMobileOpen={isSidebarOpen} 
        toggleMobile={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className="flex-1 lg:ml-52 flex flex-col min-h-screen">
        <Header 
          title={getDashboardTitle()} 
          onToggleSidebar={() => setIsSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1600px] mx-auto w-full relative z-10">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route index element={
                user.role === UserRole.ADMIN ? <AdminDashboard activeTab="overview" {...adminProps} /> :
                user.role === UserRole.BARBER ? <BarberDashboard user={user} /> :
                <ClientDashboard user={user} />
              } />
              
              <Route path="servicos" element={user.role === UserRole.ADMIN ? <AdminDashboard activeTab="services" {...adminProps} /> : <ServicesPage user={user} services={services} />} />
              <Route path="produtos" element={user.role === UserRole.ADMIN ? <AdminDashboard activeTab="products" {...adminProps} /> : <StorePage products={products} />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="agenda" element={user.role === UserRole.ADMIN ? <AdminDashboard activeTab="schedule" {...adminProps} /> : <BarberDashboard user={user} />} />
              <Route path="clientes" element={<AdminDashboard activeTab="clients" {...adminProps} />} />
              <Route path="staff" element={<AdminDashboard activeTab="staff" {...adminProps} />} />
              <Route path="financeiro" element={<AdminDashboard activeTab="financial" {...adminProps} />} />
              <Route path="configuracoes" element={<SettingsPage user={user} />} />
              
              <Route path="fidelidade" element={<LoyaltyPage user={user} />} />
              <Route path="agendamentos" element={<MyAppointmentsPage user={user} appointments={appointments} />} />
              <Route path="dados-pessoais" element={<PersonalDataPage user={user} />} />
              <Route path="ajuda" element={<HelpCenterPage />} />
              <Route path="sobre" element={<AboutPage />} />
              <Route path="termos" element={<TermsPage />} />
              
              <Route path="*" element={<div className="text-zinc-800 py-20 text-center font-black uppercase tracking-[0.5em] text-[10px]">Página em Desenvolvimento</div>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <BottomNavigation user={user} onChatClick={() => setIsChatOpen(true)} />

      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed inset-0 z-[200] flex items-end lg:items-center justify-center p-0 lg:p-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsChatOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-2xl h-[95vh] lg:h-[85vh] bg-[#050505] border-t lg:border border-white/10 rounded-t-[4rem] lg:rounded-[4rem] shadow-[0_-40px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col mx-auto"
            >
              <div className="p-8 lg:p-10 flex items-center justify-between border-b border-white/5 bg-zinc-950">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-zinc-900 border border-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 shadow-2xl relative z-10">
                    <Bot size={24} />
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="text-white font-black text-xl uppercase tracking-tighter">Concierge BarberPro</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.4em]">Atendimento Exclusivo Ativo</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all border border-white/5 active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 bg-black relative">
                <iframe 
                  src="https://app.gptmaker.ai/widget/3ECEC99B41A6A3B6ED970EB86B3978C4/iframe" 
                  width="100%" 
                  style={{ height: '100%', border: 'none' }}
                  allow="microphone;" 
                  frameBorder="0"
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
