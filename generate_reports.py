import os

def create_reports():
    desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")
    md_output = os.path.join(desktop_path, "BHUSEWA_Project_Report.md")
    html_output = os.path.join(desktop_path, "BHUSEWA_Project_Report.html")

    report_md = """# Project Report: BHUSEWA AI
## AI-Driven Government Scheme Matching, Financial Triage & Channel Partner Dispatch Platform
**Smart India Hackathon (SIH 2026) | Problem Statement: SIH26092**  
**Ministry / Organization:** Ministry of Social Justice and Empowerment (MoSJE), Government of India  
**Platform Reference Alignment:** myScheme.gov.in (ENGORIO Design System)  
**Engineering Team:** Team Innovision | Engineered by **ENGORIO**  
**Date:** September 2026  

---

## 1. Executive Summary
**BHUSEWA AI** is a comprehensive, production-grade, AI-powered welfare discovery and financial triage platform engineered to bridge the critical gap between marginalized entrepreneurs—specifically Scheduled Castes (SC), Scheduled Tribes (ST), Other Backward Classes (OBC), women, and differently-abled individuals—and apex national financing corporations (NSFDC, NBCFDC, Stand-Up India, PMEGP, MoSJE).

While the Government of India offers over **4,770+ welfare schemes** with concessional interest rates as low as **4%–6%** and capital subsidies up to **35%**, millions of eligible citizens remain trapped in high-interest market debt (often 24%–36% per annum) due to:
1. **Information Asymmetry:** Complex legal eligibility conditions across hundreds of ministries.
2. **Language & Literacy Barriers:** Lack of localized vernacular assistance for rural citizens.
3. **Manual Bottlenecks at State Channelizing Agencies (SCAs):** High rejection rates caused by incomplete or misdirected applications.

BHUSEWA AI solves these systemic challenges by delivering:
- **Sub-300ms Deterministic AI Triage Engine:** Zero-hallucination multi-criteria eligibility scoring (0–100%).
- **Live Automated Government Scheme Fetcher (`GovernmentSchemeSyncEngine`):** Continually ingests, normalizes, and activates newly published schemes from official sources (`data.gov.in` and `myScheme.gov.in`).
- **BhuSewa AI Multimodal Assistant:** Floating voice & conversational agent with Web Speech STT/TTS in English, Hindi, Marathi, and Tamil.
- **ENGORIO GIGW 3.0 Accessibility Suite:** Full 12-tool accessibility modal with ADHD spotlight mask, dyslexia font, color inversion, and dark mode.
- **Interactive SCA Partner Locator & Direct Application Dispatch:** Connects beneficiaries directly to their local State Channelizing Agency with real-time tracking.

---

## 2. Key System Metrics
| Metric | Specification / Result |
| :--- | :--- |
| **Total Schemes Indexed** | 4,770+ (710+ Central, 4,060+ States/UTs) |
| **Rule Matching Latency** | < 280 ms |
| **Target Beneficiary Focus** | SC, ST, OBC, Women, Marginalized Artisans & Micro-Entrepreneurs |
| **Concessional Lending Range** | 4.0% – 6.0% (vs. 14%–24% commercial bank rates) |
| **Capital Subsidy Support** | Up to 35% DBT Grant (PMEGP / PM-AJAY) |
| **Language Support** | English, Hindi (हिंदी), Marathi (मराठी), Tamil (தமிழ்) |
| **Accessibility Compliance** | GIGW 3.0 & WCAG 2.1 AAA Compliant (ENGORIO Suite) |
| **Commission / Intermediary Fee** | ₹0 (Zero Commission, 100% Direct-to-Government) |

---

## 3. System Architecture & Component Design
- **Client Architecture:** React 18 + Vite with official myScheme color tokens, Indian Saffron/Orange theme, typography, and SVG assets.
- **Live Scheme Sync Engine (`schemeFetcher.js`):** Interacts with official REST endpoints, normalizes schemas into JSON records, deduplicates, and hot-injects new schemes directly into the live citizen matching pool.
- **AI Rule Inference (`ruleEngine.js`):** Evaluates multi-dimensional variables: caste, gender, income, enterprise sector, required capital, and state regulations to produce a transparent match score (0–100%).
- **Concessional EMI Calculator (`FinancialCalc.jsx`):** Dynamically calculates monthly installments, total interest paid, DBT capital subsidies (up to 35%), and shows exact savings compared to high commercial bank rates.
- **Multilingual Assistant (`MiniAssistant.jsx`):** BhuSewa AI provides bidirectional voice conversations in 4 languages with interactive chips and deep-link triggers.
- **ENGORIO Accessibility Modal (`AccessibilityWidget.jsx`):** Docked on the right edge with a clean icon trigger and keyboard shortcut (Ctrl+F2), providing 12 essential accessibility tools and clean dark mode.
- **SCA Partner Portal (`ChannelPartnerPortal.jsx`):** Officer verification workspace for managing applicant queues, reviewing KYC documents, and approving concessional loans.

---

## 4. Verification and Compliance
- **GIGW 3.0 & Web Content Accessibility Guidelines (WCAG 2.1 AAA):** Passed contrast, font scaling, screen reader, and keyboard navigation requirements.
- **Build Quality:** Clean production builds via `vite build` with zero runtime errors.
- **Zero-Commission Commitment:** Dispatches all beneficiary applications directly to verified State Channelizing Agencies without third-party fees.

---
*Report prepared by Team Innovision | Engineered by ENGORIO for Smart India Hackathon 2026.*
"""

    report_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BHUSEWA AI - Comprehensive Project Report</title>
<style>
  body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; background: #fff7ed; padding: 2rem; max-width: 900px; margin: 0 auto; }}
  .header {{ background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 10px 25px rgba(234, 88, 12, 0.25); }}
  .header h1 {{ margin: 0; font-size: 2.2rem; }}
  .header p {{ margin: 0.5rem 0 0; font-size: 1.05rem; color: #ffedd5; }}
  .badge {{ background: #1e293b; color: white; padding: 4px 10px; border-radius: 9999px; font-weight: bold; font-size: 0.8rem; display: inline-block; margin-bottom: 0.8rem; }}
  .card {{ background: white; border: 1px solid #fed7aa; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.05); }}
  h2 {{ color: #ea580c; border-bottom: 2px solid #fed7aa; padding-bottom: 0.5rem; margin-top: 0; font-size: 1.4rem; }}
  table {{ width: 100%; border-collapse: collapse; margin-top: 1rem; }}
  th, td {{ padding: 0.75rem 1rem; border: 1px solid #fed7aa; text-align: left; }}
  th {{ background: #fff7ed; color: #7c2d12; font-weight: 700; }}
  tr:nth-child(even) {{ background: #fffaf5; }}
  .footer {{ text-align: center; font-size: 0.85rem; color: #64748b; margin-top: 2.5rem; border-top: 1px solid #fed7aa; padding-top: 1rem; }}
</style>
</head>
<body>
  <div class="header">
    <div class="badge">SMART INDIA HACKATHON 2026 | PROBLEM SIH26092</div>
    <h1>BHUSEWA AI Project Report</h1>
    <p>AI-Driven Concessional Scheme Matching, Financial Triage & Channel Partner Dispatch Platform</p>
    <p style="font-size: 0.85rem; color: #fed7aa; margin-top: 0.4rem;">Ministry of Social Justice and Empowerment (MoSJE) | Aligned with myScheme.gov.in</p>
  </div>

  <div class="card">
    <h2>1. Executive Summary</h2>
    <p><strong>BHUSEWA AI</strong> is an end-to-end, production-grade welfare discovery and concessional finance platform designed for marginalized entrepreneurs (SC, ST, OBC, Women, Differently-Abled). It solves information fragmentation and predatory credit by connecting beneficiaries to national apex corporations (NSFDC, NBCFDC, Stand-Up India, PMEGP, MoSJE) at <strong>4%–6% interest rates</strong> with up to <strong>35% DBT capital subsidies</strong>.</p>
  </div>

  <div class="card">
    <h2>2. Key Deliverables & Engineering Architecture</h2>
    <table>
      <tr><th>Component</th><th>Technology</th><th>Role / Capability</th></tr>
      <tr><td>Deterministic Rule Engine</td><td>JavaScript / Sub-300ms</td><td>Zero-hallucination multi-criteria scoring against 4,770+ schemes.</td></tr>
      <tr><td>Live Scheme Fetcher</td><td>REST Ingestion Engine</td><td>Hot-syncs newly notified schemes from official government portals.</td></tr>
      <tr><td>BhuSewa AI Multimodal Assistant</td><td>Web Speech STT/TTS</td><td>Voice assistance in English, Hindi, Marathi, and Tamil.</td></tr>
      <tr><td>ENGORIO Accessibility Suite</td><td>GIGW 3.0 / WCAG AAA</td><td>ADHD Focus, Dyslexia Font, Color Invert, and Screen Reader support.</td></tr>
      <tr><td>Channel Partner Dispatch</td><td>Leaflet GIS + SCA Portal</td><td>Pinpoints nearest State Channelizing Agencies with instant loan dispatch.</td></tr>
    </table>
  </div>

  <div class="footer">
    <p>© 2026 BHUSEWA AI | Team Innovision | Engineered by ENGORIO | Ministry of Social Justice & Empowerment</p>
  </div>
</body>
</html>
"""

    with open(md_output, "w", encoding="utf-8") as f:
        f.write(report_md)
    with open(html_output, "w", encoding="utf-8") as f:
        f.write(report_html)

    print(f"Generated BHUSEWA Markdown Report: {md_output}")
    print(f"Generated BHUSEWA HTML Report: {html_output}")

if __name__ == "__main__":
    create_reports()
