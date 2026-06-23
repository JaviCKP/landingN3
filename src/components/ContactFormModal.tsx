import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MessageSquare, CheckCircle2, ArrowRight, Loader2, Landmark, Mail, Phone, User, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// =========================================================================
// CONFIGURACIÓN RÁPIDA DE GOOGLE CALENDAR EMBUIDADO
// =========================================================================
// Sustituye esta URL por tu enlace de "Google Calendar Appointment Schedule"
// (Calendario de citas de Google) ej: https://calendar.google.com/calendar/appointments/schedules/...
const GOOGLE_CALENDAR_EMBED_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ087X_hWzD-qfX0Doz9m_Kk6lXbF3GfU17K2K8=?gv=true";

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formStep, setFormStep] = useState<'details' | 'calendar' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [wantsMeeting, setWantsMeeting] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    agencyName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrorMsg(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de obligatorios generales
    if (!formData.fullName.trim()) {
      setErrorMsg('Por favor, introduce tu nombre completo.');
      return;
    }
    if (!formData.agencyName.trim()) {
      setErrorMsg('Por favor, introduce el nombre de tu inmobiliaria.');
      return;
    }

    // Regla: Correo OR Teléfono (Al menos uno obligatorio)
    const hasEmail = formData.email.trim().length > 0;
    const hasPhone = formData.phone.trim().length > 0;
    
    if (!hasEmail && !hasPhone) {
      setErrorMsg('Por favor, indica al menos un método de contacto (Correo o Teléfono).');
      return;
    }

    // Limpiar errores e ir al siguiente paso
    setErrorMsg(null);
    if (wantsMeeting) {
      setFormStep('calendar');
    } else {
      submitLeadData();
    }
  };

  const submitLeadData = async () => {
    setLoading(true);
    setErrorMsg(null);

    // Dynamic mock request delay demonstrating real-world integration
    setTimeout(() => {
      setLoading(false);
      setFormStep('success');

      /*
        ======================================================================
        INSTRUCCIONES PARA INTEGRACIÓN CON APIS REALES Y CRM / EMAIL
        ======================================================================
        
        Puedes conectar este formulario con un backend (p.ej., Node/Express) con las siguientes librerías:
        - nodemailer o un servicio como Resend/Sendgrid para enviarte el email con los datos de contacto.
        - @googleapi/calendar o googleapis en tu backend para insertar el evento.

        EJEMPLO DE LLAMADA API REAL:
        
        const payload = {
          nombre: formData.fullName,
          inmobiliaria: formData.agencyName,
          email: formData.email,
          telefono: formData.phone,
          mensaje: formData.message,
          reunionAgendada: wantsMeeting
        };

        fetch('/api/leads/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => console.log("Registrado con éxito:", data))
        .catch(err => console.error("Error al registrar:", err));
      */
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className={`relative w-full ${formStep === 'calendar' ? 'max-w-3xl' : 'max-w-xl'} bg-[#090f1d] border border-cyan-bright/20 rounded-3xl shadow-[0_20px_60px_rgba(0,216,237,0.15)] overflow-hidden z-10 font-sans transition-all duration-300`}
          >
            {/* Top Glowing Trim */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-bright to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer z-30"
            >
              <X size={16} />
            </button>

            {/* Inner Content Area */}
            <div className="p-6 sm:p-8 md:p-10">

              {/* STEP 1: CONTACT DETAILS FORM */}
              {formStep === 'details' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mt-2 leading-tight">
                      Da el salto y recupera hasta el 95% de tus leads perdidos
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      Introduce tus datos de agencia para conocer tu viabilidad técnica e iniciar tu automatización conversacional 24/7.
                    </p>
                  </div>

                  {errorMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2.5 text-xs text-red-200"
                    >
                      <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                      <div>{errorMsg}</div>
                    </motion.div>
                  )}

                  <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1">
                          <User size={12} className="text-cyan-bright" /> Nombre Completo <span className="text-cyan-bright">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="p.ej., Javier Gómez"
                          className="w-full px-4 py-3 bg-white/[0.03] text-sm text-white border border-white/10 rounded-xl focus:outline-none focus:border-cyan-bright focus:bg-white/[0.05] transition-all"
                        />
                      </div>

                      {/* Agency Name */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1">
                          <Landmark size={12} className="text-cyan-bright" /> Nombre Inmobiliaria <span className="text-cyan-bright">*</span>
                        </label>
                        <input
                          type="text"
                          name="agencyName"
                          value={formData.agencyName}
                          onChange={handleInputChange}
                          placeholder="p.ej., InmoElite Real Estate"
                          className="w-full px-4 py-3 bg-white/[0.03] text-sm text-white border border-white/10 rounded-xl focus:outline-none focus:border-cyan-bright focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Canales De Contacto</span>
                        <span className="text-[9px] font-sans font-extrabold text-[#00D8ED] bg-[#00D8ED]/10 px-2.5 py-0.5 rounded-full border border-[#00D8ED]/20 uppercase">Necesitamos al menos uno para contactarte</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1">
                            <Mail size={12} className="text-slate-400" /> Correo Corporativo
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="correo@ejemplo.com"
                            className="w-full px-4 py-3 bg-white/[0.03] text-sm text-white border border-white/10 rounded-xl focus:outline-none focus:border-cyan-bright focus:bg-white/[0.05] transition-all"
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1">
                            <Phone size={12} className="text-slate-400" /> Teléfono Móvil
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+34 600 000 000"
                            className="w-full px-4 py-3 bg-white/[0.03] text-sm text-white border border-white/10 rounded-xl focus:outline-none focus:border-cyan-bright focus:bg-white/[0.05] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1">
                        <MessageSquare size={12} className="text-[#00D8ED]" /> ¿Qué os gustaría resolver o automatizar?
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Inquietudes, CRM que utilizáis, volumen mensual de leads, etc."
                        className="w-full px-4 py-3 bg-white/[0.03] text-sm text-white border border-white/10 rounded-xl focus:outline-none focus:border-cyan-bright focus:bg-white/[0.05] resize-none transition-all"
                      />
                    </div>

                    {/* Highly Interactive Meeting Toggle Button */}
                    <div 
                      onClick={() => setWantsMeeting(!wantsMeeting)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 ${
                        wantsMeeting 
                          ? 'bg-cyan-bright/5 border-cyan-bright/30 shadow-[0_0_15px_rgba(0,216,237,0.05)]' 
                          : 'bg-white/[0.02] border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors ${wantsMeeting ? 'bg-cyan-bright/20 text-cyan-bright' : 'bg-white/5 text-slate-400'}`}>
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">Quiero agendar una reunión directa</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Reserva en nuestro Google Calendar sincronizado en tiempo real</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        wantsMeeting ? 'border-cyan-bright bg-cyan-bright' : 'border-slate-500'
                      }`}>
                        {wantsMeeting && <CheckCircle2 size={12} className="text-black stroke-[3px]" />}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#00D8ED] hover:bg-cyan-400 text-black font-semibold text-sm transition-all shadow-[0_12px_30px_rgba(0,216,237,0.15)] cursor-pointer"
                      >
                        {wantsMeeting ? 'Continuar para seleccionar hora' : 'Enviar mi solicitud'}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 2: GOOGLE CALENDAR EMBEDDED SYSTEM */}
              {formStep === 'calendar' && (
                <div>
                  <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-white mt-1.5 leading-tight">
                        Reserva tu Hueco Gratis
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs font-semibold text-slate-200">{formData.fullName}</p>
                      <p className="text-[10px] text-slate-400">{formData.agencyName}</p>
                    </div>
                  </div>

                  {/* EMBEDDED GOOGLE CALENDAR APPOINTMENT IFRAME CONTAINER */}
                  <div className="relative border border-white/10 rounded-2xl bg-slate-950 overflow-hidden shadow-2xl h-[420px] mb-5">
                    {/* Live interactive appointment tool */}
                    <iframe 
                      src={GOOGLE_CALENDAR_EMBED_URL}
                      width="100%" 
                      height="100%" 
                      className="border-0 bg-transparent"
                      title="Google Calendar Appointment Schedule"
                    />
                    
                    {/* Bottom overlay advice explaining what is this */}
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-md px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                        Conectado con tu cuenta Google Workspace
                      </span>
                      <span className="font-mono text-cyan-bright">Modo: Live Booking</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] leading-relaxed text-slate-300 mb-5">
                    <span className="font-bold text-white block mb-0.5">💡 Instrucción Tecnológica para el Administrador:</span>
                    Este módulo está preparado para cargar tu calendario en tiempo real mediante un <code className="text-[#00D8ED] font-mono bg-white/5 px-1 py-0.5 rounded">Calendario de citas de Google (Appointment Schedule)</code>. Puedes cambiar la constante <code className="text-emerald-400 font-mono">GOOGLE_CALENDAR_EMBED_URL</code> en el componente con tu enlace de reserva real para sincronizarlo al instante.
                  </div>

                  {/* Navigation actions */}
                  <div className="flex gap-3 justify-end pt-3 border-t border-white/5">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setFormStep('details')}
                      className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold rounded-xl text-white transition-all cursor-pointer"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={submitLeadData}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#00D8ED] text-black font-semibold text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-[0_10px_25px_rgba(0,216,237,0.15)] disabled:opacity-50 cursor-pointer animate-pulse"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Confirmando y registrando datos del lead...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} />
                          Ya he reservado mi hueco / Enviar confirmación
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: HIGH-FIDELITY SUCCESS OVERLAY */}
              {formStep === 'success' && (
                <div className="text-center py-6 sm:py-8 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-white leading-snug">
                    {wantsMeeting ? '¡Información Registrada con Éxito!' : '¡Datos recibidos con éxito!'}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-sm mx-auto leading-relaxed">
                    Hemos recibido correctamente tus datos de viabilidad técnica corporativa.
                  </p>
                  
                  <p className="text-xs sm:text-sm text-[#00D8ED] mt-2 max-w-sm mx-auto leading-relaxed font-semibold">
                    {wantsMeeting 
                      ? 'Revisa tu bandeja de entrada corporativa para confirmar el enlace de Google Calendar y las instrucciones del análisis de viabilidad técnica.'
                      : 'Uno de nuestros especialistas de automatización analizará el volumen conversacional de tu inmobiliaria y os escribirá/llamará en menos de 5 minutos.'
                    }
                  </p>

                  <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-white/5 text-[11px] text-slate-400 text-left w-full max-w-sm">
                    <span className="font-bold text-white block mb-1">📋 Resumen Registrado de Lead:</span>
                    <div>• <strong className="text-white">Nombre:</strong> {formData.fullName}</div>
                    <div>• <strong className="text-white">Agencia:</strong> {formData.agencyName}</div>
                    {formData.email && <div>• <strong className="text-white">Email:</strong> {formData.email}</div>}
                    {formData.phone && <div>• <strong className="text-white">Móvil:</strong> {formData.phone}</div>}
                    <div>• <strong className="text-white">Especialista asignado:</strong> David (IACRECE Partner)</div>
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-8 px-8 py-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-950 border border-cyan-bright/35 text-cyan-bright font-semibold text-sm transition-all cursor-pointer shadow-[0_5px_15px_rgba(0,216,237,0.1)]"
                  >
                    Entendido, finalizar
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

