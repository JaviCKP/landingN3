import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Clock, CheckCircle2, MessageSquare, Send, User } from 'lucide-react';
import Logo from './Logo';

interface PhoneMockupProps {
  interactive?: boolean;
}

export default function PhoneMockup({ interactive = false }: PhoneMockupProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (interactive) return;

    // Steps timing loop:
    // 0: Initial rest at 03:15 AM, moon floating (3s)
    // 1: Client message incoming (4s)
    // 2: IA writing indicator (2.5s)
    // 3: IA responds instantly (4s)
    // 4: Confirmation Badge appears (4s)
    // Total loop ~17.5s, then resets
    
    const timers: number[] = [];

    const runLoop = () => {
      setStep(0);
      
      timers.push(window.setTimeout(() => setStep(1), 2500));
      timers.push(window.setTimeout(() => setStep(2), 5500));
      timers.push(window.setTimeout(() => setStep(3), 8000));
      timers.push(window.setTimeout(() => setStep(4), 11500));
      timers.push(window.setTimeout(() => {
        runLoop();
      }, 16000));
    };

    runLoop();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [interactive]);

  return (
    <div id="phone-container" className="relative mx-auto w-full max-w-[340px] md:max-w-[300px] aspect-[8/9] md:aspect-[9/19] rounded-[36px] md:rounded-[40px] border-[3px] md:border-4 border-slate-800 bg-slate-950 p-2 md:p-3 shadow-2xl glass-panel-glow overflow-hidden">
      {/* Dynamic Cyan Glow Backlight */}
      <div className="absolute -inset-10 bg-radial from-cyan-500/10 to-transparent pointer-events-none rounded-[40px]" />

      {/* Screen Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center">
        <div className="w-12 h-1.5 bg-slate-950 rounded-full" />
      </div>

      {/* Screen Content */}
      <div className="relative h-full w-full bg-[#080E14] rounded-[30px] flex flex-col justify-between overflow-hidden pt-6 pb-2 font-sans select-none">
        
        {/* Status Bar */}
        <div className="px-4 py-1 flex justify-between items-center text-[10px] font-mono text-slate-400 z-10 border-b border-white/5 bg-[#080E14]/90 backdrop-blur-md">
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-champagne" />
            <span className="font-semibold text-white">03:15 AM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            <span className="text-[9px] px-1 rounded bg-cyan-bright/10 text-cyan-bright font-medium tracking-widest uppercase">24/7 ACTIVO</span>
          </div>
        </div>

        {/* Ambient Night Background Graphic inside the phone */}
        <div className="absolute inset-0 bg-linear-to-b from-navy-dark via-navy-medium to-[#080E14] pointer-events-none" />

        {/* Floating elements indicating sleep/night */}
        <div className="absolute top-12 right-6 flex flex-col items-center pointer-events-none">
          <Moon size={22} className="text-champagne/45 animate-pulse duration-2000 mb-0.5" />
          <div className="flex space-x-1">
            <span className="text-[8px] text-champagne/50 animate-bounce delay-100">Z</span>
            <span className="text-[10px] text-champagne/60 animate-bounce delay-300">z</span>
            <span className="text-[12px] text-champagne/75 animate-bounce delay-500">z</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col space-y-3 justify-end z-10">
          
          {/* Welcome Intro (Always visible) */}
          <div className="text-center pb-4 border-b border-white/5 opacity-50">
            <p className="text-[10px] text-slate-300 font-mono font-medium">Recepción Inmobiliaria IACRECE</p>
            <p className="text-[8px] text-slate-500">Atención instantánea 24/7 sin esperas</p>
          </div>

          <AnimatePresence mode="popLayout">
            {/* Step 1 & beyond: Client sends message */}
            {step >= 1 && (
              <motion.div
                key="client-msg"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-end space-x-2 justify-end pl-8"
              >
                <div className="bg-slate-800 text-slate-100 text-xs px-3 py-2.5 rounded-2xl rounded-br-xs shadow-md border border-white/5">
                  <div className="flex justify-between items-center mb-0.5 opacity-60">
                    <span className="text-[8px] font-sans font-medium uppercase tracking-wider">Cliente Interesado</span>
                    <span className="text-[8px] font-sans font-medium">03:15 AM</span>
                  </div>
                  <p className="leading-normal">Hola, acabo de salir de trabajar y vi el piso de Gran Vía. ¿Puedo verlo mañana?</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center shrink-0 border border-white/10">
                  <User size={12} className="text-slate-300" />
                </div>
              </motion.div>
            )}

            {/* Step 2: IA typing dots */}
            {step === 2 && (
              <motion.div
                key="ia-typing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 pr-10"
              >
                <Logo className="w-6 h-6 rounded-md shadow-[0_0_10px_rgba(0,240,255,0.1)] opacity-80" />
                <div className="bg-navy-medium/90 border border-cyan-bright/25 px-4 py-2.5 rounded-2xl rounded-bl-sm flex items-center space-x-1 shadow-inner">
                  <span className="text-[10px] text-cyan-bright/60 font-mono mr-1">Virtual</span>
                  <div className="w-1.5 h-1.5 bg-cyan-bright rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-cyan-bright rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-cyan-bright rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}

            {/* Step 3 & beyond: IA responds */}
            {step >= 3 && (
              <motion.div
                key="ia-msg"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-end space-x-2 pr-8"
              >
                <Logo className="w-6 h-6 rounded-md shadow-[0_0_8px_rgba(0,240,255,0.2)]" />
                <div className="bg-navy-medium border border-cyan-bright/30 text-white text-xs px-3 py-2.5 rounded-2xl rounded-bl-xs shadow-[0_4px_12px_rgba(0,240,255,0.05)]">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[8px] font-sans text-cyan-bright font-bold uppercase tracking-wider">Recepción IACRECE 24/7</span>
                    <span className="text-[8px] font-sans text-cyan-bright/60 font-medium">03:15 AM</span>
                  </div>
                  <p className="leading-normal">¡Hola! Claro que sí, sigue disponible. Te he reservado un hueco mañana a las 18:00h. ¿Te encaja?</p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Booking success indicator */}
            {step >= 4 && (
              <motion.div
                key="booking-confirmed"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-[11px] font-medium py-2 px-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.1)] mx-8 animate-pulse"
              >
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <span className="font-semibold">Visita Cerrada con Éxito</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mimic Chat Input Bar */}
        <div className="px-3 pt-2 pb-1 border-t border-white/5 bg-[#080E14] z-10 flex gap-1.5 items-center">
          <div className="flex-1 bg-slate-900 border border-white/10 rounded-full py-1.5 px-3 flex items-center text-[10px] text-slate-500 justify-between">
            <span>Servicio de respuesta activa 24/7...</span>
            <MessageSquare size={10} className="text-slate-600" />
          </div>
          <button className="w-7 h-7 rounded-full bg-cyan-bright/10 text-cyan-bright border border-cyan-bright/25 flex items-center justify-center shrink-0 hover:bg-cyan-bright/20 transition-all font-mono">
            <Send size={10} />
          </button>
        </div>

        {/* Bottom indicator strip */}
        <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-2 pointer-events-none" />
      </div>
    </div>
  );
}
