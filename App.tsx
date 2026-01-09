
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/BookingPage';
import { User, Service, Appointment, Product, Barber, AppointmentStatus } from './types';
import { BACKGROUND_PATTERN_PROMPT, SERVICES as INITIAL_SERVICES, PRODUCTS as INITIAL_PRODUCTS, BARBERS as INITIAL_BARBERS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bgPattern, setBgPattern] = useState<string | null>(localStorage.getItem('barberpro_bg_pattern'));
  
  // Persisted Services
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('barberpro_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  // Persisted Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('barberpro_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Persisted Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('barberpro_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  // Persisted Staff
  const [staff, setStaff] = useState<Barber[]>(() => {
    const saved = localStorage.getItem('barberpro_staff');
    return saved ? JSON.parse(saved) : INITIAL_BARBERS;
  });

  useEffect(() => {
    localStorage.setItem('barberpro_services', JSON.stringify(services));
    localStorage.setItem('barberpro_products', JSON.stringify(products));
    localStorage.setItem('barberpro_appointments', JSON.stringify(appointments));
    localStorage.setItem('barberpro_staff', JSON.stringify(staff));
  }, [services, products, appointments, staff]);

  useEffect(() => {
    const savedUser = localStorage.getItem('barberpro_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    if (!bgPattern && process.env.API_KEY) {
      const generatePremiumPattern = async () => {
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: BACKGROUND_PATTERN_PROMPT }] },
          });

          const parts = response.candidates?.[0]?.content?.parts || [];
          for (const part of parts) {
            if (part.inlineData) {
              const base64 = part.inlineData.data;
              const url = `data:image/png;base64,${base64}`;
              setBgPattern(url);
              localStorage.setItem('barberpro_bg_pattern', url);
              break;
            }
          }
        } catch (error) {
          setBgPattern("url('https://www.transparenttextures.com/patterns/dark-matter.png')");
        }
      };
      generatePremiumPattern();
    }
  }, [bgPattern]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('barberpro_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('barberpro_user');
  };

  const addAppointment = (apt: Appointment) => {
    setAppointments(prev => [apt, ...prev]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-x-hidden">
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] grayscale"
        style={{ 
          backgroundImage: bgPattern ? (bgPattern.startsWith('data') ? `url(${bgPattern})` : bgPattern) : 'none',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px',
        }}
      />
      
      <div className="relative z-10">
        <HashRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onLogin={login} />} />
            <Route path="/dashboard/*" element={user ? (
              <Dashboard 
                user={user} 
                onLogout={logout} 
                services={services} 
                setServices={setServices}
                products={products}
                setProducts={setProducts}
                appointments={appointments}
                setAppointments={setAppointments}
                staff={staff}
                setStaff={setStaff}
              />
            ) : <Navigate to="/login" />} />
            <Route path="/booking" element={user ? (
              <BookingPage 
                user={user} 
                services={services} 
                staff={staff}
                onBookingComplete={addAppointment}
              />
            ) : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
