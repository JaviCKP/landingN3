import React from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface FooterSectionProps {
  onOpenDemo: () => void;
  onOpenContact: () => void;
}

export default function FooterSection({ onOpenDemo, onOpenContact }: FooterSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="cierre" className="relative py-28 md:py-36 bg-transparent text-center overflow-hidden border-t border-white/5">
      {/* Top transition glow from dark section above */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent shadow-[0_0_20px_rgba(0,240,255,0.2)]" />

      {/* Dynamic Background ambient light flare */}
      <div className="absolute left-[20%] top-[20%] w-[500px] h-[500px] rounded-full bg-cyan-950/20 blur-[130px] pointer-events-none" />
      <div className="absolute right-[10%] bottom-[10%] w-[450px] h-[450px] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none" />
      <div className="absolute left-[50%] top-[60%] w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[150px] pointer-events-none -translate-x-1/2" />

      {/* Advanced High-End Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_80%,transparent_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Brand Logo icon container with glowing halo */}
        <div className="relative mb-8">
          <div className="absolute -inset-1.5 rounded-2xl bg-[#00D8ED] opacity-35 blur-lg animate-pulse" />
          <Logo className="relative w-14 h-14 rounded-2xl shadow-[0_0_25px_rgba(0,216,237,0.3)] border-2 border-[#00D8ED]/90" />
        </div>

        {/* Cierre H2 Title */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-semibold text-white tracking-tight leading-tight max-w-3xl">
          Solo trabajamos con inmobiliarias con volumen y dispuestas a escalar su negocio, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 block sm:inline">¿Estás tú entre ellas?</span>
        </h2>

        {/* High-Impact Subtitle */}
        <p className="mt-6 text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          La velocidad de respuesta inmediata ya no es un extra; es el estándar de oro que separa a las agencias líderes del resto de inmobiliarias estancadas.
        </p>

        {/* Large XL sized CTA button */}
        <div className="mt-14 w-full max-w-sm">
          <button
            id="cta-footer-xl"
            onClick={onOpenContact}
            className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-5 rounded-2xl bg-cyan-600 text-white hover:bg-cyan-500 font-semibold text-lg md:text-xl shadow-[0_12px_30px_rgba(6,182,212,0.2)] hover:shadow-[0_12px_45px_rgba(6,182,212,0.4)] active:scale-[0.98] transition-all duration-300 cursor-pointer border border-cyan-500/50"
          >
            Compruébalo aquí
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Interactive scroll to top or credit block */}
        <div className="mt-24 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans font-semibold text-slate-400">
          <div>
            <span>© 2026 IACRECE Inmobiliaria. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-5 text-slate-400">
            <a href="#hero" className="hover:text-white hover:translate-y-[-1px] transition-all uppercase text-[11px] tracking-wider font-bold">Inicio</a>
            <a href="#autoridad" className="hover:text-white hover:translate-y-[-1px] transition-all uppercase text-[11px] tracking-wider font-bold">Datos</a>
            <a href="#calculadora" className="hover:text-white hover:translate-y-[-1px] transition-all uppercase text-[11px] tracking-wider font-bold">Calculadora</a>
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-1 hover:text-white hover:translate-y-[-1px] transition-all uppercase text-[11px] tracking-wider font-bold cursor-pointer"
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
