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
      text: "Namaste! 🙏 I am **SchemeMitra AI**, your official myScheme assistant for marginalized & SC/ST/OBC entrepreneurs. How can I assist your business journey today?",
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

  // AI Knowledge Answer Engine
  const generateBotResponse = (query) => {
    const q = query.toLowerCase();
    
    // 1. Mahila Samriddhi / SC Women
    if (q.includes('woman') || q.includes('women') || q.includes('mahila') || q.includes('artisan') || q.includes('tailoring') || q.includes('female')) {
      const scheme = SCHEMES_DATABASE.find(s => s.id === 'mahila-samriddhi') || SCHEMES_DATABASE[0];
      return {
        text: `For women entrepreneurs (especially SC women), the **Mahila Samriddhi Yojana** is the highest recommended scheme!\n\n• **Interest Rate:** Super concessional **4% p.a.** (vs ~13.5% commercial bank rate)\n• **Max Funding:** Up to **₹1.40 Lakhs** micro-credit\n• **Subsidy:** 30% margin grant\n• **Collateral:** Zero collateral required\n• **Administered by:** NSFDC & State Women Development Corporations.`,
        actionType: 'scheme',
        schemeData: scheme,
        actionButtons: [
          { label: "View Mahila Samriddhi", type: "modal", scheme },
          { label: "Calculate 4% EMI", type: "calc", scheme }
        ],
        suggestions: [
          "Documents needed for Mahila Samriddhi",
          "Find SCA Partner in my state",
          "Tell me about Stand-Up India"
        ]
      };
    }

    // 2. NSFDC Concessional Term Loan / 4-6% Rate
    if (q.includes('nsfdc') || q.includes('4%') || q.includes('6%') || q.includes('concessional') || q.includes('term loan') || q.includes('manufacturing')) {
      const scheme = SCHEMES_DATABASE.find(s => s.id === 'nsfdc-term-loan') || SCHEMES_DATABASE[0];
      return {
        text: `The **NSFDC Concessional Term Loan Scheme** provides project financing up to **₹50 Lakhs** at just **6% p.a.** interest for SC entrepreneurs.\n\n• **Eligible Sectors:** Manufacturing, Services, Trading, Agri-Allied\n• **Tenure:** Up to 5 Years with 6–12 months initial moratorium\n• **Channel Partner:** Channeled through your State Channelizing Agency (SCA) or Public Sector Banks.`,
        actionType: 'scheme',
        schemeData: scheme,
        actionButtons: [
          { label: "Explore NSFDC Scheme", type: "modal", scheme },
          { label: "Calculate Savings vs Bank", type: "calc", scheme }
        ],
        suggestions: [
          "What is the family income limit?",
          "How does SCA routing work?",
          "Documents required for NSFDC"
        ]
      };
    }

    // 3. PMEGP / Subsidy
    if (q.includes('pmegp') || q.includes('subsidy') || q.includes('35%') || q.includes('grant') || q.includes('capital subsidy')) {
      const scheme = SCHEMES_DATABASE.find(s => s.id === 'pmegp-sc-special') || SCHEMES_DATABASE[0];
      return {
        text: `Under the **PMEGP Special Category (SC/ST/Women)**:\n\n• **Rural Units:** Get **35% Direct Capital Subsidy** (Government Grant)\n• **Urban Units:** Get **25% Capital Subsidy**\n• **Max Project Cost:** Up to ₹50 Lakhs (Manufacturing) / ₹20 Lakhs (Services)\n• **Beneficiary Contribution:** Only 5% of project cost!`,
        actionType: 'scheme',
        schemeData: scheme,
        actionButtons: [
          { label: "View PMEGP Details", type: "modal", scheme },
          { label: "Check Subsidy Calculation", type: "calc", scheme }
        ],
        suggestions: [
          "Which documents are needed for PMEGP?",
          "Can I apply online?",
          "Find nearest District Industries Centre (DIC)"
        ]
      };
    }

    // 4. State Channelizing Agency (SCA) / Partner Locator
    if (q.includes('sca') || q.includes('partner') || q.includes('maharashtra') || q.includes('office') || q.includes('delhi') || q.includes('tamil nadu') || q.includes('where to apply')) {
      return {
        text: `Applications under apex corporations (NSFDC, NBCFDC, NSKFDC) are routed through accredited **State Channelizing Agencies (SCAs)**:\n\n• **Maharashtra:** MPBCDC (Mahatma Phule Backward Class Dev Corp)\n• **Delhi:** DSFDC (Delhi SC/ST/OBC Dev Corp)\n• **Tamil Nadu:** TAHDCO (TN Adi Dravidar Housing & Dev Corp)\n• **Uttar Pradesh:** UPSDFC (UP Scheduled Castes Finance & Dev Corp)\n\nOur system automatically links your application to the nearest district office.`,
        actionButtons: [
          { label: "Open SCA Geo-Locator Map", type: "locator" },
          { label: "Find Schemes for my State", type: "schemes" }
        ],
        suggestions: [
          "Check my eligibility score",
          "What is the turnaround time?",
          "Are there any agent fees?"
        ]
      };
    }

    // 5. Documents / Paperwork
    if (q.includes('document') || q.includes('paper') || q.includes('caste certificate') || q.includes('aadhaar') || q.includes('proof')) {
      return {
        text: `The standard pre-vetted document checklist for concessional schemes includes:\n\n1. **Caste Certificate:** Issued by competent Revenue Authority (Tehsildar/SDM)\n2. **Income Certificate:** Family income within ₹3.00 Lakhs p.a. (for apex schemes)\n3. **Identity & Address:** Aadhaar Card & PAN Card\n4. **Project Proposal / DPR:** Basic quotation of machinery or raw materials\n5. **Bank Passbook:** 6 months active bank statement.`,
        actionButtons: [
          { label: "Start Profile Check", type: "wizard" }
        ],
        suggestions: [
          "How to calculate monthly EMI?",
          "What if I don't have a DPR?",
          "Show all 4,780+ schemes"
        ]
      };
    }

    // 6. EMI / Calculation Savings
    if (q.includes('emi') || q.includes('calculat') || q.includes('save') || q.includes('interest') || q.includes('comparison')) {
      return {
        text: `On a **₹2,00,000** business loan over 3 years:\n\n• **Commercial Bank (13.5%):** EMI is ~₹6,788/mo (Total Interest: ₹44,380)\n• **NSFDC Concessional (4.0%):** EMI is ~₹5,907/mo (Total Interest: ₹12,652)\n• **Your Total Savings:** **₹31,728** in direct interest savings!`,
        actionButtons: [
          { label: "Open Interactive EMI Calculator", type: "calc" }
        ],
        suggestions: [
          "Find schemes matching my business",
          "How do I track my submitted application?"
        ]
      };
    }

    // Generic Fallback with smart recommendation
    return {
      text: `I understand you're asking about *"_query_"*. Based on myScheme.gov.in guidelines, you can discover all Central & State schemes, calculate your exact concessional rate benefits, or locate your nearest accredited channel partner.`,
      actionButtons: [
        { label: "Check Scheme Eligibility", type: "wizard" },
        { label: "Browse All Schemes", type: "schemes" },
        { label: "Locate SCA Partner", type: "locator" }
      ],
      suggestions: [
        "SC Concessional Loan (4%)",
        "PMEGP 35% Capital Subsidy",
        "Women Artisan Schemes",
        "Nearest SCA Partner"
      ]
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(text);
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
      {/* 1. Floating Launch Button (Always on Top with High z-index & Glow Effect) */}
      {!isWidgetOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999999
        }}>
          <button
            onClick={() => toggleOpen(true)}
            aria-label="Open SchemeMitra AI Assistant"
            style={{
              background: 'linear-gradient(135deg, #136f38 0%, #0e5a2c 100%)',
              color: '#ffffff',
              border: '2px solid #ffffff',
              borderRadius: '9999px',
              padding: '0.75rem 1.35rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 30px rgba(19, 111, 56, 0.5), 0 0 0 4px rgba(22, 163, 74, 0.25)',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '0.94rem',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              animation: 'assistantPulse 2.5s infinite'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 14px 35px rgba(19, 111, 56, 0.6), 0 0 0 6px rgba(22, 163, 74, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(19, 111, 56, 0.5), 0 0 0 4px rgba(22, 163, 74, 0.25)';
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#ffffff',
              color: '#136f38',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}>
              <Bot size={22} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ letterSpacing: '-0.01em' }}>SchemeMitra AI</span>
                <Sparkles size={14} color="#fde047" />
              </div>
              <span style={{ fontSize: '0.72rem', color: '#dcfce7', fontWeight: 600 }}>
                Ask myScheme Assistant
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
          boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(19, 111, 56, 0.2)',
          border: '2px solid #c8e6c9',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999999,
          overflow: 'hidden',
          transition: 'height 0.2s ease-in-out'
        }}>
          
          {/* Header Bar */}
          <div style={{
            background: 'linear-gradient(135deg, #136f38 0%, #0e5a2c 100%)',
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
                color: '#136f38',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.96rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>SchemeMitra AI</span>
                  <span style={{ fontSize: '0.65rem', background: '#f97316', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                    OFFICIAL
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#dcfce7', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span className="live-indicator" style={{ width: '6px', height: '6px' }}></span>
                  <span>Online • myScheme Government Assistant</span>
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
                        background: isBot ? '#ffffff' : '#136f38',
                        color: isBot ? '#111827' : '#ffffff',
                        padding: '0.85rem 1rem',
                        borderRadius: isBot ? '14px 14px 14px 2px' : '14px 14px 2px 14px',
                        border: isBot ? '1px solid #e5e7eb' : 'none',
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
                                  background: '#e8f5e9',
                                  color: '#136f38',
                                  border: '1px solid #c8e6c9',
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
                                onMouseEnter={(e) => e.currentTarget.style.background = '#dcfce7'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#e8f5e9'}
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
                                border: '1px solid #cbd5e1',
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
                                e.currentTarget.style.borderColor = '#136f38';
                                e.currentTarget.style.color = '#136f38';
                                e.currentTarget.style.background = '#f0fdf4';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#cbd5e1';
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
                    <Bot size={15} color="#136f38" />
                    <span>SchemeMitra is formulating verified response...</span>
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
                    onFocus={(e) => e.target.style.borderColor = '#136f38'}
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
                      background: inputText.trim() ? '#136f38' : '#e2e8f0',
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
                  Powered by Government of India Open Data & SamriddhiAI Logic Engine
                </div>
              </div>
            </>
          )}

        </div>
      )}
    </>
  );
}
