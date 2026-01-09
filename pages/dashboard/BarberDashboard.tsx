
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Scissors, User as UserIcon, CheckCircle, XCircle, Settings, ToggleLeft, ToggleRight, Coffee, Info } from 'lucide-react';
import { User } from '../../types';

const BarberDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [activeView, setActiveView] = useState<'agenda' | 'escala'>('agenda');
  
  // Liberdade Total: Gestão de dias de trabalho
  const [schedule, setSchedule] = useState({
    seg: true, ter: true, qua: true, qui: true, sex: true, sab: true, dom: false
  });

  const toggleDay = (day: keyof typeof schedule) => {
    setSchedule(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="space-y-12 pb-32 max-w-6xl mx-auto">
      
      {/* Header com Navegação Interna */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
         <div className="space-y-3">
            <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.5em] italic">Workstation Console</span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              {activeView === 'agenda' ? <>Minha <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">agenda hoje.</span></> : 
               <>Escala & <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-gold">liberdade.</span></>}
            </h1>
         </div>

         <div className="flex bg-zinc-900/40 p-1.5 rounded-[2rem] border border-white/5 backdrop-blur-xl">
            <button 
              onClick={() => setActiveView('agenda')}
              className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'agenda' ? 'bg-amber-500 text-zinc-950 shadow-xl' : 'text-zinc-600 hover:text-white'}`}
            >
              Agenda
            </button>
            <button 
              onClick={() => setActiveView('escala')}
              className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'escala' ? 'bg-amber-500 text-zinc-950 shadow-xl' : 'text-zinc-600 hover:text-white'}`}
            >
              Minha Escala
            </button>
         </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'agenda' ? (
          <motion.div 
            key="agenda" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 20 }}
            className="grid lg:grid-cols-4 gap-10"
          >
            {/* Quick Summary Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#080808] border border-white/5 p-8 rounded-[3rem] space-y-8 shadow-2xl ring-1 ring-white/5">
                <div className="space-y-4">
                  <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Resumo Financeiro</span>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-zinc-950 p-4 rounded-2xl border border-white/5">
                       <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Ganhos</span>
                       <span className="text-amber-500 font-black text-lg italic tracking-tighter">R$ 280,00</span>
                    </div>
                    <div className="flex justify-between items-center bg-zinc-950 p-4 rounded-2xl border border-white/5">
                       <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Rituais</span>
                       <span className="text-white font-black text-lg italic tracking-tighter">12</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5">
                   <button className="w-full py-5 bg-zinc-950 border border-amber-500/20 text-amber-500 rounded-2xl font-black text-[9px] uppercase tracking-[0.4em] hover:bg-amber-500 hover:text-zinc-950 transition-all shadow-xl group">
                      BATER PONTO <CheckCircle size={14} className="inline ml-2 group-hover:scale-110 transition-transform" />
                   </button>
                </div>
              </div>

              <div className="p-8 bg-zinc-900/20 border border-dashed border-white/10 rounded-[3rem] text-center opacity-40">
                 <Coffee size={24} className="mx-auto text-zinc-800 mb-2" />
                 <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Tempo de Intervalo Restante: 45min</p>
              </div>
            </div>

            {/* Timeline Detailed */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between px-6 mb-2">
                 <h3 className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.5em]">Próximos Clientes</h3>
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Tempo Real</span>
                 </div>
              </div>

              <div className="space-y-4">
                {[
                  { time: '09:00', client: 'Gabriel Fontes', service: 'Corte Mestre', status: 'CONFIRMADO' },
                  { time: '10:30', client: 'Bruno Silva', service: 'Barba Imperial', status: 'CONFIRMADO' },
                  { time: '13:00', client: 'Rafael Mendes', service: 'O Ritual Completo', status: 'PENDENTE' },
                  { time: '15:00', client: 'Fernando Costa', service: 'Fade Executivo', status: 'CONCLUÍDO' },
                ].map((slot, idx) => (
                  <div key={idx} className={`bg-[#0a0a0c] border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-10 group hover:bg-zinc-900/40 transition-all ${slot.status === 'CONCLUÍDO' ? 'opacity-30' : ''}`}>
                    <div className="w-20 h-20 bg-zinc-950 rounded-[1.8rem] flex flex-col items-center justify-center border border-white/5 shadow-inner group-hover:border-amber-500/30 transition-colors">
                       <Clock size={16} className="text-amber-500 mb-1" />
                       <span className="text-white font-black text-lg italic tracking-tighter">{slot.time}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-4 mb-2">
                          <h4 className="text-lg font-black text-white uppercase tracking-tight truncate">{slot.client}</h4>
                          <span className={`px-4 py-1 rounded-full border text-[7px] font-black uppercase tracking-widest ${slot.status === 'CONCLUÍDO' ? 'bg-zinc-900 text-zinc-600 border-white/5' : 'bg-amber-500/5 text-amber-500 border-amber-500/10'}`}>{slot.status}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Scissors size={14} className="text-zinc-800" />
                          <span className="text-[11px] font-black text-zinc-600 uppercase tracking-tighter">{slot.service}</span>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 pr-4">
                       {slot.status === 'CONFIRMADO' && (
                         <>
                           <button className="w-14 h-14 bg-zinc-900 border border-white/5 text-zinc-600 hover:text-green-500 flex items-center justify-center rounded-2xl transition-all shadow-xl active:scale-90" title="Finalizar"><CheckCircle size={20} /></button>
                           <button className="w-14 h-14 bg-zinc-900 border border-white/5 text-zinc-600 hover:text-red-500 flex items-center justify-center rounded-2xl transition-all shadow-xl active:scale-90" title="Faltou"><XCircle size={20} /></button>
                         </>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="escala" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Gestão de Dias de Trabalho */}
            <div className="bg-[#0a0a0c] border border-white/5 rounded-[4rem] p-12 space-y-10 shadow-2xl">
               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Dias de Trabalho</h3>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em] italic">Ative sua disponibilidade semanal</p>
               </div>

               <div className="space-y-4">
                  {Object.entries(schedule).map(([day, active]) => (
                    <div key={day} className="flex items-center justify-between p-6 bg-zinc-950 border border-white/5 rounded-3xl group hover:border-amber-500/20 transition-all">
                       <div className="flex items-center gap-6">
                          <span className="text-lg font-black text-white uppercase tracking-tighter w-12">{day}</span>
                          <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-amber-500' : 'text-zinc-800'}`}>{active ? 'Turno Disponível' : 'Dia de Folga'}</span>
                       </div>
                       <button onClick={() => toggleDay(day as any)} className={`transition-all ${active ? 'text-amber-500' : 'text-zinc-800'}`}>
                          {active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                       </button>
                    </div>
                  ))}
               </div>
            </div>

            {/* Configurações de Horário e Bloqueios */}
            <div className="space-y-8">
               <div className="bg-[#0a0a0c] border border-white/5 rounded-[4rem] p-12 space-y-10 shadow-2xl">
                  <div className="space-y-4">
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Horário de Pico</h3>
                     <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em] italic">Janela de Atendimento Padrão</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-3">
                        <label className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.5em] ml-4">Início Turno</label>
                        <input type="text" defaultValue="09:00" className="w-full bg-zinc-950 border border-white/5 rounded-full py-5 px-8 text-sm font-black text-white outline-none focus:border-amber-500/30" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.5em] ml-4">Fim Turno</label>
                        <input type="text" defaultValue="20:00" className="w-full bg-zinc-950 border border-white/5 rounded-full py-5 px-8 text-sm font-black text-white outline-none focus:border-amber-500/30" />
                     </div>
                  </div>
               </div>

               <div className="bg-amber-500/5 border border-amber-500/10 rounded-[3rem] p-10 flex gap-6 items-start">
                  <div className="p-4 bg-zinc-950 rounded-2xl border border-white/5 text-amber-500">
                     <Info size={24} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Liberdade de Agenda</h4>
                     <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed italic">Suas alterações na escala são sincronizadas instantaneamente com o portal de agendamento dos clientes.</p>
                  </div>
               </div>

               <button className="w-full py-8 bg-white text-zinc-950 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.5em] shadow-2xl hover:bg-amber-500 transition-all active:scale-95">Sincronizar Minha Escala</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .outline-text-gold {
          -webkit-text-stroke: 1.5px rgba(245, 158, 11, 0.08);
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default BarberDashboard;
