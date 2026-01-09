
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Shield, Camera, Check, RefreshCw, Smartphone, Plus, Image as ImageIcon, Trash2 } from 'lucide-react';
import { User as UserType } from '../../types';

const PersonalDataPage: React.FC<{ user: UserType }> = ({ user }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user.avatar);
  const [styleGallery, setStyleGallery] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCurrentAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Fix: Added explicit type annotation (file: File) to ensure compatibility with readAsDataURL
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => setStyleGallery(prev => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-2xl mx-auto pb-32">
      <header className="text-center">
         <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.6em] mb-3 block italic">Identidade Exclusiva</span>
         <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">Dados <br/><span className="text-zinc-800 font-serif italic normal-case tracking-normal lowercase">pessoais.</span></h1>
      </header>

      <form onSubmit={handleSave} className="space-y-14">
        <div className="flex justify-center">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-44 h-44 rounded-[4rem] overflow-hidden border-[6px] border-zinc-900 shadow-2xl bg-zinc-950 ring-1 ring-white/5">
               <img src={currentAvatar} className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-105" alt={user.name} />
               <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Camera className="text-white mb-3" size={32} />
                  <span className="text-[9px] text-white font-black uppercase tracking-[0.4em]">Atualizar Foto</span>
               </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-amber-500 rounded-3xl border-4 border-zinc-950 flex items-center justify-center text-zinc-950 shadow-2xl group-hover:scale-110 transition-transform">
               <Shield size={24} strokeWidth={3} />
            </div>
            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
          </div>
        </div>

        <div className="grid gap-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-6 italic leading-none">Nome de Apresentação</label>
            <div className="relative">
              <User size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-800" />
              <input type="text" defaultValue={user.name} className="w-full bg-zinc-950 border border-white/5 rounded-[2rem] py-6 pl-20 pr-10 text-sm text-white font-bold focus:border-amber-500/30 outline-none transition-all shadow-inner" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-6 italic leading-none">E-mail de Contato Principal</label>
            <div className="relative">
              <Mail size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-800" />
              <input type="email" defaultValue={user.email} className="w-full bg-zinc-950 border border-white/5 rounded-[2rem] py-6 pl-20 pr-10 text-sm text-white font-bold focus:border-amber-500/30 outline-none transition-all shadow-inner" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-6 italic leading-none">WhatsApp para Agendamentos</label>
            <div className="relative">
              <Smartphone size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-800" />
              <input type="tel" placeholder="(11) 99999-9999" className="w-full bg-zinc-950 border border-white/5 rounded-[2rem] py-6 pl-20 pr-10 text-sm text-white font-bold focus:border-amber-500/30 outline-none transition-all shadow-inner" />
            </div>
          </div>
        </div>

        <div className="pt-10 space-y-8">
           <div className="flex items-center justify-between px-6">
              <div className="space-y-2">
                 <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Galeria de Referências</h3>
                 <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Estilos de corte que você prefere</p>
              </div>
              <button type="button" onClick={() => galleryInputRef.current?.click()} className="p-4 bg-zinc-900 border border-white/10 rounded-2xl text-amber-500 hover:bg-white hover:text-zinc-950 transition-all active:scale-90">
                 <Plus size={20} />
              </button>
              <input type="file" ref={galleryInputRef} onChange={handleGalleryUpload} className="hidden" accept="image/*" multiple />
           </div>

           <div className="grid grid-cols-3 gap-6">
              <AnimatePresence>
                {styleGallery.map((img, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-square rounded-3xl overflow-hidden border border-white/5 ring-1 ring-white/5 group shadow-2xl">
                    <img src={img} className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-110" />
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>

        <div className="pt-6">
           <button type="submit" disabled={isSaving} className={`w-full py-8 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-6 shadow-2xl active:scale-95 ${success ? 'bg-green-500 text-white' : 'bg-amber-500 text-zinc-950 hover:bg-white'}`}>
             {isSaving ? <RefreshCw className="animate-spin" size={24} /> : success ? <><Check size={24} strokeWidth={4} /> Identidade Sincronizada</> : 'Confirmar Alterações'}
           </button>
        </div>
      </form>
      
      <div className="flex items-center justify-center gap-4 py-8 opacity-20 border-t border-white/5">
         <Shield size={14} className="text-amber-500" />
         <span className="text-[8px] font-black text-white uppercase tracking-[0.8em]">Camada de Segurança Signature Ativa</span>
      </div>
    </motion.div>
  );
};

export default PersonalDataPage;
