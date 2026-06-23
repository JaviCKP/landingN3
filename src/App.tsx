import React, { useState } from 'react';
import { Calendar, Menu, X, ArrowRight } from 'lucide-react';
import HeroSection from './components/HeroSection';
import AuthoritySection from './components/AuthoritySection';
import CalculatorSection from './components/CalculatorSection';
import FooterSection from './components/FooterSection';
import DemoInteractiveModal from './components/DemoInteractiveModal';
import ContactFormModal from './components/ContactFormModal';
import Logo from './components/Logo';

export default function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenDemo = () => {
    setIsDemoOpen(true);
    setMobileMenuOpen(false);
  };

  const handleOpenContact = () => {
    setIsContactOpen(true);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-navy-dark text-white selection:bg-cyan-bright/30 selection:text-white relative">
      
      {/* Premium Atmospheric Architectural Background & Film Grain Overlay */}
      <div 
        className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-[0.05] filter blur-[15px] pointer-events-none z-0 scale-105" 
      />
      <div className="fixed inset-0 noise-grain pointer-events-none z-10" />

      {/* 1. Header Navigation Bar (Modern Boutique Styling) */}
      <header className="fixed top-0 left-0 w-full z-40 bg-navy-dark/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Logo className="w-9 h-9 rounded-xl group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,216,237,0.3)]" />
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white flex items-center gap-1.5">
              IACRECE
            </span>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-cyan-bright hover:translate-y-[-1px] transition-all"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('autoridad')} 
              className="hover:text-cyan-bright hover:translate-y-[-1px] transition-all"
            >
              Métricas del Sector
            </button>
            <button 
              onClick={() => scrollToSection('calculadora')} 
              className="hover:text-cyan-bright hover:translate-y-[-1px] transition-all"
            >
              Calculadora de Impacto
            </button>
          </nav>

          {/* Header Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleOpenDemo}
              className="px-5 py-2.5 rounded-lg bg-cyan-bright/10 border border-cyan-bright/35 hover:border-cyan-bright text-cyan-bright hover:bg-cyan-bright hover:text-neutral-950 text-xs font-mono font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer"
            >
              Probar Demo
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy-medium border-b border-white/5 py-6 px-6 space-y-4">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="block w-full text-left py-2 text-slate-100 hover:text-cyan-bright transition-colors font-medium"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('autoridad')} 
              className="block w-full text-left py-2 text-slate-100 hover:text-cyan-bright transition-colors font-medium"
            >
              Métricas del Sector
            </button>
            <button 
              onClick={() => scrollToSection('calculadora')} 
              className="block w-full text-left py-2 text-slate-100 hover:text-cyan-bright transition-colors font-medium"
            >
              Calculadora de Impacto
            </button>
            <div className="pt-4 border-t border-white/5">
              <button
                onClick={handleOpenDemo}
                className="w-full text-center py-3 px-4 bg-cyan-bright text-neutral-950 rounded-xl font-semibold text-sm transition-all cursor-pointer"
              >
                Probar Demo Interactiva
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. Structured Page Content Sections */}
      <main className="relative z-20">
        {/* 2.1 Hero Section */}
        <HeroSection onOpenDemo={handleOpenDemo} />

        {/* 2.2 Authority & Real World Data Section */}
        <AuthoritySection />

        {/* 2.3 Interactive Calculator & ROI Section */}
        <CalculatorSection />

        {/* 2.4 Footer & Final Closing CTA Section */}
        <FooterSection onOpenDemo={handleOpenDemo} onOpenContact={handleOpenContact} />
      </main>

      {/* 3. Interactive Chat Bot Simulator Modal Panel Overlay */}
      <DemoInteractiveModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      {/* 4. Beautiful Contact Detail & Google Calendar Scheduler Modal Overlay */}
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

    </div>
  );
}
