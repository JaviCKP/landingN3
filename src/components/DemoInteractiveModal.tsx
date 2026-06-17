import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, User, Bot, RefreshCw } from 'lucide-react';
import { Message } from '../types';
import Logo from './Logo';

interface DemoInteractiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoInteractiveModal({ isOpen, onClose }: DemoInteractiveModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Scenarios/presettings to visually simulate
  const scenarios = [
    {
      id: 'granvia',
      title: 'Visita Gran Vía (03:15 AM)',
      emoji: '🏢',
      time: '03:15 AM',
      initialMessage: 'Hola, estoy interesado en el piso de Gran Vía de 420.000€. ¿Se podría visitar mañana por la tarde?',
      responses: [
        {
          trigger: 0,
          text: '¡Hola! Qué gusto saludarte. Soy el asistente virtual de IACRECE inmobiliaria 24/7. Sí, por supuesto. El piso está disponible para visitas. Mañana el asesor David tiene hueco libre a las 11:00h y a las 18:00h. ¿Cuál te viene mejor?',
          time: '03:15 AM'
        },
        {
          trigger: 1,
          text: '¡Perfecto! Te he reservado provisionalmente el hueco de las 18:00h para mañana. Para formalizar la cita y enviarte el pase, ¿podrías facilitarme tu número de teléfono y tu email principal?',
          time: '03:16 AM'
        },
        {
          trigger: 2,
          text: '¡Guardado con éxito! ✅ Acabo de registrar tu visita y te he enviado la dirección exacta y el contacto del asesor David a tu email. ¡Nos vemos mañana!',
          time: '03:16 AM',
          book: true
        }
      ]
    },
    {
      id: 'alquiler',
      title: 'Alquiler Ático (11:45 PM)',
      emoji: '🔑',
      time: '11:45 PM',
      initialMessage: 'Hola, veo el ático de alquiler en la web. Tengo solvencia demostrable y contrato indefinido. ¿Aceptan mascotas?',
      responses: [
        {
          trigger: 0,
          text: '¡Buenas noches! Encantado de atenderte. En este ático en concreto la propiedad sí acepta mascotas previa fianza adicional. Para avanzar ágilmente antes de que se reserve, ¿tienes disponibilidad para visitarlo mañana a las 10:00 AM?',
          time: '11:45 PM'
        },
        {
          trigger: 1,
          text: 'Estupendo. Para añadirte a la lista de visitas prioritarias y validar la cita en nuestra agenda de alquileres, confírmame por favor tu número de teléfono móvil.',
          time: '11:46 PM'
        },
        {
          trigger: 2,
          text: '¡Hecho! Agendado para mañana a las 10:00 AM. Acabas de recibir un SMS automatizado de confirmación con el enlace de localización del ático. ¡Gracias por tu rapidez!',
          time: '11:46 PM',
          book: true
        }
      ]
    },
    {
      id: 'presupuesto',
      title: 'Estudio de Hipoteca (01:10 AM)',
      emoji: '📊',
      time: '01:10 AM',
      initialMessage: 'Hola. ¿Para un piso de 300.000€ hacéis estudio de viabilidad hipotecaria gratuito si os dejo los datos?',
      responses: [
        {
          trigger: 0,
          text: '¡Hola! Por supuesto, nuestro departamento financiero realiza estudios de viabilidad gratuitos y sin compromiso para conseguirte hasta el 90% de financiación. Para orientarte mejor en menos de un minuto, ¿qué ahorros aproximados tienes aportados para la entrada?',
          time: '01:10 AM'
        },
        {
          trigger: 1,
          text: 'Excelente, es una base fantástica. Mañana de 10:00 a 13:00 nuestros brókers de IACRECE estarán realizando llamadas de precalificación. ¿Te va bien que te contactemos para darte el veredicto en ese horario? Indícame tu número de móvil, por favor.',
          time: '01:11 AM'
        },
        {
          trigger: 2,
          text: '¡Recibido! Acabo de transferir tu expediente de inmediato a nuestro gestor de cuentas. Se pondrán en contacto contigo mañana a primera hora. ¡Buenas noches!',
          time: '01:11 AM',
          book: true
        }
      ]
    },
    {
      id: 'dudas',
      title: 'Dudas Técnicas (02:40 AM)',
      emoji: '⚖️',
      time: '02:40 AM',
      initialMessage: 'Buenas noches, disculpad las horas con preguntas así. ¿Cuánto tardáis en vender una propiedad de media con vosotros?',
      responses: [
        {
          trigger: 0,
          text: '¡Buenas noches! No te preocupes por la hora, para eso estoy disponible 24/7. ⏱️ De media, vendemos propiedades en menos de 45 días gracias a nuestro sistema de cruce de datos instantáneo y posicionamiento premium.\n\nPara asesorarte, ¿estás vendiendo una propiedad o valorando comprar una y necesitas orientación?',
          time: '02:40 AM'
        },
        {
          trigger: 1,
          text: '¡Entendido perfectamente! Para vender necesitas: Escrituras de la vivienda, Nota Simple (para verificar que no tenga cargas de hipoteca pendientes), DNI de los propietarios, Certificado de Eficiencia Energética e IBI.\n\nSi la vivienda que quieres comprar tuviera una carga hipotecaria activa, ¡no tienes de qué preocuparte! Se solicita certificado de saldo pendiente y se cancela el mismo día de la firma en Notaría con los fondos del comprador. Todo de forma transparente.\n\n¿Quieres que agendemos una llamada mañana con nuestro experto jurídico?',
          time: '02:41 AM'
        },
        {
          trigger: 2,
          text: '¡Trámite registrado con éxito! Un experto de nuestro equipo legal de IACRECE te llamará sin compromiso mañana por la mañana para resolver todas tus dudas sobre hipotecas y venta de propiedades. ¡Buenas noches!',
          time: '02:41 AM',
          book: true
        }
      ]
    }
  ];

  // Scroll to bottom on messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      resetChat();
    } else {
      clearTimeouts();
    }
  }, [isOpen]);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
    setIsTyping(false);
  };

  const resetChat = () => {
    clearTimeouts();
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: '¡Bienvenido al simulador interactivo de IACRECE! Selecciona uno de los escenarios reales nocturnos en los botones para ver la conversación automática con el agente inteligente en piloto automático:',
        time: 'En vivo',
        status: 'read'
      }
    ]);
    setSelectedScenario(null);
    setBookingSuccess(false);
    setInputText('');
  };

  const handleSelectScenario = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    // Reset timeouts and stop typing instantly to avoid overlaps
    clearTimeouts();
    setSelectedScenario(scenarioId);
    setBookingSuccess(false);
    setIsTyping(false);
    
    // Clear and initialize instantly with empty array to make it feel super snappy
    setMessages([]);

    // We will push messages sequentially utilizing timeout refs so we can clear them easily
    const addMsg = (newMsg: Message) => {
      setMessages(prev => [...prev, newMsg]);
    };

    // SEQUENCE Autoplay:
    // 1. Client initial message
    const t1 = setTimeout(() => {
      addMsg({
        id: `client-init`,
        sender: 'client',
        text: scenario.initialMessage,
        time: 'En vivo',
        status: 'read'
      });
      setIsTyping(true);
    }, 600);

    // 2. AI response 1
    const t2 = setTimeout(() => {
      setIsTyping(false);
      addMsg({
        id: `ai-resp-0`,
        sender: 'ai',
        text: scenario.responses[0].text,
        time: scenario.responses[0].time,
        status: 'read'
      });
    }, 2200);

    // 3. Client automatic response 1
    const clientReplyText1 = scenario.id === 'granvia' ? 'Me viene bien a las 18:00' :
                             scenario.id === 'alquiler' ? 'Sí, está totalmente amueblado y listo' :
                             scenario.id === 'dudas' ? 'Quiero vender, pero me surgen dos dudas: ¿qué documentación necesito exactamente para vender mi vivienda con vosotros? Y por otro lado, ¿cómo sé si tiene carga hipotecaria la casa de vuestra web que quiero comprar?' :
                             'Tengo unos 60.000€ ahorrados para la entrada';

    const t3 = setTimeout(() => {
      addMsg({
        id: `client-msg-1`,
        sender: 'client',
        text: clientReplyText1,
        time: 'En vivo',
        status: 'read'
      });
      setIsTyping(true);
    }, 4500);

    // 4. AI response 2
    const t4 = setTimeout(() => {
      setIsTyping(false);
      addMsg({
        id: `ai-resp-1`,
        sender: 'ai',
        text: scenario.responses[1].text,
        time: scenario.responses[1].time,
        status: 'read'
      });
    }, 6200);

    // 5. Client automatic response 2
    const clientReplyText2 = scenario.id === 'granvia' ? 'Mi teléfono es 612 345 678 y mi email es cliente@ideal.com' :
                             scenario.id === 'alquiler' ? 'Perfecto, mi teléfono es 622 999 888' :
                             scenario.id === 'dudas' ? 'Sí, claro, sería lo mejor. Mi teléfono es el 600 123 456 y mi correo es dudas@inmocliente.com' :
                             'Sí, mi teléfono es 655 444 333';

    const t5 = setTimeout(() => {
      addMsg({
        id: `client-msg-2`,
        sender: 'client',
        text: clientReplyText2,
        time: 'En vivo',
        status: 'read'
      });
      setIsTyping(true);
    }, 8500);

    // 6. AI response 3 (Saves lead)
    const t6 = setTimeout(() => {
      setIsTyping(false);
      addMsg({
        id: `ai-resp-2`,
        sender: 'ai',
        text: scenario.responses[2].text,
        time: scenario.responses[2].time,
        status: 'read'
      });
      setBookingSuccess(true);
    }, 10200);

    timeoutRefs.current = [t1, t2, t3, t4, t5, t6];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || selectedScenario !== null) return; // Completely blocked during scenario autoplay

    const userText = inputText;
    setInputText('');

    const clientMsg: Message = {
      id: `client-msg-${Date.now()}`,
      sender: 'client',
      text: userText,
      time: 'En vivo',
      status: 'read'
    };

    setMessages(prev => [...prev, clientMsg]);
    setIsTyping(true);

    const tGeneric = setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: `ai-general-resp`,
        sender: 'ai',
        text: '¡Hola! Soy el simulador automático. Por favor, selecciona uno de los botones de simulación a la izquierda para ver cómo funciona el bot en un escenario real.',
        time: 'En vivo',
        status: 'read'
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);

    timeoutRefs.current.push(tGeneric);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 overflow-hidden">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#020509]/85 backdrop-blur-md cursor-pointer"
        />

        {/* Outer Modal Box */}
        {/* Responsive: Uses overflow-y-auto on mobile, and fixed height overflow hidden on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-4xl bg-[#080E14] rounded-2xl border border-cyan-bright/30 shadow-[0_0_50px_rgba(0,240,255,0.25)] z-50 flex flex-col md:flex-row h-[90vh] md:h-[650px] max-h-[92vh] overflow-y-auto md:overflow-hidden"
        >
          {/* Laser Top Ambient Bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-bright to-transparent z-10 shrink-0" />

          {/* LEFT PANEL: Setup & Scenario Selection */}
          <div className="w-full md:w-[320px] bg-[#0C121A] p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/10 flex flex-col shrink-0">
            
            {/* Logo and Titles with Exit on mobile */}
            <div className="flex items-center justify-between mb-5 md:mb-6">
              <div className="flex items-center gap-2.5">
                <Logo className="w-8 h-8 md:w-9 md:h-9 rounded-lg shadow-[0_0_12px_rgba(0,216,237,0.25)]" />
                <div>
                  <h3 className="text-sm font-semibold font-display text-white">Prueba Real</h3>
                  <p className="text-[10px] font-sans font-medium text-cyan-bright uppercase tracking-wider">Simulador 24/7 Autoplay</p>
                </div>
              </div>
              
              {/* Close Button - Always visible & robust on mobile/desktop right here */}
              <button 
                onClick={onClose} 
                className="md:hidden text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer active:scale-95"
                title="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>



            {/* List of Scenarios */}
            <div className="space-y-2.5 md:space-y-3 flex-1">
              {scenarios.map((scenario) => {
                const isSelected = selectedScenario === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => handleSelectScenario(scenario.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col space-y-1 relative overflow-hidden group ${
                      isSelected 
                        ? 'bg-cyan-bright/10 border-cyan-bright/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                        : 'bg-white/[0.03] border-white/5 hover:border-white/10 hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-bright animate-pulse" />
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs md:text-sm font-display text-white">{scenario.emoji} {scenario.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions and Indicators */}
            <div className="mt-6 pt-5 border-t border-white/5 space-y-3 shrink-0">
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Simulación en tiempo de respuesta real</span>
              </div>
              
              <button 
                onClick={resetChat}
                type="button"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-white/10 hover:border-cyan-bright/35 hover:bg-cyan-bright/5 text-slate-300 hover:text-cyan-bright text-xs font-mono transition-all duration-300 cursor-pointer"
              >
                <RefreshCw size={12} />
                Reiniciar simulación
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: Simulated WhatsApp Live Screen */}
          {/* We define min-h-[460px] to make the chat screen beautiful and extremely spacious to scroll on mobile */}
          <div className="flex-1 flex flex-col bg-[#05090F] relative min-h-[480px] md:min-h-0 h-[520px] md:h-full">
            
            {/* Top Chat Bar Header */}
            <div className="px-4 py-3.5 md:px-6 md:py-4 border-b border-white/10 flex items-center justify-between bg-navy-medium/60 backdrop-blur-md sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-cyan-bright/10 border border-cyan-bright/30 flex items-center justify-center text-cyan-bright shadow-[0_0_12px_rgba(0,240,255,0.25)]">
                    <Bot size={16} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#05090F]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white font-display">Asistente Virtual IACRECE</h4>
                  <p className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    En línea • Automatizado 24/7
                  </p>
                </div>
              </div>

              {/* Close Button - ALWAYS visible on mobile & desktop in the chat header too, allowing effortless exit! */}
              <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer active:scale-95"
                title="Cerrar simulador"
              >
                <X size={18} />
              </button>
            </div>

            {/* Simulated Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((msg) => {
                const isClient = msg.sender === 'client';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`flex items-start gap-2.5 ${isClient ? 'justify-end pl-8 md:pl-12' : 'pr-8 md:pr-12'}`}
                  >
                    {!isClient && (
                      <div className="w-7 h-7 rounded-full bg-cyan-bright/10 border border-cyan-bright/30 flex items-center justify-center text-cyan-bright shrink-0 mt-0.5">
                        <Bot size={12} />
                      </div>
                    )}
                    
                    <div className={`rounded-xl p-3 md:p-4 shadow-md text-xs leading-relaxed border ${
                      isClient 
                        ? 'bg-slate-800 border-white/5 text-slate-100 rounded-tr-xs' 
                        : 'bg-[#0E1622] border-cyan-bright/20 text-white rounded-tl-xs'
                    }`}>
                      <div className="flex items-center justify-between gap-4 mb-1 opacity-60">
                        <span className="text-[8px] font-mono uppercase tracking-wider">
                          {isClient ? 'Cliente interesado' : 'Asistente Virtual 24/7'}
                        </span>
                        <span className="text-[8px] font-mono">{msg.time}</span>
                      </div>
                      <p className="font-normal text-xs md:text-[13px] whitespace-pre-wrap">{msg.text}</p>
                    </div>

                    {isClient && (
                      <div className="w-7 h-7 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                        <User size={12} />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Typing indicators */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 pr-12"
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-bright/10 border border-cyan-bright/30 flex items-center justify-center text-cyan-bright shrink-0">
                    <Bot size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="bg-[#0E1622] border border-cyan-bright/20 rounded-xl rounded-tl-xs p-3 flex items-center space-x-1 shadow-md">
                    <div className="w-1.5 h-1.5 bg-cyan-bright rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-bright rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-bright rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              {/* Sincronizado / Leads registered Banner */}
              {bookingSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex flex-col space-y-1.5 max-w-sm mx-auto text-center mt-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                >
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold font-display">
                    <CheckCircle2 size={14} className="animate-pulse" />
                    ¡Sincronizado con CRM con éxito!
                  </div>
                  <p className="text-[10px] md:text-xs leading-relaxed opacity-90">
                    Los datos del lead han sido precalificados y agendados al instante. Los asesores recibirán una alerta prioritaria por la mañana.
                  </p>
                </motion.div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Chat Bottom input form */}
            {/* Display message telling user they can't click options, they are fully automated */}
            <div className="p-3.5 md:p-4 border-t border-white/10 bg-navy-medium/85 backdrop-blur-md sticky bottom-0 shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={selectedScenario !== null}
                  placeholder={
                    selectedScenario 
                      ? "Simulación en curso (Autoplay enviando respuestas...)" 
                      : "Escribe un mensaje de prueba al bot..."
                  }
                  className="flex-1 bg-slate-900 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-cyan-bright/40 focus:ring-1 focus:ring-cyan-bright/35 transition-all disabled:opacity-50 disabled:bg-[#070b10] disabled:text-slate-500"
                />
                
                <button
                  type="submit"
                  disabled={selectedScenario !== null || !inputText.trim()}
                  className="w-11 h-11 rounded-xl bg-cyan-bright text-neutral-950 flex items-center justify-center shrink-0 hover:bg-white active:scale-95 disabled:opacity-45 disabled:hover:bg-cyan-bright disabled:active:scale-100 transition-all cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
