import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, User, MessageCircle, Calendar, Bot, RefreshCw } from 'lucide-react';
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

  // Scenarios to choose from
  const scenarios = [
    {
      id: 'granvia',
      title: 'Comprar Piso Gran Vía',
      emoji: '🏢',
      time: '03:15 AM',
      initialMessage: 'Hola, acabo de ver el piso en Gran Vía por 450.000€. ¿Se puede visitar mañana por la tarde?',
      responses: [
        {
          trigger: 0,
          text: '¡Hola! Qué bien que nos escribas. El piso de Gran Vía ha despertado muchísimo interés hoy. Sí, está disponible para visitas mañana por la tarde.',
          time: '03:15 AM'
        },
        {
          trigger: 1, // after client answers "Me viene bien a las 18:00"
          text: '¡Perfecto! Te he reservado provisionalmente el hueco de las 18:00h mañana. Para confirmar, ¿podrías facilitarme tu número de teléfono y tu email principal?',
          time: '03:16 AM'
        },
        {
          trigger: 2, // after contact info is sent
          text: '¡Guardado! ✅ Acabo de enviarte el pase de visita y la dirección exacta a tu email. El asesor David te esperará allí. ¡Gracias por confiar en IACRECE!',
          time: '03:16 AM',
          book: true
        }
      ]
    },
    {
      id: 'alquiler',
      title: 'Poner Piso en Alquiler',
      emoji: '🔑',
      time: '23:45 PM',
      initialMessage: 'Hola, tengo un ático en Paseo de Gracia y quiero ponerlo en alquiler inmediato. Busco una agencia seria.',
      responses: [
        {
          trigger: 0,
          text: '¡Hola! Encantados de saludarte a esta hora. Gestionamos propiedades premium en esa zona con filtros de solvencia muy estrictos. ¿Tienes ya fotos del ático o está amueblado?',
          time: '23:45 PM'
        },
        {
          trigger: 1,
          text: 'Entendido. Lo ideal es agendar una llamada rápida de 5 minutos con nuestra especialista de alquileres mañana sobre las 10:00h. ¿Te vendría bien esa hora?',
          time: '23:46 PM'
        },
        {
          trigger: 2,
          text: '¡Perfecto! He bloqueado la cita telefónica en la agenda del especialista para mañana a las 10:00h. Te llamaremos al teléfono facilitado. ¡Buenas noches!',
          time: '23:47 PM',
          book: true
        }
      ]
    },
    {
      id: 'presupuesto',
      title: 'Consulta de Hipoteca/Precio',
      emoji: '📊',
      time: '01:10 AM',
      initialMessage: 'Hola. ¿Para un piso de 300.000€, hacéis estudio de viabilidad hipotecaria gratuito?',
      responses: [
        {
          trigger: 0,
          text: '¡Hola! Sí, por supuesto. Realizamos un estudio de viabilidad preventivo 100% gratuito con nuestros brokers colaboradores para conseguir hasta el 90% de financiación. ¿Cuál es tu aportación inicial aproximada?',
          time: '01:10 AM'
        },
        {
          trigger: 1,
          text: 'Excelente base. Con eso tu cuota estimada sería muy competitiva, en torno a los 900€/mes. ¿Prefieres que te llame nuestro experto hipotecario mañana por la mañana?',
          time: '01:12 AM'
        },
        {
          trigger: 2,
          text: '¡Agenda coordinada! He agendado la llamada técnica gratuita para mañana a las 11:30h. Recibirás un SMS de confirmación en breve. ¡Un saludo afectuoso!',
          time: '01:13 AM',
          book: true
        }
      ]
    }
  ];

  // Scroll to bottom on messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Set default intro message on mount / open
  useEffect(() => {
    if (isOpen) {
      resetChat();
    }
  }, [isOpen]);

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: '¡Bienvenido a la demo interactiva de IACRECE! Elige uno de los escenarios reales de clientes de abajo para ver cómo nuestro agente virtual asiste y agenda un cliente a altas horas de la madrugada:',
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

    resetChat();
    setSelectedScenario(scenarioId);

    // AI is thinking a tiny bit first
    setIsTyping(true);
    
    setTimeout(() => {
      // Add client's initial message
      const clientMsg: Message = {
        id: `client-init`,
        sender: 'client',
        text: scenario.initialMessage,
        time: scenario.time,
        status: 'read'
      };

      setMessages(prev => [...prev.filter(m => m.id !== 'welcome'), clientMsg]);
      setIsTyping(true);

      // AI responds instantly
      setTimeout(() => {
        setIsTyping(false);
        const aiMsg: Message = {
          id: `ai-resp-0`,
          sender: 'ai',
          text: scenario.responses[0].text,
          time: scenario.time,
          status: 'read'
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1500);

    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');

    // Add user message to chat
    const clientMsg: Message = {
      id: `client-msg-${Date.now()}`,
      sender: 'client',
      text: userText,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    };

    setMessages(prev => [...prev, clientMsg]);
    setIsTyping(true);

    // Simulate AI response based on step
    setTimeout(() => {
      setIsTyping(false);

      if (selectedScenario) {
        const scenario = scenarios.find(s => s.id === selectedScenario);
        // Find how many AI responses have been sent
        const aiMessageCount = messages.filter(m => m.sender === 'ai').length;
        
        if (scenario && scenario.responses[aiMessageCount]) {
          const nextResp = scenario.responses[aiMessageCount];
          
          const aiMsg: Message = {
            id: `ai-resp-${aiMessageCount}`,
            sender: 'ai',
            text: nextResp.text,
            time: nextResp.time,
            status: 'read'
          };
          
          setMessages(prev => [...prev, aiMsg]);

          if (nextResp.book) {
            setBookingSuccess(true);
          }
        } else {
          // Default fallbacks
          const aiMsg: Message = {
            id: `ai-resp-fallback`,
            sender: 'ai',
            text: '¡Entendido perfectamente! He registrado todos tus datos en nuestro sistema y un asesor experto se pondrá en contacto contigo de forma prioritaria a primera hora. ¡Gracias!',
            time: 'Instante',
            status: 'booked'
          };
          setMessages(prev => [...prev, aiMsg]);
          setBookingSuccess(true);
        }
      } else {
        // Chat outside scenarios
        const aiMsg: Message = {
          id: `ai-general-resp`,
          sender: 'ai',
          text: '¡Encantado de hablar contigo! Soy el asistente virtual oficial de demostración de IACRECE. Para ver el ciclo completo de captura de leads nocturnos, te sugiero elegir uno de los botones de escenarios programados de arriba.',
          time: 'En vivo',
          status: 'read'
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    }, 1800);
  };

  const handleSuggestedReply = (text: string) => {
    setInputText(text);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-40"
        />

        {/* Modal Dialog container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-4xl bg-navy-medium rounded-2xl border border-cyan-bright/30 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden z-50 flex flex-col md:flex-row h-auto md:h-[650px]"
        >
          {/* Header laser border decoration */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-bright to-transparent" />

          {/* LEFT SIDE PANEL: Instructions & Scenarios Selection */}
          <div className="w-full md:w-[350px] bg-navy-dark p-6 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
            <div>
              {/* Top title */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Logo className="w-9 h-9 rounded-lg shadow-[0_0_12px_rgba(0,216,237,0.2)]" />
                  <div>
                    <h3 className="text-sm font-semibold font-display text-white">IACRECE Demo</h3>
                    <p className="text-[10px] font-mono text-cyan-bright uppercase tracking-wider">Simulador 24/7</p>
                  </div>
                </div>
                {/* Close Button on Mobile inside Left Panel */}
                <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white hover:bg-white/5 p-1.5 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>

              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-widest font-mono mb-3">
                Selecciona un Escenario:
              </h4>

              {/* List of scenarios */}
              <div className="space-y-3">
                {scenarios.map((scenario) => {
                  const isSelected = selectedScenario === scenario.id;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleSelectScenario(scenario.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col space-y-1 group relative overflow-hidden ${
                        isSelected 
                          ? 'bg-cyan-bright/10 border-cyan-bright/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                          : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {/* Laser backdrop highlighter */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-bright" />
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs md:text-sm font-display text-white">{scenario.emoji} {scenario.title}</span>
                        <span className="text-[9px] font-mono text-slate-500 group-hover:text-cyan-bright transition-colors">{scenario.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 group-hover:text-slate-300 transition-colors">
                        "{scenario.initialMessage}"
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom help indicators */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Atención instantánea sin esperas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright" />
                <span>Simulador pre-programado en vivo</span>
              </div>
              
              <button 
                onClick={resetChat} 
                className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-white/10 hover:border-cyan-bright/35 hover:bg-cyan-bright/5 text-slate-300 hover:text-cyan-bright text-xs font-mono transition-all"
              >
                <RefreshCw size={12} />
                Reiniciar Simulación
              </button>
            </div>
          </div>

          {/* RIGHT SIDE PANEL: LIVE INTERACTIVE CHAT SCREEN */}
          <div className="flex-1 flex flex-col justify-between h-[500px] md:h-full bg-[#080E14] relative">
            
            {/* Top Chat Bar */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-navy-medium/60 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-cyan-bright/10 border border-cyan-bright/30 flex items-center justify-center text-cyan-bright shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                    <Bot size={18} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#080E14]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white font-display">Agente IACRECE</h4>
                  <p className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    Atendiendo 24/7 en piloto automático
                  </p>
                </div>
              </div>

              {/* Close Button on Desktop */}
              <button onClick={onClose} className="hidden md:block text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Chat Body messages list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => {
                const isClient = msg.sender === 'client';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className={`flex items-start gap-3 ${isClient ? 'justify-end pl-12' : 'pr-12'}`}
                  >
                    {!isClient && (
                      <div className="w-7 h-7 rounded-full bg-cyan-bright/10 border border-cyan-bright/30 flex items-center justify-center text-cyan-bright shrink-0 mt-0.5">
                        <Bot size={13} />
                      </div>
                    )}
                    
                    <div className={`rounded-xl p-3.5 shadow-md text-xs leading-relaxed border ${
                      isClient 
                        ? 'bg-slate-800 border-white/5 text-slate-100 rounded-tr-xs' 
                        : 'bg-navy-medium border-cyan-bright/20 text-white rounded-tl-xs'
                    }`}>
                      <div className="flex items-center justify-between gap-4 mb-1 opacity-60">
                        <span className="text-[8px] font-mono uppercase tracking-wider">
                          {isClient ? 'Prosperidad comercial' : 'IACRECE AI BOT'}
                        </span>
                        <span className="text-[8px] font-mono">{msg.time}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>

                    {isClient && (
                      <div className="w-7 h-7 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                        <User size={13} />
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
                  className="flex items-start gap-3 pr-12"
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-bright/10 border border-cyan-bright/30 flex items-center justify-center text-cyan-bright shrink-0">
                    <Bot size={13} className="animate-pulse" />
                  </div>
                  <div className="bg-navy-medium border border-cyan-bright/20 rounded-xl rounded-tl-xs p-3 flex items-center space-x-1 shadow-md">
                    <div className="w-1.5 h-1.5 bg-cyan-bright rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-bright rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-bright rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              {/* Booking success panel banner */}
              {bookingSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex flex-col space-y-2 max-w-md mx-auto text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold font-display">
                    <CheckCircle2 size={15} />
                    ¡Llamada/Visita Coordinada Con Éxito!
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    El cliente ha precalificado favorablemente y se ha sincronizado en menos de 10 segundos en la agenda del agente inmobiliario.
                  </p>
                </motion.div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Chat bottom action input bars with standard replies */}
            <div className="p-4 border-t border-white/10 bg-navy-medium/85 backdrop-blur-md sticky bottom-0">
              
              {/* Optional Quick Automated Responses depending on situation */}
              {selectedScenario && !bookingSuccess && (
                <div className="flex flex-wrap gap-2 mb-3.5 max-w-full overflow-x-auto justify-end">
                  {selectedScenario === 'granvia' && messages.length === 2 && (
                    <button 
                      onClick={() => handleSuggestedReply('Me viene bien mañana a las 18:00h, agéndalo por favor.')}
                      className="text-[10px] font-mono bg-cyan-bright/10 border border-cyan-bright/20 hover:border-cyan-bright text-cyan-bright py-1 px-3 rounded-full transition-all"
                    >
                      💡 "Me viene bien a las 18:00h..."
                    </button>
                  )}
                  {selectedScenario === 'granvia' && messages.length === 4 && (
                    <button 
                      onClick={() => handleSuggestedReply('Mi teléfono es 612 345 678 y mi email es cliente@ideal.com')}
                      className="text-[10px] font-mono bg-cyan-bright/10 border border-cyan-bright/20 hover:border-cyan-bright text-cyan-bright py-1 px-3 rounded-full transition-all"
                    >
                      💡 "Mi teléfono es 612..."
                    </button>
                  )}

                  {selectedScenario === 'alquiler' && messages.length === 2 && (
                    <button 
                      onClick={() => handleSuggestedReply('Sí, está totalmente amueblado y listo para alquilar.')}
                      className="text-[10px] font-mono bg-cyan-bright/10 border border-cyan-bright/20 hover:border-cyan-bright text-cyan-bright py-1 px-3 rounded-full transition-all"
                    >
                      💡 "Sí, está totalmente amueblado..."
                    </button>
                  )}
                  {selectedScenario === 'alquiler' && messages.length === 4 && (
                    <button 
                      onClick={() => handleSuggestedReply('Perfecto, mañana a las 10:00h me encaja. Aquí tienes mi teléfono: 622 999 888')}
                      className="text-[10px] font-mono bg-cyan-bright/10 border border-cyan-bright/20 hover:border-cyan-bright text-cyan-bright py-1 px-3 rounded-full transition-all"
                    >
                      💡 "Mañana a las 10:00h..."
                    </button>
                  )}

                  {selectedScenario === 'presupuesto' && messages.length === 2 && (
                    <button 
                      onClick={() => handleSuggestedReply('Tengo unos 60.000€ ahorrados para la entrada.')}
                      className="text-[10px] font-mono bg-cyan-bright/10 border border-cyan-bright/20 hover:border-cyan-bright text-cyan-bright py-1 px-3 rounded-full transition-all"
                    >
                      💡 "Tengo unos 60.000€..."
                    </button>
                  )}
                  {selectedScenario === 'presupuesto' && messages.length === 4 && (
                    <button 
                      onClick={() => handleSuggestedReply('Sí, llamadme mañana a las 11:30h sin falta. Mi teléfono es 655 444 333')}
                      className="text-[10px] font-mono bg-cyan-bright/10 border border-cyan-bright/20 hover:border-cyan-bright text-cyan-bright py-1 px-3 rounded-full transition-all"
                    >
                      💡 "Sí, llamadme mañana..."
                    </button>
                  )}
                </div>
              )}

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="flex gap-2.5 items-center">
                <input
                  id="chat-input-text"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    selectedScenario 
                      ? "Escribe tu respuesta aquí o pulsa una sugerencia..." 
                      : "Escribe un mensaje de prueba al asistente virtual..."
                  }
                  className="flex-1 bg-slate-900 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-cyan-bright/40 focus:ring-1 focus:ring-cyan-bright/35 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-11 h-11 rounded-xl bg-cyan-bright text-neutral-950 flex items-center justify-center shrink-0 hover:bg-white active:scale-95 disabled:opacity-40 disabled:hover:bg-cyan-bright disabled:active:scale-100 transition-all cursor-pointer"
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
