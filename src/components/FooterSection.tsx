import React from 'react';
import { ArrowUp } from 'lucide-react';
import Logo from './Logo';

interface FooterSectionProps {
  onOpenDemo: () => void;
}

export default function FooterSection({ onOpenDemo }: FooterSectionProps) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="cierre" className="relative py-24 md:py-32 bg-navy-dark text-center overflow-hidden border-t border-white/5">
      {/* Dynamic Background subtle light flare */}
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-950/15 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Humble sparkles logo */}
        <Logo className="w-12 h-12 rounded-2xl mb-8 shadow-[0_0_25px_rgba(0,216,237,0.4)]" />

        {/* Cierre H2 Title */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight max-w-3xl">
          Descubre lo que podrías conseguir al tener un agente estrella que no duerme.
        </h2>

        {/* Large XL sized CTA button */}
        <div className="mt-12 w-full max-w-sm">
          <button
            id="cta-footer-xl"
            onClick={onOpenDemo}
            className="glow-btn-pulse w-full inline-flex items-center justify-center gap-2.5 px-8 py-5 rounded-2xl bg-cyan-bright text-neutral-950 font-semibold text-lg md:text-xl shadow-[0_0_40px_rgba(0,240,255,0.35)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:bg-white active:scale-[0.98] transition-all cursor-pointer"
          >
            👉 Ver cómo funciona (Demo interactiva)
          </button>
        </div>

        {/* Minimal helper labels */}
        <p className="mt-6 text-xs font-mono text-slate-500 tracking-wider">
          SIN COMPROMISO
        </p>

        {/* Interactive scroll to top or credit block */}
        <div className="mt-20 pt-8 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div>
            <span>© 2026 IACRECE Inmobiliaria. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-cyan-bright transition-colors uppercase">Inicio</a>
            <a href="#autoridad" className="hover:text-cyan-bright transition-colors uppercase">Datos</a>
            <a href="#calculadora" className="hover:text-cyan-bright transition-colors uppercase">Calculadora</a>
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-1 hover:text-cyan-bright transition-colors uppercase"
            >
              Arriba
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
