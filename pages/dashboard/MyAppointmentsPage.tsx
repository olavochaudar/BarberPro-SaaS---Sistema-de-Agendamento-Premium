
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Scissors, XCircle, RefreshCw, Star, AlertCircle } from 'lucide-react';
import { User, Appointment, AppointmentStatus } from '../../types';

const MyAppointmentsPage: React.FC<{ user: User, appointments: Appointment[] }> = ({ user, appointments }) => {
  const userAppointments = appointments.filter(apt => apt.clientId === user.id);

  const getStatusColor = (status: AppointmentStatus) => {
    switch(status) {
      case AppointmentStatus.CONFIRMED: return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
      case AppointmentStatus.COMPLETED: return 'text-zinc-500 border-white/5 bg-white/5';
      case AppointmentStatus.CANCELLED: return 'text-red-500 border-red-500/20 bg-red-500/5';
      default: return 'text-zinc-400 border-white/5 bg-zinc-900';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 max-w-4xl mx-auto pb-32">
      <div>
         <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.5em] mb-2 block italic">Booking History</span>
         <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Meus <br/><span className="text-zinc-800 font-serif italic normal-case tracking-normal lowercase">rituais.</span></h1>
      </div>

      <div className="space-y-6">
        {userAppointments.length > 0 ? userAppointments.map((apt, idx) => (
          <motion.div key={apt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] p-8 group hover:bg-[#0e0e11] transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-zinc-900 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-zinc-500 shadow-inner group-hover:border-amber-500/30 transition-colors">
                  <Calendar size={18} className="mb-1 text-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{apt.date.split(' ')[0]}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${getStatusColor(apt.status)}`}>{apt.status}</span>
                    <span className="text-white font-black text-sm uppercase tracking-tight">{apt.serviceName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-amber-500" /> {apt.time}</span>
                    <span className="flex items-center gap-1.5"><Scissors size={12} /> {apt.barberName}</span>
                  </div>
                </div>
              </div>
              <div className="text-right"><p className="text-[9px] font-black text-zinc-700 uppercase mb-1.5">Investimento</p><p className="text-lg font-black text-white italic tracking-tighter">R$ {apt.price}</p></div>
            </div>
          </motion.div>
        )) : (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-white/5 rounded-[3rem]">
            <AlertCircle className="text-zinc-800" size={40} />
            <p className="text-zinc-600 font-black text-[9px] uppercase tracking-widest">Nenhum ritual agendado ainda.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyAppointmentsPage;
