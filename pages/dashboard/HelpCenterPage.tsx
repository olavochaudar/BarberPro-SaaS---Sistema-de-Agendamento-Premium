
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';

const HelpCenterPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Como cancelar um agendamento?", a: "Você pode cancelar rituais na aba 'Meus Agendamentos' com até 2 horas de antecedência sem cobrança de taxa." },
    { q: "Como funcionam os pontos de fidelidade?", a: "Cada R$ 1,00 gasto em serviços ou produtos acumula 1 ponto. Os pontos podem ser trocados na aba 'Clube Elite'." },
    { q: "Quais as formas de pagamento aceitas?", a: "Aceitamos todos os cartões de crédito, débito, PIX e pagamento direto na barbearia." },
    { q: "Posso agendar para outra pessoa?", a: "Sim, basta informar os dados do cliente no momento da reserva no campo de observações ou via WhatsApp." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="space-y-16 max-w-4xl mx-auto pb-32"
    >
      <div className="text-center space-y-6">
         <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.6em] italic">Support Center</span>
         <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">Como podemos <br/><span className="text-zinc-800 font-serif italic normal-case tracking-normal lowercase">te ajudar?</span></h1>
         <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input 
              type="text" 
              placeholder="Pesquise por uma dúvida ou problema..." 
              className="w-full bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] py-6 pl-16 pr-8 text-sm text-white focus:border-amber-500/30 outline-none transition-all shadow-2xl"
            />
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: MessageCircle, title: "Chat Exclusivo", desc: "Suporte em tempo real com nossa IA Concierge", label: "Abrir Concierge" },
          { icon: Mail, title: "E-mail", desc: "Respondemos em até 24 horas úteis", label: "Enviar Ticket" },
          { icon: Phone, title: "Telefone", desc: "Atendimento direto de Seg a Sab", label: "Ligar Agora" },
        ].map((item, idx) => (
          <div key={idx} className="p-8 bg-zinc-900/40 border border-white/5 rounded-[3rem] text-center space-y-4 hover:border-amber-500/20 transition-all group">
             <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-zinc-700 mx-auto group-hover:text-amber-500 transition-colors">
                <item.icon size={24} />
             </div>
             <div>
                <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">{item.title}</h4>
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">{item.desc}</p>
             </div>
             <button className="text-[9px] font-black text-amber-500 uppercase tracking-widest pt-2 flex items-center justify-center gap-2 mx-auto hover:text-white transition-colors">
                {item.label} <ExternalLink size={10} />
             </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-6 italic">Perguntas Frequentes</h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#0a0a0c] border border-white/5 rounded-[2rem] overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left group"
              >
                <span className="text-xs font-black text-white uppercase tracking-tight group-hover:text-amber-500 transition-colors">{faq.q}</span>
                <ChevronDown className={`text-zinc-700 transition-transform duration-500 ${activeFaq === idx ? 'rotate-180' : ''}`} size={18} />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-[11px] font-medium text-zinc-500 leading-relaxed italic border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HelpCenterPage;
