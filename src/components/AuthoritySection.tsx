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
      color: "from-red-400 via-rose-500 to-rose-300",
      redGlow: "rgba(239, 68, 68, 0.08)"
    },
    {
      id: 2,
      metric: "x21",
      subtext: "aumenta la tasa de conversión si respondes en menos de 5 minutos en comparación con responder a la media hora.",
      badge: "Velocidad de Cierre",
      icon: Zap,
      color: "from-cyan-400 via-sky-400 to-teal-400",
      redGlow: "rgba(6, 182, 212, 0.08)"
    },
    {
      id: 3,
      metric: "78%",
      subtext: "de los compradores y propietarios firman en exclusiva con el primer profesional inmobiliario que responde.",
      badge: "Preferencia Real",
      icon: Trophy,
      color: "from-amber-400 via-orange-400 to-yellow-300",
      redGlow: "rgba(245, 158, 11, 0.08)"
    }
  ];

  return (
    <section id="autoridad" className="relative py-28 md:py-36 bg-gradient-to-b from-[#030712] via-[#02040a] to-[#010204] overflow-hidden border-y border-white/5">
      {/* Top transition glow from dark section above */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent shadow-[0_0_20px_rgba(0,240,255,0.2)]" />
      
      {/* Cool Interactive/Professional Ambient Gradients */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-950/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-slate-900/40 blur-[120px] pointer-events-none" />

      {/* Advanced Aesthetic Architectural Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full animate-fade-in">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-sans font-semibold mb-5 uppercase tracking-wider">
            <AlertCircle size={12} className="text-red-500 animate-pulse" />
            La Realidad del Sector
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display text-white font-semibold tracking-tight leading-tight">
            Y los datos <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">son devastadores.</span>
          </h2>
          <p className="mt-5 text-slate-300 text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed">
            Un lead de noche que no se contesta se evapora instantáneamente. Descubre las métricas oficiales que rigen la decisión de conversión hoy en día.
          </p>
        </div>

        {/* 3 Premium Light-Architectural Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const isHovered = hoveredCard === idx;
            
            // Dynamic premium attributes based on data topic
            const glowColor = idx === 0 ? 'rgba(239, 68, 68, 0.15)' : idx === 1 ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.15)';
            const hoverBorder = idx === 0 ? 'border-red-500/30' : idx === 1 ? 'border-cyan-500/30' : 'border-amber-500/30';
            const iconBg = idx === 0 
              ? 'bg-red-500/15 border-red-500/30 text-red-400' 
              : idx === 1 
                ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400' 
                : 'bg-amber-500/15 border-amber-500/30 text-amber-400';
            const badgeStyle = idx === 0 
              ? 'bg-red-500/10 border-red-500/25 text-red-400' 
              : idx === 1 
                ? 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' 
                : 'bg-amber-500/10 border-amber-500/25 text-amber-400';
            const accentUnderline = idx === 0 ? 'via-red-500' : idx === 1 ? 'via-cyan-500' : 'via-amber-500';

            return (
              <motion.div
                key={stat.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className={`relative rounded-3xl p-8 transition-all duration-300 overflow-hidden cursor-default border ${
                  isHovered 
                    ? `bg-slate-900/50 ${hoverBorder} shadow-[0_25px_50px_rgba(0,0,0,0.5)] scale-[1.015]` 
                    : 'border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)]'
                }`}
                style={{
                  boxShadow: isHovered ? `0 20px 45px ${glowColor}` : undefined
                }}
              >
                {/* Visual warning dot accent inside card */}
                <div className="absolute top-5 right-5 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full animate-ping pointer-events-none ${idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-cyan-500' : 'bg-amber-500'}`} />
                  <span className={`w-1.5 h-1.5 rounded-full pointer-events-none ${idx === 0 ? 'bg-red-600' : idx === 1 ? 'bg-cyan-600' : 'bg-amber-600'}`} />
                </div>

                {/* Card glow background spot */}
                <div className="absolute -right-12 -top-12 w-28 h-28 rounded-full bg-slate-800/30 blur-3xl pointer-events-none" />

                {/* Top Badge and Icon */}
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-[10px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border transition-all ${
                    isHovered 
                      ? badgeStyle 
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    {stat.badge}
                  </span>
                  
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isHovered ? iconBg : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    <Icon size={16} />
                  </div>
                </div>

                {/* Big Metric Data Value */}
                <div className="mb-4">
                  <span className={`text-5xl md:text-6xl font-display font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br ${stat.color} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]`}>
                    {stat.metric}
                  </span>
                </div>

                {/* Subtext description */}
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  {stat.subtext}
                </p>
                
                {/* warning subtle line on card footer */}
                <div className={`absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent ${accentUnderline} to-transparent transition-[opacity,scale] duration-300 ${isHovered ? 'opacity-100 scale-x-100' : 'opacity-40 scale-x-[0.9]'}`} />
              </motion.div>
            );
          })}
        </div>

        {/* Highlighted Sources Footer (NAR, MIT, Inman 2025) */}
        <div className="mt-16 w-full flex flex-col md:flex-row items-center justify-center">
          <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 flex items-center gap-3.5 max-w-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
            <div className="w-10 h-10 rounded-xl bg-white/5 text-slate-300 flex items-center justify-center shrink-0 border border-white/10 shadow-xs">
              <ExternalLink size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Fuentes oficiales del sector</p>
              <p className="text-xs text-slate-400 leading-normal font-normal">
                Análisis estadísticos extraídos de la <span className="text-white font-semibold">National Association of Realtors (NAR)</span>, estudios conductuales oficiales de <span className="text-white font-semibold">MIT / InsideSales.com</span>, <span className="text-white font-semibold">Inman 2025</span> y reportes de <span className="text-white font-semibold">Real Trends</span>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
