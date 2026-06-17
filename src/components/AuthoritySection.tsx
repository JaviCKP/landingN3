import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Zap, ShieldAlert, Trophy, ExternalLink } from 'lucide-react';

export default function AuthoritySection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    {
      id: 1,
      metric: "85%",
      subtext: "de solicitudes inmobiliarias se enfrían por completo dentro de la primera hora si quedan sin respuesta.",
      badge: "Fuga Crítica",
      icon: ShieldAlert,
      color: "from-white via-slate-100 to-slate-300",
      redGlow: "rgba(239, 68, 68, 0.15)"
    },
    {
      id: 2,
      metric: "x21",
      subtext: "aumenta la tasa de conversión si respondes en menos de 5 minutos en comparación con responder a la media hora.",
      badge: "Velocidad de Cierre",
      icon: Zap,
      color: "from-white via-slate-100 to-slate-200",
      redGlow: "rgba(239, 68, 68, 0.15)"
    },
    {
      id: 3,
      metric: "78%",
      subtext: "de los compradores y propietarios firman en exclusiva con el primer profesional inmobiliario que responde.",
      badge: "Preferencia Real",
      icon: Trophy,
      color: "from-white via-slate-100 to-slate-300",
      redGlow: "rgba(239, 68, 68, 0.15)"
    }
  ];

  return (
    <section id="autoridad" className="relative py-24 md:py-32 bg-[#03060a] bg-[radial-gradient(circle_at_center,_rgba(12,24,39,0.85)_0%,_rgba(4,8,13,1)_70%,_rgba(1,2,5,1)_100%)] border-b border-white/5 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-950/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-red-950/5 blur-[120px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-[11px] font-sans font-medium mb-5 uppercase tracking-wider">
            <AlertCircle size={12} className="text-red-400 animate-pulse" />
            La Realidad del Sector
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-white font-medium tracking-tight leading-tight">
            Y los datos <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-cyan-bright">son devastadores.</span>
          </h2>
          <p className="mt-5 text-slate-300 text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed">
            Un lead de noche que no se contesta se evapora. Descubre las métricas oficiales que rigen la decisión del cliente hoy en día.
          </p>
        </div>

        {/* 3 Premium Glassmorphic Cards Grid */}
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
                  isHovered 
                    ? 'border-red-500/30 bg-slate-900/40 shadow-[0_0_25px_rgba(239,68,68,0.06)] scale-[1.01]' 
                    : 'border-white/10 bg-white/[0.01]'
                }`}
                style={{
                  boxShadow: isHovered ? `0 10px 30px ${stat.redGlow}` : undefined
                }}
              >
                {/* Visual red hazard warning dot accent inside card */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping pointer-events-none" />
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 pointer-events-none" />
                </div>

                {/* Card glow background spot */}
                <div className="absolute -right-12 -top-12 w-28 h-28 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

                {/* Top Badge and Icon */}
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded border transition-all ${
                    isHovered 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    {stat.badge}
                  </span>
                  
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isHovered ? 'bg-cyan-bright/10 border-cyan-bright/35 text-cyan-bright' : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    <Icon size={16} />
                  </div>
                </div>

                {/* Big Metric Data Value (Polished glowing White gradient) */}
                <div className="mb-4">
                  <span className={`text-5xl md:text-6xl font-display font-semibold tracking-tight text-transparent bg-clip-text bg-linear-to-br ${stat.color} filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]`}>
                    {stat.metric}
                  </span>
                </div>

                {/* Subtext description */}
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  {stat.subtext}
                </p>
                
                {/* Red warning subtle line on card footer */}
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/45 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* Highlighted Sources Footer (NAR, MIT, Inman 2025) */}
        <div className="mt-16 w-full flex flex-col md:flex-row items-center justify-center">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-5 flex items-center gap-3.5 max-w-2xl shadow-md">
            <div className="w-9 h-9 rounded-full bg-cyan-bright/15 text-cyan-bright flex items-center justify-center shrink-0 border border-cyan-bright/20">
              <ExternalLink size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-bright/80 mb-0.5">Fuentes oficiales del sector</p>
              <p className="text-xs text-slate-400 leading-normal">
                Análisis estadísticos extraídos de la <span className="text-slate-200">National Association of Realtors (NAR)</span>, estudios conductuales oficiales de <span className="text-slate-200">MIT / InsideSales.com</span>, <span className="text-slate-200">Inman 2025</span> y reportes de <span className="text-slate-200">Real Trends</span>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
