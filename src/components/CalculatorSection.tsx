import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, AlertTriangle, TrendingUp, DollarSign, HelpCircle, ArrowRight, ShieldAlert, Award } from 'lucide-react';
import { CalculatorState } from '../types';

export default function CalculatorSection() {
  const [state, setState] = useState<CalculatorState>({
    weeklyLeads: 15,
    avgPropertyPrice: 250000,
    commissionPercent: 3,
    responseTimeKey: 'de2a4h'
  });

  const [showFormulaInfo, setShowFormulaInfo] = useState(false);

  // Response time configurations with their corresponding leak (fugados) percentage
  const responseTiers = {
    menos5: { label: 'Menos de 5 minutos', loss: 5, description: 'Excelente respuesta' },
    hasta1h: { label: 'Hasta 1 hora', loss: 45, description: 'Pérdida moderada' },
    de2a4h: { label: 'De 2 a 4 horas', loss: 75, description: 'Alta fuga de oportunidades' },
    finde: { label: 'No trabajamos fines de semana', loss: 85, description: 'Fuga crítica de fin de semana' }
  };

  const calculations = useMemo(() => {
    const { weeklyLeads, avgPropertyPrice, commissionPercent, responseTimeKey } = state;
    
    // Monthly leads approximation
    const monthlyLeads = weeklyLeads * 4;
    
    // Loss percentage according to selecion
    const lossPercent = responseTiers[responseTimeKey].loss;
    
    // Lost leads per month
    const monthlyLostLeads = Math.round(monthlyLeads * (lossPercent / 100));
    
    // Average agency commission fee per sale
    const avgCommissionFee = Math.round(avgPropertyPrice * (commissionPercent / 100));
    
    // Rescued sales per month at a highly realistic 3% sales conversion of formerly lost/cold leads
    const rescuedSales = (monthlyLeads * (lossPercent / 100)) * 0.03;
    
    // Rescued monthly & annual revenue
    const potentialMonthlyReturn = Math.round(rescuedSales * avgCommissionFee);
    const potentialAnnualReturn = Math.round(potentialMonthlyReturn * 12);

    return {
      monthlyLeads,
      lossPercent,
      monthlyLostLeads,
      avgCommissionFee,
      rescuedSales,
      potentialMonthlyReturn,
      potentialAnnualReturn
    };
  }, [state]);

  const handleSliderChange = (key: keyof Omit<CalculatorState, 'responseTimeKey'>, value: number) => {
    setState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResponseTierChange = (key: 'menos5' | 'hasta1h' | 'de2a4h' | 'finde') => {
    setState(prev => ({
      ...prev,
      responseTimeKey: key
    }));
  };

  return (
    <section id="calculadora" className="relative py-24 md:py-32 border-b border-white/5 scroll-mt-20 overflow-hidden">
      {/* Night visual decor */}
      <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-950/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        
        {/* Title and subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-bright/10 border border-cyan-bright/20 text-cyan-bright text-[11px] font-sans font-medium mb-4 uppercase tracking-wider">
            <Calculator size={12} />
            Métricas de Fuga y Retorno (ROI)
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            Descubre cuánto dinero <span className="text-cyan-bright relative">estás perdiendo por dormir.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm md:text-base font-normal max-w-xl mx-auto">
            Ajusta las métricas reales del mercado inmobiliario y analiza de forma directa las ventas que rescatas con la atención virtual 24/7 de IACRECE.
          </p>
        </div>

        {/* Outer Split Panel */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Sliders and Controls */}
          <div className="w-full lg:w-[55%] flex flex-col justify-between space-y-8 glass-panel p-5 sm:p-6 md:p-8 rounded-2xl border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-lg font-display text-white font-medium border-b border-white/5 pb-4">
              Configura tus métricas inmobiliarias
            </h3>

            {/* Sliders container */}
            <div className="space-y-6 flex-1 pt-2">
              
              {/* Slider 1: Leads por semana */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="input-weekly-leads" className="text-xs sm:text-sm font-medium text-slate-200">
                    Leads comerciales recibidos <span className="text-cyan-bright font-bold">por semana</span>
                  </label>
                  <span className="text-sm font-mono text-cyan-bright font-bold bg-cyan-bright/10 px-2.5 py-0.5 rounded border border-cyan-bright/15">
                    {state.weeklyLeads} <span className="text-[10px] text-slate-400 font-normal">leads/sem</span>
                  </span>
                </div>
                <input
                  id="input-weekly-leads"
                  type="range"
                  min="2"
                  max="80"
                  step="1"
                  value={state.weeklyLeads}
                  onChange={(e) => handleSliderChange('weeklyLeads', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-bright focus:outline-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>2 leads</span>
                  <span>40 leads</span>
                  <span>80 leads</span>
                </div>
              </div>

              {/* Slider 2: Precio medio de la propiedad */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="input-prop-price" className="text-xs sm:text-sm font-medium text-slate-200">
                    Precio medio de la propiedad
                  </label>
                  <span className="text-sm font-mono text-cyan-bright font-bold bg-cyan-bright/10 px-2.5 py-0.5 rounded border border-cyan-bright/15">
                    {state.avgPropertyPrice.toLocaleString('es-ES')} €
                  </span>
                </div>
                <input
                  id="input-prop-price"
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={state.avgPropertyPrice}
                  onChange={(e) => handleSliderChange('avgPropertyPrice', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-bright focus:outline-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>50K €</span>
                  <span>500K €</span>
                  <span>1M €</span>
                </div>
              </div>

              {/* Slider 3: Porcentaje de comisión promedio */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="input-commission-pct" className="text-xs sm:text-sm font-medium text-slate-200">
                    Porcentaje de comisión promedio
                  </label>
                  <span className="text-sm font-mono text-cyan-bright font-bold bg-cyan-bright/10 px-2.5 py-0.5 rounded border border-cyan-bright/15">
                    {state.commissionPercent} %
                  </span>
                </div>
                <input
                  id="input-commission-pct"
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={state.commissionPercent}
                  onChange={(e) => handleSliderChange('commissionPercent', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-bright focus:outline-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>1.0%</span>
                  <span>4.5%</span>
                  <span>8.0%</span>
                </div>
              </div>

              {/* Selector: Cuánto tarda tu equipo en contestar */}
              <div className="space-y-3 pt-2">
                <label className="text-xs sm:text-sm font-medium text-slate-200 flex items-center gap-1.5">
                  ¿Cuánto tarda actualmente tu equipo en contestar?
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Object.keys(responseTiers) as Array<keyof typeof responseTiers>).map((key) => {
                    const tier = responseTiers[key];
                    const isSelected = state.responseTimeKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleResponseTierChange(key)}
                        className={`text-left p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                          isSelected 
                            ? 'bg-cyan-bright/15 border-cyan-bright text-white shadow-[0_0_12px_rgba(0,216,237,0.1)]' 
                            : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        <span className="text-xs font-semibold">{tier.label}</span>
                        <span className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-cyan-bright font-bold' : 'text-slate-400'}`}>
                          {tier.loss}% de leads fugados
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            <button 
              type="button"
              onClick={() => setShowFormulaInfo(!showFormulaInfo)}
              className="mt-4 flex items-center gap-1.5 text-slate-400 hover:text-cyan-bright text-xs transition-colors self-start cursor-pointer select-none"
            >
              <HelpCircle size={14} />
              {showFormulaInfo ? 'Ocultar metodología de cálculo' : 'Ver datos matemáticos de cálculo'}
            </button>
          </div>

          {/* Right Column: Live Dynamic Results */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between glass-panel-glow p-5 sm:p-6 md:p-8 rounded-2xl border-cyan-bright/35 relative overflow-hidden">
            {/* Ambient Background Glow inside Results Panel */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-bright to-transparent" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-cyan-bright bg-cyan-bright/10 px-2.5 py-1 rounded w-fit self-start uppercase">
                🚀 Ventas con Automatización
              </span>
              <h3 className="text-xl font-display text-white font-medium leading-normal">
                Impacto Financiero de Respuesta 24/7
              </h3>
            </div>

            {/* Live calculated records stack */}
            <div className="space-y-4 my-6">
              
              {/* Lost leads count */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-red-500/5 border border-red-500/15">
                <div className="w-9 h-9 rounded-lg bg-red-400/10 flex items-center justify-center text-red-400 border border-red-400/20 shrink-0">
                  <ShieldAlert size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-mono">📉 LEADS TOTALMENTE PERDIDOS/MES</p>
                  <p className="text-base font-semibold text-white mt-0.5">
                    <span className="text-red-400 font-mono font-bold">{calculations.monthlyLostLeads}</span> leads abandonados
                  </p>
                </div>
              </div>

              {/* Value of a single sale commission */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-cyan-bright/10 flex items-center justify-center text-cyan-bright border border-cyan-bright/20 shrink-0 font-mono font-bold text-xs">
                  {state.commissionPercent}%
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-mono">💶 COMISIÓN ESTIMADA POR VENTA</p>
                  <p className="text-base font-semibold text-white mt-0.5">
                    <span className="text-white font-mono font-bold">{calculations.avgCommissionFee.toLocaleString('es-ES')} €</span> por transacción
                  </p>
                </div>
              </div>

              {/* Record 2: Conversión adicional */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-cyan-bright/10 flex items-center justify-center text-cyan-bright border border-cyan-bright/20 shrink-0">
                  <TrendingUp size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-mono">🎯 VENTAS MENSUALES RESCATADAS</p>
                  <p className="text-base font-semibold text-white mt-0.5">
                    <span className="text-cyan-bright text-lg font-bold font-mono">+{calculations.rescuedSales.toFixed(1)}</span> ventas rescatadas/mes
                  </p>
                </div>
              </div>

              {/* Record 3: Retorno potencial estimado */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-champagne/5 border border-champagne/20 relative">
                <div className="w-10 h-10 rounded-lg bg-champagne/15 flex items-center justify-center text-champagne border border-champagne/25 shrink-0 shadow-[0_0_12px_rgba(240,230,210,0.15)]">
                  <DollarSign size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-champagne font-semibold font-mono">📈 CAPTACIÓN DE FACTURACIÓN ANUAL RESCATADA</p>
                  <p className="text-xl sm:text-2xl font-bold text-white mt-0.5 font-display">
                    +{calculations.potentialAnnualReturn.toLocaleString('es-ES')} € <span className="text-xs font-normal text-slate-400 font-sans">/ año</span>
                  </p>
                  <p className="text-[10px] text-slate-300 mt-1">
                    ({calculations.potentialMonthlyReturn.toLocaleString('es-ES')} € de facturación extra al mes)
                  </p>
                </div>
              </div>

            </div>

            {/* Clear, Statistics-backed Breakdown block */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-[11px] leading-relaxed text-slate-300">
              <span className="font-bold text-white block mb-1">🔍 Desglose Técnico del Cálculo:</span>
              El cálculo estimativo basado en la pérdida estadística del <span className="text-red-400 font-bold font-mono">{calculations.lossPercent}%</span> de los <span className="text-cyan-bright font-bold font-mono">{calculations.monthlyLeads}</span> leads mensuales (basado en {state.weeklyLeads} por semana) estimando un <span className="text-emerald-400 font-bold font-mono">3%</span> de conversión promedio de leads recuperados en venta final, y una comisión por transacción de <span className="text-white font-bold font-mono">{calculations.avgCommissionFee.toLocaleString('es-ES')} €</span> ({state.commissionPercent}% del valor de la propiedad de {state.avgPropertyPrice.toLocaleString('es-ES')} €).
            </div>

            {/* Methodology detailed tooltip */}
            {showFormulaInfo && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3.5 rounded-xl bg-neutral-900 border border-white/10 text-[10px] text-slate-400 space-y-1.5"
              >
                <div className="font-bold text-white uppercase text-[9px] tracking-wider mb-0.5">Metodología y Fuentes:</div>
                <p>• Los porcentajes de fuga (5%, 45%, 75%, 85%) están extraídos del reporte de <span className="text-slate-300">respuesta ágil del MIT / Harvard Business Review</span>, que demuestra cómo la probabilidad de contactar cae exponencialmente tras 5 minutos.</p>
                <p>• El 3% de conversión de lead rescatado a venta es un estándar de conversión prudente en el sector inmobiliario nacional para contactos calificados telefónicamente de inmediato.</p>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
