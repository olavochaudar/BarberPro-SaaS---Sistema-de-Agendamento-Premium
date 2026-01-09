
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Filter, Heart, ChevronRight, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { FALLBACK_IMAGE } from '../../constants';

interface StorePageProps {
  products: Product[];
}

const StorePage: React.FC<StorePageProps> = ({ products }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tudo');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{id: string, quantity: number}[]>(() => {
    const saved = localStorage.getItem('barberpro_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const saveCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem('barberpro_cart', JSON.stringify(newCart));
  };

  const addToCart = (id: string) => {
    const existing = cart.find(item => item.id === id);
    const newCart = existing ? cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : [...cart, { id, quantity: 1 }];
    saveCart(newCart);
  };

  const removeFromCart = (id: string) => {
    const existing = cart.find(item => item.id === id);
    const newCart = existing?.quantity === 1 ? cart.filter(item => item.id !== id) : cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
    saveCart(newCart);
  };

  const cartStats = useMemo(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => {
      const product = products.find(p => p.id === item.id);
      return acc + (product?.price || 0) * item.quantity;
    }, 0);
    return { totalItems, totalPrice };
  }, [cart, products]);

  const filteredProducts = products.filter(p => 
    (activeCategory === 'Tudo' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-48">
      <div className="space-y-6">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Essenciais <br/><span className="text-zinc-600">de estilo.</span></h1>
        <div className="relative max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
          <input type="text" placeholder="Pesquisar pomadas..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-xs text-white outline-none focus:border-amber-500/50" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((p, idx) => {
           const quantity = cart.find(item => item.id === p.id)?.quantity || 0;
           return (
             <motion.div key={p.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="group relative bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] overflow-hidden">
                <img src={p.image || FALLBACK_IMAGE} className="aspect-square object-cover grayscale group-hover:grayscale-0 transition-all" />
                <div className="p-6 space-y-2">
                   <h4 className="text-sm font-black text-white uppercase truncate">{p.name}</h4>
                   <p className="text-amber-500 font-black text-lg italic">R$ {p.price}</p>
                   <div className="flex items-center justify-between pt-4">
                      {quantity > 0 ? (
                        <div className="flex items-center gap-4 bg-zinc-950 px-4 py-2 rounded-xl border border-white/5">
                           <button onClick={() => removeFromCart(p.id)} className="text-zinc-500 hover:text-white">-</button>
                           <span className="text-xs font-black text-white">{quantity}</span>
                           <button onClick={() => addToCart(p.id)} className="text-zinc-500 hover:text-white">+</button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(p.id)} className="flex-1 py-3 bg-white text-zinc-950 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-amber-500">Adicionar</button>
                      )}
                   </div>
                </div>
             </motion.div>
           );
        })}
      </div>

      <AnimatePresence>
        {cartStats.totalItems > 0 && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs">
            <button onClick={() => navigate('/dashboard/checkout')} className="w-full h-20 bg-amber-500 text-zinc-950 rounded-[2rem] flex items-center justify-between px-8 shadow-2xl active:scale-95 group">
               <div className="flex items-center gap-4"><div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-amber-500"><ShoppingBag size={20} /></div><p className="font-black text-[10px] uppercase leading-none">Checkout</p></div>
               <span className="font-black text-xl italic tracking-tighter">R$ {cartStats.totalPrice}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StorePage;
