import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export default function HeroSection({ onOpenDemo }: HeroSectionProps) {
  return (
    <section id="hero" className="relative w-full overflow-hidden pt-32 pb-20 md:py-36 border-b border-white/5">
      {/* Decorative Night Ambient Blue/Cyan radial light leak */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] aspect-square rounded-full bg-cyan-950/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- DESKTOP VIEW LAYOUT (hidden on mobile, shown on md:) --- */}
        <div className="hidden md:grid grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Highlights */}
          <div className="col-span-12 md:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Top Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-bright/10 border border-cyan-bright/25 text-cyan-bright text-[11px] font-sans font-medium tracking-wider uppercase mb-1"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-bright"></span>
              </span>
              <span>🌙 Recepción Inmobiliaria 24/7</span>
            </motion.div>

            {/* Main Title H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-display font-medium leading-tight tracking-tight text-white"
            >
              ¿Tu inmobiliaria vende <br className="hidden xl:inline" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-300 to-cyan-bright relative">
                mientras tú duermes?
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-300 leading-relaxed max-w-xl font-normal"
            >
              El mercado no tiene horarios. Mientras tu agencia descansa, otra que responde al instante se queda con la visita. Delega la atención nocturna y festiva a nuestro agente virtual.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                id="cta-hero-desktop"
                onClick={onOpenDemo}
                className="glow-btn-pulse relative inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-cyan-bright text-neutral-950 font-medium text-base hover:bg-white transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] group overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-900 transition-all group-hover:h-full -z-10 opacity-5" />
                👉 Ver cómo funciona
              </button>

              <button
                onClick={() => {
                  const calculator = document.getElementById('calculadora');
                  if (calculator) {
                    calculator.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm font-mono tracking-wider uppercase px-4 py-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10"
              >
                Calcular pérdida
                <ArrowRight size={14} className="ml-1" />
              </button>
            </motion.div>

            {/* Key benefits list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 max-w-lg text-xs font-mono text-slate-400"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-champagne/10 border border-champagne/25 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-champagne" />
                </div>
                <span>Sin costes de contratación</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-champagne/10 border border-champagne/25 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-champagne" />
                </div>
                <span>Integración CRM Directa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-champagne/10 border border-champagne/25 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-champagne" />
                </div>
                <span>Precalificación instantánea</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-champagne/10 border border-champagne/25 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-champagne" />
                </div>
                <span>Cierre en Agenda Google</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Beautiful animated Phone Mockup */}
          <div className="col-span-12 md:col-span-5 flex justify-end relative h-full">
            <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="relative w-full flex justify-center"
            >
              <PhoneMockup />
            </motion.div>
          </div>

        </div>


        {/* --- MOBILE VIEW LAYOUT (hidden on desktop, shown on mobile <= md) --- */}
        <div className="flex md:hidden flex-col items-center text-center space-y-6">
          
          {/* 1. Pill: Recepción Inmobiliaria 24/7 */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-bright/10 border border-cyan-bright/20 text-cyan-bright text-[11px] font-sans font-medium uppercase tracking-wider">
            🌙 Recepción Inmobiliaria 24/7
          </div>

          {/* 2. Title: Reduced size, maximum 3 lines */}
          <h1 className="text-3xl font-display font-medium text-white leading-tight px-1 max-w-[400px]">
            ¿Tu inmobiliaria vende <span className="text-cyan-bright">mientras tú duermes?</span>
          </h1>

          {/* 3. Subtitle: Short, highly readable text at least 16px */}
          <p className="text-base text-slate-300 leading-relaxed max-w-[340px] px-2 font-normal">
            El mercado no tiene horarios. Mientras tu agencia descansa, otra que responde al instante se queda con la visita. Delega la atención nocturna a nuestro agente.
          </p>

          {/* 4. CTA: Full-width button placed directly below the text for NO-SCROLL immediate conversion click */}
          <div className="w-full px-2">
            <button
              id="cta-hero-mobile"
              onClick={onOpenDemo}
              className="glow-btn-pulse w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-cyan-bright text-neutral-950 font-semibold text-base shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:bg-white active:scale-[0.98] transition-all cursor-pointer"
            >
              👉 Ver cómo funciona
            </button>
          </div>

          {/* 5. Smartphone Mockup (BELOW THE FOLD - visible on scrolling) */}
          <div className="w-full pt-12 relative flex flex-col items-center">
            <div className="absolute top-10 w-44 h-44 rounded-full bg-cyan-500/10 blur-[80px]" />
            
            {/* Visual separator hinting to scroll / slide down */}
            <div className="flex flex-col items-center gap-1.5 mb-6 text-slate-400 font-sans font-medium text-[11px] uppercase tracking-wider">
              <span>Demostración de flujo nocturno</span>
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-cyan-bright rounded-full"
              />
            </div>

            <PhoneMockup compact />
          </div>

        </div>

      </div>
    </section>
  );
}
