import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Zap, ShieldAlert, Trophy } from 'lucide-react';

export default function AuthoritySection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    {
      id: 1,
      metric: "85%",
      subtext: "de leads se pierden en la primera hora sin respuesta.",
      badge: "Abandono Crítico",
      icon: ShieldAlert,
      color: "from-champagne via-orange-400 to-cyan-bright"
    },
    {
      id: 2,
      metric: "21x",
      subtext: "más conversión respondiendo en menos de 5 min vs. 30 min.",
      badge: "Velocidad de Cierre",
      icon: Zap,
      color: "from-cyan-400 via-cyan-200 to-champagne"
    },
    {
      id: 3,
      metric: "78%",
      subtext: "elige al primero que responde, no al mejor.",
      badge: "Preferencia de Compra",
      icon: Trophy,
      color: "from-cyan-bright via-teal-300 to-champagne"
    }
  ];

  return (
    <section id="autoridad" className="relative py-24 md:py-32 bg-navy-medium/30 border-b border-white/5">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-900/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-400/10 border border-red-500/20 text-red-400 text-xs font-mono mb-4 uppercase">
            <AlertCircle size={12} />
            La Realidad del Sector
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            Y los datos <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-red-400 to-cyan-bright">son devastadores.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base font-normal max-w-xl mx-auto">
            Ignorar una solicitud en horario nocturno no es neutral: destruye tu presupuesto de captación. Conoce los números que rigen el sector.
          </p>
        </div>

        {/* 3 Native Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const isHovered = hoveredCard === idx;

            return (
              <motion.div
                key={stat.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative rounded-2xl p-8 glass-panel transition-all duration-300 overflow-hidden cursor-default ${
                  isHovered ? 'border-cyan-bright/50 shadow-[0_0_25px_rgba(0,240,255,0.15)] bg-slate-900/60' : 'border-white/10'
                }`}
              >
                {/* Simulated Laser Border Glow on Hover */}
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-bright/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
                )}

                {/* Card glow background spot */}
                <div className={`absolute -right-12 -top-12 w-28 h-28 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-40'}`} />

                {/* Badge inside card */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                    {stat.badge}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    isHovered ? 'bg-champagne/10 border-champagne/30 text-champagne' : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    <Icon size={16} />
                  </div>
                </div>

                {/* Big Metric Data Value (Naranja/Cian Gradient) */}
                <div className="mb-4">
                  <span className={`text-6xl md:text-7xl font-display font-semibold tracking-tight text-transparent bg-clip-text bg-linear-to-br ${stat.color}`}>
                    {stat.metric}
                  </span>
                </div>

                {/* Subtext description */}
                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-normal">
                  {stat.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Section Footnote Caption */}
        <div className="mt-12 text-center">
          <p className="text-[11px] font-mono tracking-wider text-slate-500 dark:text-slate-600 select-none">
            Fuentes oficiales: NAR (National Association of Realtors), MIT / InsideSales.com, Inman 2025, Real Trends.
          </p>
        </div>

      </div>
    </section>
  );
}
