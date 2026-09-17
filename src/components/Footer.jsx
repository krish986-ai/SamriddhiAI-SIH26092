import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, ShieldCheck, Mail, Phone, MapPin, Globe, Award } from 'lucide-react';

export default function Footer() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What is BHUSEWA AI on myScheme.gov.in?",
      a: "BHUSEWA is an official AI-driven scheme discovery and State Channelizing Agency (SCA) triage platform engineered for Smart India Hackathon (SIH26092, Team Innovision). It deterministically matches SC, ST, OBC, and women micro-entrepreneurs to concessional credit schemes (4%–6% interest) and routes them directly to accredited State Channelizing Agencies."
    },
    {
      q: "Are there any service charges or agent fees for applying?",
      a: "No. All schemes on BHUSEWA are 100% free of charge. The Government of India and apex corporations (NSFDC, NBCFDC, NSKFDC) strictly operate with zero intermediary commission fees."
    },
    {
      q: "How does the AI Rule Engine prevent misrouted applications?",
      a: "The platform pre-screens income ceilings, caste certifications, enterprise sector eligibility, and geographic SCA jurisdiction before application dispatch, eliminating application rejection and misrouting."
    }
  ];

  return (
    <footer style={{ background: '#1e2238', color: '#e2e8f0', marginTop: '4rem', borderTop: '4px solid #ea580c' }}>
      
      {/* 1. FAQs & Citizen Support Bar */}
      <div style={{ background: '#252b48', padding: '2rem 0', borderBottom: '1px solid #333a60' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Frequently Asked Questions</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    background: '#1e2238',
                    border: '1px solid #373e68',
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.86rem', color: '#f8fafc' }}>
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} color="#ea580c" /> : <ChevronDown size={16} color="#94a3b8" />}
                  </div>
                  {isOpen && (
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem', lineHeight: 1.5, borderTop: '1px solid #2d3356', paddingTop: '0.5rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Government Links & Info Directory */}
      <div className="container" style={{ padding: '3rem 1.25rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          {/* Col 1: Brand & Ministry */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>
                BHU<span style={{ color: '#ea580c' }}>SEWA</span>
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffffff', background: '#ea580c', padding: '2px 6px', borderRadius: '4px' }}>
                AI
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              National Platform for Government Scheme Discovery and Channel Partner Triage. Engineered for Smart India Hackathon (SIH26092) by Team Innovision in alignment with Ministry of Social Justice and Empowerment.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#fb923c', background: '#2c1810', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #9a3412' }}>
              <ShieldCheck size={16} />
              <span>GIGW 3.0 & STQC Certified Architecture</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.84rem', color: '#94a3b8' }}>
              <li><a href="#" style={{ color: 'inherit', transition: 'color 0.15s' }}>About BHUSEWA</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Concessional Lending Guidelines</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>NSFDC & NBCFDC Apex Directory</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>State Channelizing Agencies (SCAs)</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Grievance Redressal (CPGRAMS)</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Citizen Charter & SLAs</a></li>
            </ul>
          </div>

          {/* Col 3: Useful Government Portals */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Government Portals
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.84rem', color: '#94a3b8' }}>
              <li><a href="https://www.india.gov.in" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>National Portal of India <ExternalLink size={12} /></a></li>
              <li><a href="https://www.digilocker.gov.in" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>DigiLocker <ExternalLink size={12} /></a></li>
              <li><a href="https://web.umang.gov.in" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>UMANG Unified App <ExternalLink size={12} /></a></li>
              <li><a href="https://www.mygov.in" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>MyGov Platform <ExternalLink size={12} /></a></li>
              <li><a href="https://data.gov.in" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>Open Government Data (OGD) <ExternalLink size={12} /></a></li>
            </ul>
          </div>

          {/* Col 4: Helpdesk & Contacts */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Helpdesk & Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} color="#ea580c" />
                <span>Toll Free: <strong>1800-11-2026</strong> (9 AM - 6 PM)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} color="#ea580c" />
                <span>support-bhusewa@myscheme.gov.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={15} color="#ea580c" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Digital India Corporation, Electronics Niketan, 6 CGO Complex, New Delhi - 110003</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Bottom Legal & Copyright Bar */}
        <div style={{
          borderTop: '1px solid #333a60',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.76rem',
          color: '#64748b'
        }}>
          <div>
            © 2026 <strong>BHUSEWA AI</strong>. All Rights Reserved. Engineered by <strong>ENGORIO</strong> for Team Innovision (SIH26092).
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Last Updated: 17-Sep-2026</span>
            <span>•</span>
            <span>Build v2.6.5</span>
            <span>•</span>
            <span style={{ color: '#ea580c', fontWeight: 700 }}>● Server Online</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
