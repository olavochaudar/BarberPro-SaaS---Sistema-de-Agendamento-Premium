
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Lock, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  QrCode,
  Truck,
  FileText
} from 'lucide-react';
import { PRODUCTS } from '../../constants';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'apple' | 'google' | 'boleto'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Mock de dados do carrinho vindo do estado global ou localStorage
  const cartItems = JSON.parse(localStorage.getItem('barberpro_cart') || '[]');
  const productsInCart = useMemo(() => {
    return cartItems.map((item: any) => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      return { ...p, quantity: item.quantity };
    }).filter((p: any) => p.id);
  }, [cartItems]);

  const subtotal = productsInCart.reduce((acc: number, p: any) => acc + (p.price * p.quantity), 0);
  const shipping = 15;
  const total = subtotal + shipping;

  const handleProcessOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsFinished(true);
      localStorage.removeItem('barberpro_cart');
    }, 2500);
  };

  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="flex flex-col items-center justify-center py-20 text-center space-y-10"
      >
        <div className="w-32 h-32 bg-green-500 rounded-[3.5rem] flex items-center justify-center text-zinc-950 shadow-[0_30px_60px_rgba(34,197,94,0.3)]">
          <CheckCircle2 size={64} strokeWidth={3} />
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Aquisição <br/> Confirmada.</h2>
          <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.4em] italic max-w-xs mx-auto leading-relaxed">
            Seus produtos de elite estão sendo preparados para envio imediato.
          </p>
        </div>
        <button onClick={() => navigate('/dashboard/produtos')} className="px-12 py-6 bg-zinc-900 border border-white/10 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-zinc-950 transition-all shadow-xl">
          Voltar para a Boutique
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
           <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.6em] mb-2 block italic">Finalização Signature</span>
           <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Checkout <br/><span className="text-zinc-800 font-serif italic normal-case tracking-normal lowercase">exclusivo.</span></h1>
        </div>
        <button onClick={() => navigate(-1)} className="p-4 bg-zinc-900 border border-white/5 rounded-2xl text-zinc-600 hover:text-white transition-all">
          <ChevronLeft size={20} />
        </button>
      </header>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Lado Esquerdo: Pagamento */}
        <div className="lg:col-span-3 space-y-10">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-4">Método de Pagamento</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { id: 'card', icon: CreditCard, label: 'Cartão' },
                { id: 'pix', icon: QrCode, label: 'PIX' },
                { id: 'apple', icon: Smartphone, label: 'Apple' },
                { id: 'google', icon: GoogleIcon, label: 'Google' },
                { id: 'boleto', icon: FileText, label: 'Boleto' },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-6 rounded-3xl border flex flex-col items-center gap-3 transition-all ${
                      paymentMethod === method.id 
                      ? 'bg-amber-500 border-amber-400 text-zinc-950 shadow-xl scale-105' 
                      : 'bg-zinc-900/40 border-white/5 text-zinc-600 hover:text-zinc-300'
                    }`}
                  >
                    <Icon size={24} />
                    <span className="text-[8px] font-black uppercase tracking-widest">{method.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-8 md:p-12 space-y-8 relative overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              {paymentMethod === 'card' && (
                <motion.div 
                  key="card-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid gap-6">
                    <div className="space-y-3">
                      <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-4">Número do Cartão</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:border-amber-500/30 outline-none transition-all shadow-inner" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-4">Nome Impresso</label>
                      <input type="text" placeholder="OLAVO MESTRE" className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:border-amber-500/30 outline-none transition-all shadow-inner" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-4">Validade</label>
                        <input type="text" placeholder="MM/AA" className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:border-amber-500/30 outline-none transition-all shadow-inner" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-4">CVV</label>
                        <input type="text" placeholder="123" className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:border-amber-500/30 outline-none transition-all shadow-inner" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'pix' && (
                <motion.div 
                  key="pix-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center py-10 space-y-8"
                >
                  <div className="p-10 bg-white rounded-3xl shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                     <QrCode size={180} className="text-zinc-950" />
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Escaneie o código PIX</p>
                    <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest italic leading-relaxed max-w-xs">Sua transação será confirmada em milissegundos pela nossa rede elite.</p>
                  </div>
                  <button className="px-10 py-4 bg-zinc-950 border border-white/5 rounded-2xl text-[9px] font-black text-amber-500 uppercase tracking-[0.4em] hover:bg-white hover:text-zinc-950 transition-all shadow-xl">Copiar Código PIX</button>
                </motion.div>
              )}

              {(paymentMethod === 'apple' || paymentMethod === 'google') && (
                <motion.div 
                  key="social-pay"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-20 space-y-8"
                >
                   <div className="w-20 h-20 bg-zinc-950 rounded-full border border-white/10 flex items-center justify-center text-amber-500 shadow-inner">
                      {paymentMethod === 'apple' ? <Smartphone size={32} /> : <GoogleIcon />}
                   </div>
                   <p className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Clique em Confirmar para Autenticar</p>
                </motion.div>
              )}

              {paymentMethod === 'boleto' && (
                <motion.div 
                  key="boleto-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-16 space-y-8"
                >
                   <FileText size={64} className="text-zinc-700" />
                   <div className="text-center space-y-2">
                      <p className="text-xs font-black text-white uppercase tracking-widest">Boleto Bancário</p>
                      <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Compensação em até 48 horas úteis</p>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6 px-10 py-8 bg-zinc-900/20 border border-white/5 rounded-[3rem] opacity-60">
            <Lock size={20} className="text-amber-500" />
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] leading-relaxed">
              Sua segurança é nossa prioridade absoluta. <br/> Rede de pagamentos blindada v3.1 Signature.
            </p>
          </div>
        </div>

        {/* Lado Direito: Resumo do Pedido */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900/60 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 shadow-2xl sticky top-32">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.5em] mb-10 pb-6 border-b border-white/5 flex items-center gap-3">
              <ShoppingBag size={18} className="text-amber-500" /> Resumo Elite
            </h3>
            
            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-4 scrollbar-hide">
              {productsInCart.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between group p-2 hover:bg-white/[0.02] rounded-2xl transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 shadow-inner">
                      <img src={p.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={p.name} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-white uppercase tracking-tight leading-none">{p.name}</h4>
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-2">{p.quantity}x • R$ {p.price}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-white italic tracking-tighter">R$ {p.price * p.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-white/5 space-y-5">
              <div className="flex justify-between items-center text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-zinc-400 italic">R$ {subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <Truck size={14} className="text-zinc-700" /> Frete Express
                </div>
                <span className="text-green-500 italic">Grátis</span>
              </div>
              <div className="pt-8 flex justify-between items-end border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.5em] italic">Total Investido</p>
                  <p className="text-5xl font-black text-white italic tracking-tighter leading-none">R$ {subtotal}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                   <Zap size={20} className="text-amber-500 animate-pulse" />
                   <span className="text-[7px] font-black text-zinc-700 uppercase tracking-[0.3em]">Cashback +{Math.round(subtotal * 0.1)} pts</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleProcessOrder}
              disabled={isProcessing}
              className="w-full mt-12 py-8 bg-amber-500 text-zinc-950 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.5em] shadow-[0_30px_60px_rgba(245,158,11,0.25)] hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {isProcessing ? "Validando Protocolos..." : <>Processar Aquisição <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-500" /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
