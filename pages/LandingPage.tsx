
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scissors, 
  ArrowRight, 
  Star,
  ChevronRight,
  Zap,
  CheckCircle2,
  Bot,
  MessageCircle,
  Layout,
  BarChart3,
  Smartphone,
  ShieldCheck,
  MousePointer2,
  Trophy,
  Layers,
  Sparkles
} from 'lucide-react';
import { BRAND_NAME, SERVICES } from '../constants';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'admin' | 'client'>('admin');

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden font-sans">
      {/* Navbar Fixa */}
      <nav className="fixed top-0 w-full z-[100] py-4 px-6 md:px-16 border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Scissors className="text-zinc-950 size-4 -rotate-45" strokeWidth={3} />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase text-white">{BRAND_NAME}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 rounded-lg text-zinc-400 text-[9px] font-black uppercase tracking-widest hover:text-white transition-all">
              ENTRAR
            </Link>
            <Link 
              to="/login" 
              className="px-5 py-2 bg-white text-zinc-950 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all shadow-lg"
            >
              CRIAR CONTA
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/[0.04] blur-[100px] rounded-full -z-10" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-16 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-zinc-400 text-[8px] font-black uppercase tracking-[0.3em]">Elite Tech Standard</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter uppercase max-w-5xl mx-auto">
              A maestria da barbearia <br/>
              <span className="text-zinc-900 font-serif italic normal-case tracking-normal lowercase outline-text-subtle">agora é</span> digital.
            </h1>
            
            <p className="text-zinc-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              O sistema operacional para barbearias de alto padrão. Gestão, escala e inteligência artificial em uma interface que exala prestígio.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-12 py-5 bg-amber-500 text-zinc-950 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-[0_20px_40px_rgba(245,158,11,0.2)] group"
            >
              EXPERIMENTAR GRÁTIS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* APP SHOWCASE SECTION (Demo Inside) */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16 space-y-4">
             <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.6em] italic">The Inside Experience</span>
             <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Performance de <span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-subtle">outro nível.</span></h2>
             <div className="flex justify-center mt-8">
                <div className="bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5 flex gap-1">
                   <button 
                     onClick={() => setActiveTab('admin')}
                     className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'admin' ? 'bg-amber-500 text-zinc-950 shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
                   >
                     Admin Console
                   </button>
                   <button 
                     onClick={() => setActiveTab('client')}
                     className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'client' ? 'bg-amber-500 text-zinc-950 shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
                   >
                     Client Experience
                   </button>
                </div>
             </div>
          </div>

          <div className="relative perspective-[2000px]">
            {/* Desktop Mockup */}
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, rotateX: 15, y: 40 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 w-full max-w-5xl mx-auto aspect-video bg-[#0a0a0c] rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
            >
               {/* Top Bar Mock */}
               <div className="h-8 bg-zinc-900/50 border-b border-white/5 flex items-center px-6 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
               </div>

               {/* Simulated App Content */}
               <div className="flex h-full">
                  {/* Sidebar Mock */}
                  <div className="w-1/5 border-r border-white/5 p-4 space-y-4 hidden md:block">
                     <div className="w-full h-4 bg-zinc-900 rounded-lg animate-pulse" />
                     <div className="space-y-2 pt-6">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full h-3 bg-zinc-900/50 rounded-lg" />)}
                     </div>
                  </div>
                  {/* Main Content Mock */}
                  <div className="flex-1 p-8 space-y-8">
                     <div className="flex justify-between items-center">
                        <div className="space-y-1">
                           <div className="w-32 h-4 bg-white/10 rounded-lg" />
                           <div className="w-48 h-2 bg-zinc-900 rounded-lg" />
                        </div>
                        <div className="w-12 h-12 bg-amber-500/20 rounded-xl border border-amber-500/30" />
                     </div>
                     
                     <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-24 bg-zinc-900/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                             <div className="w-8 h-8 bg-zinc-800 rounded-lg" />
                             <div className="w-full h-3 bg-white/5 rounded-lg" />
                          </div>
                        ))}
                     </div>

                     <div className="flex-1 h-32 bg-zinc-900/20 border border-dashed border-white/5 rounded-3xl flex items-center justify-center">
                        <BarChart3 className="text-zinc-800" size={40} />
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Mobile Mockup Overlay */}
            <motion.div 
              initial={{ x: 100, opacity: 0, rotateY: -15 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -right-4 -bottom-12 z-20 hidden lg:block"
            >
               <div className="w-[280px] h-[580px] bg-zinc-950 border-[8px] border-zinc-900 rounded-[3.5rem] shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-b-2xl z-30" />
                  
                  {/* Mobile App View */}
                  <div className="p-6 pt-12 space-y-8">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-zinc-950">
                           <Scissors size={20} />
                        </div>
                        <div className="w-24 h-4 bg-white/10 rounded-lg" />
                     </div>
                     
                     <div className="space-y-3">
                        <div className="w-full h-40 bg-zinc-900 rounded-3xl overflow-hidden relative">
                           <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />
                        </div>
                        <div className="w-full h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-zinc-950 font-black text-[9px] uppercase tracking-widest">
                           Agendar Ritual
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-3 pt-4">
                        <div className="h-20 bg-zinc-900 rounded-2xl" />
                        <div className="h-20 bg-zinc-900 rounded-2xl" />
                     </div>
                  </div>
                  
                  {/* Floating Bot Icon on Mobile */}
                  <div className="absolute bottom-8 right-8 w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                     <Bot className="text-zinc-950" size={24} />
                  </div>
               </div>
            </motion.div>

            {/* Floating Info Tags */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -left-12 top-1/4 z-30 bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl shadow-2xl hidden md:block"
            >
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">IA Concierge Ativo</span>
               </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -right-20 top-1/2 z-30 bg-amber-500 px-6 py-4 rounded-2xl shadow-2xl hidden md:block"
            >
               <div className="flex items-center gap-3">
                  <Zap className="text-zinc-950" size={16} />
                  <span className="text-[9px] font-black text-zinc-950 uppercase tracking-widest">+42% Conversão</span>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid de Benefícios */}
      <section className="py-24 bg-[#080808] border-y border-white/[0.03]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {[
              { icon: CheckCircle2, text: "Sync Real" },
              { icon: Layout, text: "Admin" },
              { icon: Scissors, text: "Cortes" },
              { icon: BarChart3, text: "BI Insights" },
              { icon: Bot, text: "IA Concierge" },
              { icon: Smartphone, text: "App Cliente" },
              { icon: ShieldCheck, text: "Seguro" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group cursor-default">
                <div className="w-12 h-12 bg-zinc-900/50 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:text-amber-500 group-hover:bg-zinc-800 transition-all border border-white/5 shadow-inner">
                  <item.icon size={20} />
                </div>
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest leading-tight group-hover:text-zinc-400 transition-colors">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destaque do Chatbot IA */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Bot className="text-amber-500" size={16} />
              <span className="text-amber-500 text-[9px] font-black uppercase tracking-widest">IA Concierge Signature</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
              O fim do <br/>
              <span className="text-zinc-900 font-serif italic normal-case lowercase outline-text-subtle">atendimento</span> manual.
            </h2>
            
            <p className="text-zinc-500 text-lg leading-relaxed font-medium italic border-l-4 border-amber-500/30 pl-8">
              "Enquanto você foca na lâmina, nossa IA integrada gerencia rituais, responde dúvidas e personaliza a experiência de cada cliente diretamente no portal."
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
               {[
                 { title: "Concierge Digital", icon: MessageCircle },
                 { title: "Upsell Inteligente", icon: Sparkles },
                 { title: "Confirmação Automática", icon: CheckCircle2 },
                 { title: "Fidelização Proativa", icon: Trophy }
               ].map((benefit, i) => (
                 <div key={i} className="flex items-center gap-3 p-4 bg-zinc-900/40 border border-white/5 rounded-2xl">
                    <benefit.icon className="text-amber-500" size={16} />
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">{benefit.title}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="relative bg-[#0a0a0c] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl overflow-hidden"
            >
              {/* Simulated Chat Interface */}
              <div className="space-y-6">
                <div className="flex justify-start">
                   <div className="bg-zinc-900/80 px-6 py-4 rounded-3xl rounded-tl-none border border-white/5 max-w-[85%]">
                      <p className="text-zinc-400 text-xs italic leading-relaxed">"Oi! Quero marcar um Corte Mestre para amanhã à tarde."</p>
                   </div>
                </div>
                <div className="flex justify-end">
                   <div className="bg-amber-500 px-6 py-4 rounded-3xl rounded-tr-none shadow-xl max-w-[85%]">
                      <p className="text-zinc-950 text-xs font-black leading-relaxed">"Olá! Tenho às 15:30 e 16:45 com o Marco. Qual prefere?"</p>
                   </div>
                </div>
                <div className="flex justify-start">
                   <div className="bg-zinc-900/80 px-6 py-4 rounded-3xl rounded-tl-none border border-white/5 max-w-[85%]">
                      <p className="text-zinc-400 text-xs italic leading-relaxed">"Pode ser 15:30. Já aproveita e coloca a Barba."</p>
                   </div>
                </div>
                <div className="flex justify-end">
                   <motion.div 
                     initial={{ scale: 0.8 }}
                     animate={{ scale: 1 }}
                     className="bg-zinc-950 border border-amber-500/50 px-6 py-4 rounded-3xl rounded-tr-none shadow-2xl max-w-[85%]"
                   >
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Agendamento Criado</span>
                      </div>
                      <p className="text-white text-xs font-black italic">"Perfeito! Combo Corte + Barba reservado para amanhã às 15:30."</p>
                   </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid de Serviços */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="text-center mb-20 space-y-4">
            <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.5em] italic">Menu de Rituais</span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Experiências <br/><span className="text-zinc-800 font-serif italic normal-case lowercase outline-text-subtle">que marcam.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service, idx) => (
              <motion.div 
                key={service.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-amber-500/20 transition-all flex flex-col shadow-2xl"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                    alt={service.name} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
                </div>
                <div className="p-8 space-y-6 flex-1 flex flex-col">
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{service.name}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed italic opacity-80 flex-1">"{service.description}"</p>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-amber-500 font-black text-xl italic tracking-tighter">R$ {service.price}</span>
                    <Link to="/login" className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-zinc-950 transition-all shadow-lg group-hover:bg-amber-500 group-hover:text-zinc-950">
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA Final */}
      <footer className="py-32 bg-[#050505] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-amber-500/[0.02] -z-10" />
        <div className="max-w-4xl mx-auto px-6 space-y-16 relative z-10">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
              Sua visão, <br/>
              <span className="text-amber-500 font-serif italic normal-case lowercase tracking-normal">nossa tecnologia.</span>
            </h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.8em] italic leading-relaxed">
              REDEFININDO O PADRÃO DE GESTÃO DO GROOMING MASCULINO
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/login" className="w-full sm:w-auto px-16 py-7 bg-white text-zinc-950 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.4em] hover:bg-amber-500 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)] active:scale-95">
              COMEÇAR AGORA
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-16 py-7 border border-white/10 text-white rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.4em] hover:bg-zinc-900 transition-all">
              VER DEMONSTRAÇÃO
            </Link>
          </div>

          <div className="pt-32 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center border border-white/5">
                <Scissors className="text-amber-500" size={14} />
              </div>
              <span className="text-lg font-black text-white tracking-tighter uppercase">{BRAND_NAME}</span>
            </div>
            
            <nav className="flex gap-8">
              {['Features', 'Pricing', 'Security', 'Contact'].map(link => (
                <a key={link} href="#" className="text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors">{link}</a>
              ))}
            </nav>

            <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">© 2025 ELITE GROOMING SYSTEM</p>
          </div>
        </div>
      </footer>

      <style>{`
        .outline-text-subtle {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.08);
          color: transparent;
        }
        .perspective-[2000px] {
          perspective: 2000px;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
