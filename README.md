# BHUSEWA AI - AI-Driven Scheme Matching Platform
**Smart India Hackathon 2026 (SIH 2026) | Problem Statement: SIH26092**  
**Ministry Alignment:** Ministry of Social Justice and Empowerment (MoSJE) & myScheme.gov.in  
**Engineering Team:** Team Innovision | Engineered by **ENGORIO**  
**🌐 Live Production Deployment:** [https://sih-scheme-matching.vercel.app](https://sih-scheme-matching.vercel.app)  

---

## Overview
**BHUSEWA AI** is a next-generation, AI-driven welfare discovery, concessional financial matching, and State Channelizing Agency (SCA) dispatch platform. Designed specifically for marginalized micro-entrepreneurs (SC, ST, OBC, Women, and Artisans), it provides affirmative access to concessional lending (4%–6% APR) and capital subsidies (up to 35% DBT) across 4,770+ central and state schemes.

---

## Key Features (SIH26092 Specification)

1. **Official Indian Saffron & Warm Orange Design System**:
   - Official logos (National Emblem of India, Digital India, BHUSEWA), color tokens, and layout.
   - 3 Statistics cards (4,770+ Total, 710+ Central, 4,060+ State/UTs schemes).
   - 6-Column Category Navigation Grid and 3-step end-to-end application workflow.

2. **Automated Government Scheme Ingestion Pipeline (`GovernmentSchemeSyncEngine`)**:
   - Automated REST synchronization with `data.gov.in` and `api.myscheme.gov.in`.
   - Intelligent schema normalization, deduplication, and hot-reload state injection.
   - Pre-loaded live synced schemes: *PM-AJAY Capital Grant (4.5%)* and *NBCFDC Green Business Loan (4.0%)*.

3. **ENGORIO GIGW 3.0 Accessibility Suite**:
   - Floating universal accessibility icon docked on the right screen edge with `Ctrl+F2` keyboard trigger.
   - 12 assistive tools (Bigger/Smaller Text, Text Spacing, Line Height, Dyslexia Font, ADHD Focus Spotlight, Saturation, Invert Colors, Link Highlights, Large Cursor, Animation Pauser, Image Hiding).
   - High-contrast, polished Dark Mode (`#0b1120` canvas, inverted emblems, warm saffron accents).

4. **BhuSewa AI Multimodal Assistant**:
   - Floating conversational assistant with Web Speech Recognition (STT) and Speech Synthesis (TTS).
   - Instant answers in **English**, **हिंदी (Hindi)**, **मराठी (Marathi)**, and **தமிழ் (Tamil)**.

5. **Deterministic AI Triage & Rule Engine**:
   - Evaluates multi-dimensional criteria (caste, income, gender, age, project budget, state).
   - Computes match percentages (0–100%) in sub-300ms with zero hallucination.

6. **Dynamic Concessional EMI & Feasibility Calculator**:
   - Compares 4%–6% apex loans vs 14% commercial rates, displaying exact monthly and lifetime Lakhs saved.
   - Computes upfront DBT capital subsidies (up to 35%) under PMEGP.

7. **Geo-Spatial SCA Partner Locator & Tracking**:
   - Interactive Leaflet map covering State Channelizing Agencies across 36 States & UTs.
   - 1-click application dispatch with transparent stage tracking (`Submitted -> Verification -> Sanction -> Disbursed`).

---

## Quick Start

### Installation & Local Dev
```bash
# Clone the repository
git clone https://github.com/krish986-ai/SamriddhiAI-SIH26092.git
cd SamriddhiAI-SIH26092

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## Tech Stack
- **Frontend**: React 19, Vite 8.3, Vanilla CSS Design System (Orange Theme)
- **Icons & UI**: Lucide React, Leaflet Maps
- **Voice AI**: Web Speech API (STT / TTS)
- **Accessibility**: ENGORIO Suite (WCAG 2.1 AAA & GIGW 3.0 compliant)
- **Ingestion**: Asynchronous REST ETL Engine & JSON Schema Normalizer

---
*Built with pride for Smart India Hackathon 2026 by Team Innovision (ENGORIO).*
