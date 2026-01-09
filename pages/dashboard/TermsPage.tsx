
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Scale, FileText } from 'lucide-react';

const TermsPage: React.FC = () => {
  const sections = [
    {
      icon: Scale,
      title: "1. Termos de Uso",
      content: "Ao acessar o BarberPro, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. O uso do aplicativo é pessoal e intransferível. Reservamo-nos o direito de suspender contas que violem nossas políticas de conduta."
    },
    {
      icon: Lock,
      title: "2. Privacidade de Dados",
      content: "Seus dados são protegidos por criptografia de ponta a ponta. Não compartilhamos informações pessoais com terceiros sem consentimento explícito. Coletamos apenas dados necessários para a prestação do serviço de agendamento e melhoria da experiência."
    },
    {
      icon: ShieldCheck,
      title: "3. Política de Cancelamento",
      content: "A barbearia parceira define suas próprias regras de cancelamento. O BarberPro atua apenas como facilitador da transação. Taxas de 'no-show' podem ser aplicadas conforme as políticas individuais de cada estabelecimento cadastrado."
    },
    {
      icon: FileText,
      title: "4. Propriedade Intelectual",
      content: "Todo o design, código-fonte e elementos visuais do BarberPro são de propriedade exclusiva da Elite Grooming Corp. Qualquer reprodução ou uso não autorizado é estritamente proibido e sujeito a medidas legais cabíveis."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-3xl mx-auto space-y-16 pb-32"
    >
      <header className="space-y-4">
         <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.5em] italic">Legal & Compliance</span>
         <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Termos de Uso <br/><span className="text-zinc-800 font-serif italic normal-case tracking-normal lowercase">& privacidade.</span></h1>
         <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest pt-4 italic">Última atualização: 20 de Maio de 2025</p>
      </header>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-6">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-amber-500">
                   <section.icon size={18} />
                </div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">{section.title}</h4>
             </div>
             <p className="text-zinc-500 text-[13px] leading-relaxed font-medium italic border-l-2 border-zinc-900 pl-8">
               {section.content}
             </p>
          </div>
        ))}
      </div>

      <div className="p-10 bg-zinc-900/20 border border-white/5 rounded-[3rem] text-center">
         <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] leading-relaxed">
           Para dúvidas jurídicas específicas, entre em contato <br/> com o nosso departamento legal: <span className="text-white">legal@barber.pro</span>
         </p>
      </div>
    </motion.div>
  );
};

export default TermsPage;
