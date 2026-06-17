import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, Hourglass, TrendingUp, DollarSign, HelpCircle, AlertCircle } from 'lucide-react';
import { CalculatorState } from '../types';

export default function CalculatorSection() {
  const [state, setState] = useState<CalculatorState>({
    leads: 120,
    minutesPerLead: 30,
    avgCommission: 3500
  });

  const [showFormulaInfo, setShowFormulaInfo] = useState(false);

  // Perform Calculations inside useMemo for performance and reliability
  const calculations = useMemo(() => {
    const { leads, minutesPerLead, avgCommission } = state;
    
    // 1. Time Saved = (Leads * Minutes per lead) / 60
    // Since IACRECE automates the first qualifying contact, follow-up, and calendar booking
    const hoursSaved = Math.round((leads * minutesPerLead) / 60);

    // 2. Extra successful visits
    // 85% of leads are lost if not answered quickly in the 1st hour.
    // Of those lost, IACRECE recovers 22% as qualified/visitas closed.
    // Visitas exitosas = Leads * 0.85 * 0.22
    const extraVisits = Math.round(leads * 0.85 * 0.22);

    // 3. Potential Estimated Return
    // Let's assume a realistic transaction close rate of 10% of those scheduled 24/7 visits.
    // Closed deals = extraVisits * 0.10
    // Potential return = Closed deals * average commission fee
    const closeRate = 0.15; // 15% rate of pre-qualified automated visits end in a transaction (highly conservative for hot leads!)
    const potentialReturn = Math.round(extraVisits * closeRate * avgCommission);

    return {
      hoursSaved,
      extraVisits,
      potentialReturn
    };
  }, [state]);

  const handleSliderChange = (key: keyof CalculatorState, value: number) => {
    setState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <section id="calculadora" className="relative py-24 md:py-32 border-b border-white/5 scroll-mt-20 overflow-hidden">
      {/* Night visual decor */}
      <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-950/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        
        {/* Title and subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-bright/10 border border-cyan-bright/20 text-cyan-bright text-xs font-mono mb-4 uppercase">
            <Calculator size={12} />
            Métricas de Retorno (ROI)
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            Descubre cuánto dinero <span className="text-cyan-bright relative">estás perdiendo por dormir.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm md:text-base font-normal max-w-xl mx-auto">
            Ajusta los valores de tu negocio y calcula objetivamente las ventas rescatadas por el agente virtual IACRECE.
          </p>
        </div>

        {/* Outer Split Panel */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Sliders and Controls */}
          <div className="w-full lg:w-[58%] flex flex-col justify-between space-y-8 glass-panel p-5 sm:p-6 md:p-8 rounded-2xl border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-lg font-display text-white font-medium border-b border-white/5 pb-4">
              Configura las métricas de tu agencia
            </h3>

            {/* Sliders container */}
            <div className="space-y-8 flex-1 pt-4">
              
              {/* Slider 1: Leads al mes */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label htmlFor="input-leads" className="text-sm md:text-base font-medium text-slate-200 flex items-center gap-2">
                    Leads comerciales al mes
                    <span className="text-slate-500 hover:text-cyan-bright transition-colors cursor-pointer shrink-0" onClick={() => setShowFormulaInfo(!showFormulaInfo)}>
                      <HelpCircle size={14} />
                    </span>
                  </label>
                  <span className="text-base sm:text-lg font-mono text-cyan-bright font-bold bg-cyan-bright/10 px-3 py-1 rounded-md border border-cyan-bright/15 shrink-0 self-start sm:self-auto">
                    {state.leads} <span className="text-xs text-slate-400 font-normal">leads</span>
                  </span>
                </div>
                <input
                  id="input-leads"
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={state.leads}
                  onChange={(e) => handleSliderChange('leads', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-bright focus:outline-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>10 leads</span>
                  <span>250 leads</span>
                  <span>500 leads</span>
                </div>
              </div>

              {/* Slider 2: Minutos por lead */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label htmlFor="input-mins" className="text-sm md:text-base font-medium text-slate-200">
                    Minutos por lead <span className="text-slate-500 text-xs font-normal">(filtrado, agenda, llamadas)</span>
                  </label>
                  <span className="text-base sm:text-lg font-mono text-cyan-bright font-bold bg-cyan-bright/10 px-3 py-1 rounded-md border border-cyan-bright/15 shrink-0 self-start sm:self-auto">
                    {state.minutesPerLead} <span className="text-xs text-slate-400 font-normal">m</span>
                  </span>
                </div>
                <input
                  id="input-mins"
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={state.minutesPerLead}
                  onChange={(e) => handleSliderChange('minutesPerLead', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-bright focus:outline-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>5 min</span>
                  <span>60 min</span>
                  <span>120 min</span>
                </div>
              </div>

              {/* Slider 3: Comisión media */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label htmlFor="input-commission" className="text-sm md:text-base font-medium text-slate-200">
                    Comisión media de venta / alquiler
                  </label>
                  <span className="text-base sm:text-lg font-mono text-cyan-bright font-bold bg-cyan-bright/10 px-3 py-1 rounded-md border border-cyan-bright/15 shrink-0 self-start sm:self-auto">
                    {state.avgCommission.toLocaleString('es-ES')} <span className="text-xs text-slate-400 font-normal">€</span>
                  </span>
                </div>
                <input
                  id="input-commission"
                  type="range"
                  min="500"
                  max="20000"
                  step="100"
                  value={state.avgCommission}
                  onChange={(e) => handleSliderChange('avgCommission', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-bright focus:outline-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>500 €</span>
                  <span>10.000 €</span>
                  <span>20.000 €</span>
                </div>
              </div>

            </div>

            {/* Formula dynamic tooltip */}
            {showFormulaInfo && (
              <div className="mt-6 p-4 rounded-xl bg-orange-400/5 border border-orange-400/20 text-orange-200 text-xs leading-relaxed flex items-start gap-2.5">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Fórmula de cálculo transparente:</h4>
                  <p>Mantenemos un cálculo realista: Estimamos que el 85% de los leads entrantes fuera de horario comercial se pierden si no hay respuesta en la primera hora. IACRECE recupera el 22% de esos contactos mediante atención instantánea precalificada. Asumimos una tasa del 15% como tasa de conversión de visitas agendadas a contratos cerrados con éxito.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Dynamic Results (Fitted nicely below on mobile) */}
          <div className="w-full lg:w-[42%] flex flex-col justify-between glass-panel-glow p-5 sm:p-6 md:p-8 rounded-2xl border-cyan-bright/35 relative overflow-hidden">
            {/* Ambient Background Glow inside Results Panel */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-bright to-transparent" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-cyan-bright uppercase bg-cyan-bright/10 px-2.5 py-1 rounded w-fit self-start">
                💰 Impacto en tu Negocio
              </span>
              <h3 className="text-xl font-display text-white font-medium">
                Retorno estimado por delegar en IACRECE
              </h3>
            </div>

            {/* Live calculated records stack */}
            <div className="space-y-6 my-8">
              
              {/* Record 1: Tiempo recuperado */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                <div className="w-10 h-10 rounded-lg bg-cyan-bright/10 flex items-center justify-center text-cyan-bright border border-cyan-bright/20 shrink-0">
                  <Hourglass size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 font-mono">⏱️ TIEMPO RECUPERADO</p>
                  <p className="text-lg font-semibold text-white mt-0.5">
                    <span className="text-cyan-bright text-xl font-bold font-mono">{calculations.hoursSaved}</span> horas al mes
                  </p>
                </div>
              </div>

              {/* Record 2: Conversión adicional */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                <div className="w-10 h-10 rounded-lg bg-cyan-bright/10 flex items-center justify-center text-cyan-bright border border-cyan-bright/20 shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 font-mono">🎯 CONVERSIÓN ADICIONAL</p>
                  <p className="text-lg font-semibold text-white mt-0.5">
                    <span className="text-cyan-bright text-xl font-bold font-mono">+{calculations.extraVisits}</span> visitas exitosas
                  </p>
                </div>
              </div>

              {/* Record 3: Retorno potencial estimado */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-champagne/5 border border-champagne/20 hover:border-champagne/30 transition-all relative">
                <div className="w-10 h-10 rounded-lg bg-champagne/15 flex items-center justify-center text-champagne border border-champagne/25 shrink-0 shadow-[0_0_12px_rgba(240,230,210,0.15)]">
                  <DollarSign size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-champagne font-semibold font-mono">⚜️ FACTURACIÓN POTENCIAL RESCATADA</p>
                  <p className="text-2xl font-bold text-white mt-0.5 font-display">
                    +{calculations.potentialReturn.toLocaleString('es-ES')} € <span className="text-xs font-normal text-slate-400 font-sans">/ mes</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Rescued disclaimer caption */}
            <div className="pt-4 border-t border-white/5 text-[11px] text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-bright shrink-0" />
              <span>Cálculo estimando recuperar el 22% de leads perdidos.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
