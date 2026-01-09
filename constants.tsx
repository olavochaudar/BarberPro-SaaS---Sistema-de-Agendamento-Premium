
import { Service, Barber, UserRole, AppointmentStatus, Appointment, Product } from './types';

export const BRAND_NAME = "BarberPro";
export const PRIMARY_COLOR = "amber-500";

export const CONTACT_INFO = {
  phone: "(11) 99999-9999",
  whatsapp: "5511999999999",
  address: "Av. Paulista, 1000, Jardins - SP",
  instagram: "@barberpro_oficial",
  email: "contato@barber.pro"
};

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200";

export const SERVICES: Service[] = [
  { 
    id: '1', 
    name: 'Corte Mestre', 
    description: 'Corte preciso utilizando técnicas modernas de fade e tesoura. Finalização com produtos de elite.', 
    price: 85, 
    durationMinutes: 45, 
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1202&v=4',
    isActive: true
  },
  { 
    id: '2', 
    name: 'Barba Imperial', 
    description: 'Design de barba com visagismo, toalha quente e óleos essenciais de sândalo.', 
    price: 60, 
    durationMinutes: 30, 
    image: 'https://images.unsplash.com/photo-1621605815841-aa3397502c52?auto=format&fit=crop&q=80&w=1200',
    isActive: true
  },
  { 
    id: '3', 
    name: 'O Ritual Completo', 
    description: 'Nossa experiência definitiva: Cabelo, Barba, Sobrancelha e Massagem Capilar relaxante.', 
    price: 130, 
    durationMinutes: 75, 
    image: 'https://images.unsplash.com/photo-1599351431247-f132f82f23b9?auto=format&fit=crop&q=80&w=1200', 
    isCombo: true,
    isActive: true
  },
  { 
    id: '4', 
    name: 'Fade Executivo', 
    description: 'Degradê cirúrgico para profissionais que exigem perfeição constante em sua imagem.', 
    price: 75, 
    durationMinutes: 40, 
    image: 'https://images.unsplash.com/photo-1622286332305-276f7f79c29d?auto=format&fit=crop&q=80&w=1200',
    isActive: true
  },
];

export const PRODUCTS: Product[] = [
  { 
    id: 'p1', 
    name: 'Pomada Matte Clay', 
    price: 89, 
    category: 'Estilo', 
    image: 'https://images.unsplash.com/photo-1621605815841-aa3397502c52?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'p2', 
    name: 'Óleo Sândalo Noir', 
    price: 65, 
    category: 'Cuidado', 
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'p3', 
    name: 'Shampoo Signature', 
    price: 55, 
    category: 'Higiene', 
    image: 'https://images.unsplash.com/photo-1532713031318-db2d14e4b3e1?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'p4', 
    name: 'Loção Pós Barba', 
    price: 72, 
    category: 'Cuidado', 
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800' 
  },
];

export const BARBERS: Barber[] = [
  { 
    id: 'b1', 
    name: 'Marco "A Lâmina"', 
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400', 
    specialties: ['Clássico', 'Barba'], 
    rating: 4.9, 
    bio: '15 anos de tradição esculpindo identidades clássicas com precisão absoluta.', 
    status: 'busy', 
    nextAvailableSlot: '16:30' 
  },
  { 
    id: 'b2', 
    name: 'Leo Fade', 
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400', 
    specialties: ['Degradê', 'Moderno'], 
    rating: 4.8, 
    bio: 'Mestre das texturas e fades urbanos. A arte do degradê levada ao extremo.', 
    status: 'available' 
  },
];

export const BACKGROUND_PATTERN_PROMPT = "A very subtle, high-quality, minimal dark charcoal pattern for a luxury barbershop. Elegant line art of scissors and razors. Repetitive, low contrast, professional noir design.";
