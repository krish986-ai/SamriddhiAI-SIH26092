import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  Mic, 
  MicOff, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Calculator, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemes';
import { speakText } from '../utils/voiceGuidance';

export default function MiniAssistant({ 
  currentLang = 'en', 
  isOpen,
  setIsOpen,
  onOpenSchemeModal, 
  onOpenCalculator, 
  onOpenGeoLocator 
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isWidgetOpen = isOpen !== undefined ? isOpen : internalOpen;
  const toggleOpen = (val) => {
    if (setIsOpen) setIsOpen(val);
    else setInternalOpen(val);
  };

  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Namaste! 🙏 I am **BhuSewa AI**, your official SIH26092 intelligent scheme assistant for marginalized SC/ST/OBC entrepreneurs. How can I guide your concessional credit journey today?",
      suggestions: [
        "Find schemes for SC Woman Artisan",
        "How to get 4% NSFDC Concessional Loan?",
        "Documents required for PMEGP 35% subsidy",
        "Find nearest SCA Partner in Maharashtra"
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isWidgetOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isWidgetOpen, isMinimized]);

  // Speech Recognition (Web Speech API)
  const handleToggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please type your query.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'mr' ? 'mr-IN' : currentLang === 'ta' ? 'ta-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      handleSendMessage(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Rule-based NLP Knowledge Router
  const generateBotResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('woman') || q.includes('women') || q.includes('mahila') || q.includes('female') || q.includes('artisan')) {
      const ms = SCHEMES_DATABASE.find(s => s.id === 'mahila-samriddhi') || SCHEMES_DATABASE[0];
      return {
        text: `✨ **Mahila Samriddhi Yojana (MSY)** is ideal for you!\n\n• **Interest Rate:** 4.0% p.a. (Super concessional)\n• **Max Loan:** ₹1,40,000 with 30% margin subsidy\n• **Eligibility:** Scheduled Caste (SC) women with family income under ₹3 Lakhs\n• **Eligible Sectors:** Tailoring, Handicrafts, Dairy, Retail & Micro-Enterprise`,
        actionButtons: [
          { label: "View Mahila Samriddhi Details", type: "modal", scheme: ms },
          { label: "Calculate 4% EMI", type: "calc", scheme: ms },
          { label: "Find Local SCA", type: "locator" }
        ],
        suggestions: ["Documents required for Mahila Samriddhi", "Can I apply without collateral?"]
      };
    }

    if (q.includes('4%') || q.includes('nsfdc') || q.includes('micro') || q.includes('term loan') || q.includes('rate')) {
      const tl = SCHEMES_DATABASE.find(s => s.id === 'nsfdc-term-loan') || SCHEMES_DATABASE[0];
      return {
        text: `🏛️ **NSFDC & NBCFDC Concessional Credit Schemes:**\n\n1. **NSFDC Micro-Credit Finance (MCF):** 5% p.a. up to ₹1.4 Lakhs (Quick sanction, zero collateral)\n2. **NSFDC Term Loan Scheme:** 6% p.a. up to ₹50 Lakhs for plant, machinery & commercial assets\n3. **Mahila Samriddhi:** 4% p.a. for SC women entrepreneurs\n\n*These interest rates are subsidized by the Ministry of Social Justice & Empowerment.*`,
        actionButtons: [
          { label: "Explore Term Loan (₹50L)", type: "modal", scheme: tl },
          { label: "Launch Concessional Calculator", type: "calc", scheme: tl }
        ],
        suggestions: ["How to apply via SCA?", "What is the income ceiling?"]
      };
    }

    if (q.includes('education') || q.includes('elas') || q.includes('study') || q.includes('college')) {
      const elas = SCHEMES_DATABASE.find(s => s.id === 'mosje-educational-loan') || SCHEMES_DATABASE[0];
      return {
        text: `🎓 **Educational Loan Scheme (ELAS) - MoSJE:**\n\n• **Concessional Rate:** 4.0% p.a. for female students (4.5% for others)\n• **Max Limit:** Up to ₹20 Lakhs for professional courses in India/Abroad\n• **Moratorium:** Course Duration + 1 full year before repayment starts`,
        actionButtons: [
          { label: "View Education Loan Details", type: "modal", scheme: elas },
          { label: "Calculate Education EMI", type: "calc", scheme: elas }
        ],
        suggestions: ["Eligible professional courses", "SCA partner list"]
      };
    }

    if (q.includes('subsidy') || q.includes('pmegp') || q.includes('grant') || q.includes('35%') || q.includes('free money')) {
      const pmegp = SCHEMES_DATABASE.find(s => s.id === 'pmegp-scheme') || SCHEMES_DATABASE[0];
      return {
        text: `💰 **Prime Minister's Employment Generation Programme (PMEGP):**\n\n• **Capital Subsidy:** 35% in rural areas, 25% in urban areas for SC/ST/OBC/Women\n• **Max Project Cost:** ₹50 Lakhs for manufacturing, ₹20 Lakhs for service sector\n• **Beneficiary Contribution:** Only 5% margin money required from borrower`,
        actionButtons: [
          { label: "View PMEGP Scheme", type: "modal", scheme: pmegp },
          { label: "Simulate 35% Subsidy", type: "calc", scheme: pmegp }
        ],
        suggestions: ["Documents for 35% subsidy", "Is EDP training mandatory?"]
      };
    }

    if (q.includes('document') || q.includes('paper') || q.includes('proof') || q.includes('certificate')) {
      return {
        text: `📋 **Mandatory Documents Checklist for SC Concessional Schemes:**\n\n1. **Caste Certificate (SC/ST/OBC)** issued by Sub-Divisional Magistrate (SDM) / Tehsildar\n2. **Income Certificate** showing family income within statutory ceiling\n3. **Aadhaar Card & PAN Card**\n4. **Bank Account Details** (Linked with Aadhaar for Direct Benefit Transfer)\n5. **Project Proposal / Quotation** of equipment/goods to be financed`,
        actionButtons: [
          { label: "Fill Citizen Profile", type: "wizard" },
          { label: "View All Schemes", type: "schemes" }
        ],
        suggestions: ["Where to submit physical papers?", "How to track application?"]
      };
    }

    if (q.includes('partner') || q.includes('sca') || q.includes('channel') || q.includes('maharashtra') || q.includes('office') || q.includes('location')) {
      return {
        text: `📍 **State Channelizing Agencies (SCAs):**\n\nSCAs are the official state-level implementation bodies of NSFDC & NBCFDC. For instance, in Maharashtra, **MPBCDC** handles SC loans, and **KVIC/DICs** process PMEGP subsidies. Applications submitted via BHUSEWA are automatically routed to your nearest district office.`,
        actionButtons: [
          { label: "Open Interactive SCA Map", type: "locator" }
        ],
        suggestions: ["Find partners in Uttar Pradesh", "Find partners in Tamil Nadu"]
      };
    }

    return {
      text: `Hello! **BHUSEWA AI** matches your enterprise needs against 4,770+ verified central and state schemes.\n\nYou can ask me about:\n• **4% NSFDC Loans** for SC entrepreneurs\n• **35% Capital Subsidies** under PMEGP\n• **Mahila Samriddhi Yojana** for women\n• **MoSJE Education Loans**\n• Locating your district **State Channelizing Agency (SCA)**`,
      actionButtons: [
        { label: "Start Profile Matcher", type: "wizard" },
        { label: "Launch EMI Calculator", type: "calc" },
        { label: "Find SCA Locator", type: "locator" }
      ],
      suggestions: [
        "Find schemes for SC Woman Artisan",
        "How to get 4% NSFDC Concessional Loan?",
        "Documents required for PMEGP 35% subsidy"
      ]
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse.text,
        actionButtons: botResponse.actionButtons,
        suggestions: botResponse.suggestions,
        schemeData: botResponse.schemeData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionButtonClick = (btn) => {
    if (btn.type === 'modal' && onOpenSchemeModal) {
      onOpenSchemeModal(btn.scheme || SCHEMES_DATABASE[0]);
    } else if (btn.type === 'calc' && onOpenCalculator) {
      onOpenCalculator(btn.scheme || SCHEMES_DATABASE[0]);
    } else if (btn.type === 'locator' && onOpenGeoLocator) {
      onOpenGeoLocator();
    } else if (btn.type === 'wizard') {
      const elem = document.getElementById('profile-wizard-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else if (btn.type === 'schemes') {
      const elem = document.getElementById('results-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Floating Launch Button */}
      {!isWidgetOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999999
        }}>
          <button
            onClick={() => toggleOpen(true)}
            aria-label="Open BhuSewa AI Assistant"
            style={{
              background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
              color: '#ffffff',
              border: '2px solid #ffffff',
              borderRadius: '9999px',
              padding: '0.75rem 1.35rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 30px rgba(234, 88, 12, 0.5), 0 0 0 4px rgba(249, 115, 22, 0.25)',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '0.94rem',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              animation: 'assistantPulse 2.5s infinite'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 14px 35px rgba(234, 88, 12, 0.6), 0 0 0 6px rgba(249, 115, 22, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(234, 88, 12, 0.5), 0 0 0 4px rgba(249, 115, 22, 0.25)';
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#ffffff',
              color: '#ea580c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}>
              <Bot size={22} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ letterSpacing: '-0.01em' }}>BhuSewa AI</span>
                <Sparkles size={14} color="#fde047" />
              </div>
              <span style={{ fontSize: '0.72rem', color: '#ffedd5', fontWeight: 600 }}>
                Ask Scheme Assistant
              </span>
            </div>

            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid #ffffff',
              marginLeft: '2px'
            }}></span>
          </button>
        </div>
      )}

      {/* 2. Chatbot Window Modal / Drawer */}
      {isWidgetOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '400px',
          maxWidth: 'calc(100vw - 32px)',
          height: isMinimized ? '64px' : '600px',
          maxHeight: 'calc(100vh - 48px)',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(234, 88, 12, 0.2)',
          border: '2px solid #fed7aa',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999999,
          overflow: 'hidden',
          transition: 'height 0.2s ease-in-out'
        }}>
          
          {/* Header Bar */}
          <div style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
            color: '#ffffff',
            padding: '0.9rem 1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#ffffff',
                color: '#ea580c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.96rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>BhuSewa AI</span>
                  <span style={{ fontSize: '0.65rem', background: '#ffffff', color: '#ea580c', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                    SIH26092
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#ffedd5', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span className="live-indicator" style={{ width: '6px', height: '6px', background: '#fde047' }}></span>
                  <span>Online • Government Welfare Assistant</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '6px',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <button
                onClick={() => toggleOpen(false)}
                title="Close"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '6px',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message History Stream */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
                background: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem'
              }}>
                
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isBot ? 'flex-start' : 'flex-end',
                        maxWidth: '92%',
                        alignSelf: isBot ? 'flex-start' : 'flex-end'
                      }}
                    >
                      <div style={{
                        background: isBot ? '#ffffff' : '#ea580c',
                        color: isBot ? '#111827' : '#ffffff',
                        padding: '0.85rem 1rem',
                        borderRadius: isBot ? '14px 14px 14px 2px' : '14px 14px 2px 14px',
                        border: isBot ? '1px solid #fed7aa' : 'none',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                        fontSize: '0.85rem',
                        lineHeight: 1.55,
                        whiteSpace: 'pre-line'
                      }}>
                        {msg.text}

                        {/* Interactive Action Buttons */}
                        {msg.actionButtons && msg.actionButtons.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                            {msg.actionButtons.map((btn, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleActionButtonClick(btn)}
                                style={{
                                  background: '#fff7ed',
                                  color: '#ea580c',
                                  border: '1px solid #fed7aa',
                                  borderRadius: '9999px',
                                  padding: '0.35rem 0.85rem',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  transition: 'all 0.15s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#ffedd5'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#fff7ed'}
                              >
                                <span>{btn.label}</span>
                                <ArrowRight size={13} />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Timestamp & Listen Button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem', fontSize: '0.7rem', color: '#94a3b8' }}>
                        <span>{msg.timestamp}</span>
                        {isBot && (
                          <button
                            onClick={() => speakText(msg.text.replace(/[*#]/g, ''), currentLang)}
                            title="Listen to response"
                            style={{
                              border: 'none',
                              background: 'transparent',
                              color: '#64748b',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0 2px'
                            }}
                          >
                            <Volume2 size={13} />
                          </button>
                        )}
                      </div>

                      {/* Quick Prompt Suggestions */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
                          {msg.suggestions.map((sug, i) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(sug)}
                              style={{
                                background: '#ffffff',
                                border: '1px solid #fed7aa',
                                borderRadius: '9999px',
                                padding: '0.3rem 0.75rem',
                                fontSize: '0.75rem',
                                color: '#334155',
                                fontWeight: 600,
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#ea580c';
                                e.currentTarget.style.color = '#ea580c';
                                e.currentTarget.style.background = '#fff7ed';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#fed7aa';
                                e.currentTarget.style.color = '#334155';
                                e.currentTarget.style.background = '#ffffff';
                              }}
                            >
                              💡 {sug}
                            </button>
                          ))}
                        </div>
                      )}

                    </div>
                  );
                })}

                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.78rem', fontStyle: 'italic', paddingLeft: '0.5rem' }}>
                    <Bot size={15} color="#ea580c" />
                    <span>BhuSewa AI is calculating verified benefits...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div style={{
                background: '#ffffff',
                borderTop: '1px solid #e5e7eb',
                padding: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem'
              }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about 4% loans, subsidies, documents..."
                    style={{
                      flex: 1,
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '9999px',
                      padding: '0.55rem 0.95rem',
                      fontSize: '0.84rem',
                      outline: 'none',
                      color: '#111827'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                  />

                  {/* Voice Button */}
                  <button
                    type="button"
                    onClick={handleToggleVoiceInput}
                    title={isListening ? "Listening... Click to stop" : "Speak your query"}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: isListening ? '#dc2626' : '#f1f5f9',
                      border: 'none',
                      color: isListening ? '#ffffff' : '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isListening ? <MicOff size={17} /> : <Mic size={17} />}
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: inputText.trim() ? '#ea580c' : '#e2e8f0',
                      border: 'none',
                      color: inputText.trim() ? '#ffffff' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: inputText.trim() ? 'pointer' : 'default',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Send size={16} />
                  </button>
                </form>

                <div style={{ textAlign: 'center', fontSize: '0.68rem', color: '#94a3b8' }}>
                  Powered by Government of India Open Data & BHUSEWA Logic Engine
                </div>
              </div>
            </>
          )}

        </div>
      )}
    </>
  );
}
