import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  X,
  Scissors,
  Star,
  Loader2,
  CalendarCheck2,
  Heart,
  Search,
} from 'lucide-react';
import {
  User,
  Service,
  Barber,
  Appointment,
  AppointmentStatus,
} from '../types';

interface BookingPageProps {
  user: User;
  services: Service[];
  staff: Barber[];
  onBookingComplete: (apt: Appointment) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({
  user,
  services,
  staff,
  onBookingComplete,
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [barberSearch, setBarberSearch] = useState('');

  const filteredBarbers = useMemo(() => {
    return staff.filter((b) =>
      b.name.toLowerCase().includes(barberSearch.toLowerCase())
    );
  }, [staff, barberSearch]);

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];
  const now = new Date();
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleBarberSelect = (barber: Barber) => {
    setSelectedBarber(barber);
    setIsConsulting(true);
    setTimeout(() => {
      setIsConsulting(false);
      setStep(2);
    }, 800);
  };

  const handleFinish = () => {
    setLoading(true);
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      clientId: user.id,
      clientName: user.name,
      barberId: selectedBarber!.id,
      barberName: selectedBarber!.name,
      serviceId: selectedService!.id,
      serviceName: selectedService!.name,
      date: `${selectedDate} de Maio`,
      time: selectedTime,
      status: AppointmentStatus.CONFIRMED,
      price: selectedService!.price,
    };

    setTimeout(() => {
      onBookingComplete(newAppointment);
      setLoading(false);
      setStep(6);
    }, 1500);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className='min-h-screen bg-[#050505] text-white flex flex-col pb-32'>
      <div className='p-6 md:p-12 max-w-6xl mx-auto w-full'>
        <header className='mb-16'>
          <div className='flex items-center justify-between mb-10'>
            <h1 className='text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none'>
              Reserva <br />
              <span className='text-zinc-800 font-serif italic lowercase tracking-normal'>
                Elite.
              </span>
            </h1>
            <button
              onClick={() => navigate('/dashboard')}
              className='w-16 h-16 bg-zinc-900/50 rounded-3xl text-zinc-600 hover:text-white transition-all border border-white/5 flex items-center justify-center shadow-2xl active:scale-90 group'
            >
              <X
                size={24}
                className='group-hover:rotate-90 transition-transform duration-500'
              />
            </button>
          </div>
          <div className='flex items-center justify-between relative max-w-4xl mx-auto px-4'>
            <div className='absolute top-1/2 left-0 w-full h-px bg-zinc-900 -z-10 -translate-y-1/2'></div>
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black border-2 ${
                  step >= s
                    ? 'bg-amber-500 border-amber-400 text-zinc-950 scale-110 shadow-lg'
                    : 'bg-zinc-950 border-zinc-900 text-zinc-700'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </header>

        <AnimatePresence mode='wait'>
          {step === 1 && (
            <motion.div
              key='step1'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='space-y-10'
            >
              <div className='relative max-w-md'>
                <Search
                  className='absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600'
                  size={18}
                />
                <input
                  type='text'
                  placeholder='Pesquisar barbeiro...'
                  value={barberSearch}
                  onChange={(e) => setBarberSearch(e.target.value)}
                  className='w-full bg-zinc-900/40 border border-white/5 rounded-4xl py-5 pl-16 pr-8 text-sm outline-none focus:border-amber-500/30'
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {filteredBarbers.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleBarberSelect(b)}
                    className='bg-zinc-900/40 border border-white/5 p-10 rounded-[4rem] text-center group hover:border-amber-500/50 transition-all relative overflow-hidden'
                  >
                    <img
                      src={b.avatar}
                      className='w-32 h-32 rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700 mx-auto object-cover mb-6'
                    />
                    <h3 className='text-2xl font-black text-white uppercase tracking-tighter'>
                      {b.name}
                    </h3>
                    <div className='flex items-center justify-center gap-2 mt-2'>
                      <Star size={10} className='text-amber-500 fill-current' />
                      <span className='text-[10px] font-black text-zinc-500 uppercase tracking-widest'>
                        {b.rating} Rank
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key='step2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='space-y-12'
            >
              <div className='grid grid-cols-7 gap-4 max-w-2xl mx-auto'>
                {daysInMonth.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDate(d);
                      setStep(3);
                    }}
                    className={`aspect-square rounded-3xl border text-sm font-black transition-all flex items-center justify-center ${
                      selectedDate === d
                        ? 'bg-amber-500 text-zinc-950 shadow-xl'
                        : 'bg-zinc-900/20 border-white/5 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key='step3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='space-y-12'
            >
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto'>
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setSelectedTime(time);
                      setStep(4);
                    }}
                    className='py-6 rounded-3xl border border-white/5 bg-zinc-900/40 text-[11px] font-black hover:bg-amber-500 hover:text-zinc-950 transition-all'
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key='step4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='space-y-10'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedService(s);
                      setStep(5);
                    }}
                    className='bg-zinc-900/40 border border-white/5 p-10 rounded-[3.5rem] flex items-center justify-between group hover:border-amber-500/50 transition-all text-left'
                  >
                    <div className='flex items-center gap-8'>
                      <img
                        src={s.image}
                        className='w-20 h-20 rounded-4xl object-cover grayscale group-hover:grayscale-0 transition-all'
                      />
                      <div>
                        <h3 className='font-black text-2xl text-white uppercase tracking-tighter leading-none'>
                          {s.name}
                        </h3>
                        <p className='text-amber-500 text-[11px] font-black uppercase mt-3'>
                          R$ {s.price} • {s.durationMinutes} min
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={24}
                      className='text-zinc-700 group-hover:text-amber-500'
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key='step5'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='max-w-xl mx-auto space-y-12'
            >
              <div className='bg-zinc-900/60 p-12 rounded-[4rem] border border-white/5 space-y-10'>
                <div className='space-y-6'>
                  <div className='flex justify-between border-b border-white/5 pb-4'>
                    <span className='text-zinc-500 uppercase tracking-widest text-[9px]'>
                      Barbeiro
                    </span>
                    <span className='text-white font-black uppercase text-sm'>
                      {selectedBarber?.name}
                    </span>
                  </div>
                  <div className='flex justify-between border-b border-white/5 pb-4'>
                    <span className='text-zinc-500 uppercase tracking-widest text-[9px]'>
                      Data & Hora
                    </span>
                    <span className='text-white font-black uppercase text-sm'>
                      {selectedDate} Mai • {selectedTime}
                    </span>
                  </div>
                  <div className='flex justify-between border-b border-white/5 pb-4'>
                    <span className='text-zinc-500 uppercase tracking-widest text-[9px]'>
                      Ritual
                    </span>
                    <span className='text-white font-black uppercase text-sm'>
                      {selectedService?.name}
                    </span>
                  </div>
                  <div className='flex justify-between pt-4'>
                    <span className='text-amber-500 uppercase tracking-widest text-[9px] font-black'>
                      Total
                    </span>
                    <span className='text-amber-500 font-black italic text-2xl'>
                      R$ {selectedService?.price}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleFinish}
                  disabled={loading}
                  className='w-full py-6 bg-amber-500 text-zinc-950 rounded-4xl font-black text-[12px] uppercase tracking-widest shadow-2xl hover:bg-white transition-all disabled:opacity-50'
                >
                  {loading ? 'Sincronizando...' : 'Confirmar Reserva'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key='step6'
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='flex flex-col items-center justify-center py-20 text-center space-y-10'
            >
              <div className='w-32 h-32 bg-amber-500 rounded-[3.5rem] flex items-center justify-center text-zinc-950 shadow-2xl'>
                <CheckCircle2 size={64} strokeWidth={3} />
              </div>
              <div className='space-y-4'>
                <h2 className='text-5xl font-black text-white uppercase tracking-tighter'>
                  Confirmado.
                </h2>
                <p className='text-zinc-500 text-[11px] font-black uppercase tracking-widest italic'>
                  Sua experiência foi reservada com sucesso.
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className='px-12 py-6 bg-zinc-900 border border-white/10 text-white rounded-4xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-zinc-950 transition-all'
              >
                Ir para Painel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingPage;
