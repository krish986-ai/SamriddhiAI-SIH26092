export const SCHEMES_DATABASE = [
  {
    id: "nsfdc-term-loan",
    title: "NSFDC Term Loan Scheme for SC Entrepreneurs",
    category: "Term Loan & Capital Asset Creation",
    ministry: "Ministry of Social Justice and Empowerment",
    nodalAgency: "National Scheduled Castes Finance & Development Corporation (NSFDC)",
    targetBeneficiaries: ["SC"],
    targetGenders: ["All", "Male", "Female"],
    maxLoanAmount: 5000000, // ₹50 Lakhs
    minLoanAmount: 500000,  // ₹5 Lakhs
    concessionalRate: 6.0, // 6% p.a.
    commercialMarketRate: 12.5,
    tenureYears: 5,
    subsidyPercentage: 20, // margin money / subsidy support
    eligibleSectors: ["Manufacturing", "Services", "Trading", "Agri-allied"],
    incomeLimitUrban: 300000,
    incomeLimitRural: 300000,
    minAge: 18,
    maxAge: 55,
    description: "Concessional term loan assistance to Scheduled Caste entrepreneurs for viable income-generating ventures and setting up micro/small commercial units.",
    keyBenefits: [
      "Subsidized 6% p.a. interest rate for project costs up to ₹50 Lakhs",
      "Moratorium period of 6 to 12 months before EMI starts",
      "Up to 90% of total project cost funded through Channel Partners"
    ],
    requiredDocuments: [
      "Scheduled Caste Certificate issued by competent authority",
      "Income Certificate (Annual family income within norms)",
      "Detailed Project Report (DPR) / Business Feasibility Plan",
      "Aadhaar Card and PAN Card",
      "Land / Rent Agreement of business premises",
      "Bank Account Statement (last 6 months)"
    ],
    channelPartners: [
      "State Channelizing Agencies (SCAs)",
      "Public Sector Banks (PSBs)",
      "Regional Rural Banks (RRBs)"
    ],
    tags: ["High Capital", "Concessional Credit", "Asset Creation", "SC Focused"]
  },
  {
    id: "nsfdc-micro-credit",
    title: "NSFDC Micro-Credit Finance (MCF) Scheme",
    category: "Micro Finance & Working Capital",
    ministry: "Ministry of Social Justice and Empowerment",
    nodalAgency: "NSFDC / State Channelizing Agencies",
    targetBeneficiaries: ["SC"],
    targetGenders: ["All", "Male", "Female"],
    maxLoanAmount: 140000, // ₹1.4 Lakhs
    minLoanAmount: 20000,  // ₹20k
    concessionalRate: 5.0, // 5% p.a.
    commercialMarketRate: 13.0,
    tenureYears: 3,
    subsidyPercentage: 25,
    eligibleSectors: ["Artisan/Handicraft", "Trading", "Services", "Agri-allied"],
    incomeLimitUrban: 300000,
    incomeLimitRural: 300000,
    minAge: 18,
    maxAge: 60,
    description: "Direct quick micro-credit for small business activities, small shopkeepers, artisans, street vendors, and tailoring units belonging to Scheduled Castes.",
    keyBenefits: [
      "Extremely low 5% interest rate directly targeted at grassroots SC entrepreneurs",
      "Minimal paperwork and rapid sanction through SCAs / SHGs",
      "No collateral or heavy security needed"
    ],
    requiredDocuments: [
      "Caste Certificate (SC)",
      "Aadhaar Card / Voter ID",
      "Passport size photographs",
      "Basic trade/skill declaration or SHG membership proof",
      "Bank Passbook copy"
    ],
    channelPartners: [
      "State Channelizing Agencies (SCAs)",
      "Accredited NBFC-MFIs",
      "Self Help Groups (SHGs)"
    ],
    tags: ["Micro Finance", "Instant Approval", "No Collateral", "Grassroots"]
  },
  {
    id: "mahila-samriddhi",
    title: "Mahila Samriddhi Yojana (Exclusive for SC Women)",
    category: "Women Entrepreneurship Micro-Finance",
    ministry: "Ministry of Social Justice and Empowerment",
    nodalAgency: "NSFDC & State Women Development Corporations",
    targetBeneficiaries: ["SC"],
    targetGenders: ["Female"],
    maxLoanAmount: 140000, // ₹1.4 Lakhs
    minLoanAmount: 25000,
    concessionalRate: 4.0, // Super concessional 4% p.a.
    commercialMarketRate: 13.5,
    tenureYears: 3,
    subsidyPercentage: 30,
    eligibleSectors: ["Trading", "Services", "Artisan/Handicraft", "Agri-allied", "Manufacturing"],
    incomeLimitUrban: 300000,
    incomeLimitRural: 300000,
    minAge: 18,
    maxAge: 55,
    description: "Flagship women-centric concessional finance scheme empowering female SC entrepreneurs to establish independent micro-enterprises and artisan units.",
    keyBenefits: [
      "Special concessional rate of only 4% per annum for women",
      "Includes ₹10,000 direct capital grant / margin subsidy",
      "Free entrepreneurship and financial literacy training workshops"
    ],
    requiredDocuments: [
      "Scheduled Caste Certificate (Female applicant)",
      "Income Certificate (Family income within limits)",
      "Aadhaar Card",
      "Bank Account details (in woman's sole name)",
      "Brief list of equipment or inventory to purchase"
    ],
    channelPartners: [
      "State Channelizing Agencies (SCAs)",
      "State Women Development Corporations",
      "Designated Public Sector Banks"
    ],
    tags: ["Women Only", "4% Interest", "High Subsidy", "Empowerment"]
  },
  {
    id: "stand-up-india",
    title: "Stand-Up India Scheme for Greenfield Enterprises",
    category: "Bank Credit & Enterprise Scaling",
    ministry: "Ministry of Finance (SIDBI)",
    nodalAgency: "Scheduled Commercial Banks & Stand-Up Mitra Portal",
    targetBeneficiaries: ["SC", "ST", "Women"],
    targetGenders: ["All", "Male", "Female"],
    maxLoanAmount: 10000000, // ₹1 Crore
    minLoanAmount: 1000000,  // ₹10 Lakhs
    concessionalRate: 7.5,
    commercialMarketRate: 12.0,
    tenureYears: 7,
    subsidyPercentage: 15,
    eligibleSectors: ["Manufacturing", "Services", "Agri-allied", "Trading"],
    incomeLimitUrban: 99999999, // No strict ceiling for greenfield enterprise
    incomeLimitRural: 99999999,
    minAge: 18,
    maxAge: 65,
    description: "Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC/ST borrower and at least one woman borrower per bank branch for greenfield enterprise.",
    keyBenefits: [
      "Substantial capital access up to ₹1 Crore for growth-stage businesses",
      "Covered under Credit Guarantee Scheme for Stand-Up India (CGFSI)",
      "Repayable in 7 years with a moratorium of up to 18 months"
    ],
    requiredDocuments: [
      "Caste Certificate (SC/ST) or Women ownership proof (>51% equity)",
      "Detailed Project Report (DPR) with projected balance sheets",
      "Pollution/NOC clearances (if manufacturing)",
      "Identity and Address Proof (Aadhaar/PAN/Voter ID)",
      "Promoter margin contribution proof (15% project cost)"
    ],
    channelPartners: [
      "All Scheduled Commercial Banks",
      "SIDBI",
      "Lead District Bank Offices"
    ],
    tags: ["High Value", "Greenfield", "Bank Credit", "Long Tenure"]
  },
  {
    id: "pmegp-scheme",
    title: "Prime Minister's Employment Generation Programme (PMEGP)",
    category: "Credit-Linked Capital Subsidy",
    ministry: "Ministry of Micro, Small and Medium Enterprises (MSME)",
    nodalAgency: "Khadi and Village Industries Commission (KVIC) & State DICs",
    targetBeneficiaries: ["SC", "ST", "OBC", "Women", "General"],
    targetGenders: ["All", "Male", "Female"],
    maxLoanAmount: 5000000, // ₹50 Lakhs for manufacturing, ₹20 Lakhs for services
    minLoanAmount: 200000,
    concessionalRate: 8.0,
    commercialMarketRate: 12.0,
    tenureYears: 5,
    subsidyPercentage: 35, // 35% in rural areas for SC/ST/Women, 25% in urban
    eligibleSectors: ["Manufacturing", "Services"],
    incomeLimitUrban: 99999999,
    incomeLimitRural: 99999999,
    minAge: 18,
    maxAge: 60,
    description: "Major credit-linked subsidy scheme offering up to 35% non-refundable government grant for SC/ST and minority entrepreneurs setting up micro-units.",
    keyBenefits: [
      "Highest government capital subsidy: 35% rural, 25% urban for SC/ST applicants",
      "Only 5% beneficiary margin money required (vs 10% for general)",
      "EDP (Entrepreneurship Development Programme) training included"
    ],
    requiredDocuments: [
      "Caste / Category Certificate (Special category subsidy qualification)",
      "8th pass certificate (for projects above ₹10L manufacturing or ₹5L services)",
      "Project Profile / Detailed Cost Estimate",
      "Rural area certificate (from Gram Panchayat) if claiming 35% subsidy",
      "Aadhaar Card, PAN Card, and Bank details"
    ],
    channelPartners: [
      "KVIC / KVIB State Offices",
      "District Industries Centres (DICs)",
      "Public Sector and Co-operative Banks"
    ],
    tags: ["35% Capital Subsidy", "MSME Supported", "High Demand", "Low Margin"]
  },
  {
    id: "pm-mudra-yojana",
    title: "Pradhan Mantri MUDRA Yojana (PMMY)",
    category: "Collateral-Free Micro Credit",
    ministry: "Ministry of Finance",
    nodalAgency: "MUDRA Ltd. & Commercial Banks",
    targetBeneficiaries: ["SC", "ST", "OBC", "General"],
    targetGenders: ["All", "Male", "Female"],
    maxLoanAmount: 1000000, // ₹10 Lakhs (Shishu ₹50k, Kishore ₹5L, Tarun ₹10L)
    minLoanAmount: 30000,
    concessionalRate: 8.5,
    commercialMarketRate: 13.5,
    tenureYears: 4,
    subsidyPercentage: 0,
    eligibleSectors: ["Trading", "Services", "Manufacturing", "Artisan/Handicraft"],
    incomeLimitUrban: 99999999,
    incomeLimitRural: 99999999,
    minAge: 18,
    maxAge: 65,
    description: "Collateral-free loans for non-corporate, non-farm small and micro enterprises categorized into Shishu, Kishore, and Tarun tiers.",
    keyBenefits: [
      "Zero collateral or third-party guarantee required",
      "No processing fees for Shishu and Kishore loans",
      "Mudra Card provided for flexible daily working capital withdrawals"
    ],
    requiredDocuments: [
      "Aadhaar / Voter ID proof",
      "Business establishment / Trade License (if applicable)",
      "Quotations for machinery or stock to be purchased",
      "Bank Account details"
    ],
    channelPartners: [
      "Commercial Banks",
      "Regional Rural Banks (RRBs)",
      "Small Finance Banks (SFBs)",
      "Micro Finance Institutions (MFIs)"
    ],
    tags: ["Collateral-Free", "Working Capital", "Quick Sanction", "Tiered Loans"]
  },
  {
    id: "swachhta-udyami",
    title: "NSFDC Swachhta Udyami Yojana",
    category: "Sanitation & Green Enterprise",
    ministry: "Ministry of Social Justice and Empowerment",
    nodalAgency: "NSFDC",
    targetBeneficiaries: ["SC"],
    targetGenders: ["All", "Male", "Female"],
    maxLoanAmount: 5000000, // ₹50 Lakhs
    minLoanAmount: 500000,
    concessionalRate: 4.0, // 4% for women/safai karamcharis, 6% general SC
    commercialMarketRate: 12.0,
    tenureYears: 7,
    subsidyPercentage: 25,
    eligibleSectors: ["Services", "Manufacturing", "Agri-allied"],
    incomeLimitUrban: 300000,
    incomeLimitRural: 300000,
    minAge: 18,
    maxAge: 55,
    description: "Special concessional scheme for procurement of mechanized sanitation equipment, suction machines, vacuum loaders, and setting up eco-friendly bio-toilets.",
    keyBenefits: [
      "Extremely concessional 4% interest rate for women & sanitation worker families",
      "High subsidy component up to ₹3.25 Lakhs per vehicle/unit",
      "Guaranteed tie-ups with municipal bodies for service contracts"
    ],
    requiredDocuments: [
      "SC Certificate / Safai Karamchari dependent proof",
      "Driving License / Commercial Vehicle permit (if applicable)",
      "Quotation of mechanized equipment from authorized dealer",
      "Income proof & Aadhaar"
    ],
    channelPartners: [
      "State Channelizing Agencies (SCAs)",
      "Urban Local Bodies (ULBs)",
      "State Sanitation Corporations"
    ],
    tags: ["Green Enterprise", "Mechanized Sanitation", "Low 4% Rate", "Subsidized"]
  },
  {
    id: "mosje-educational-loan",
    title: "Educational Loan Scheme (ELAS) - Ministry of Social Justice",
    category: "Higher & Professional Education Concessional Loan",
    ministry: "Ministry of Social Justice and Empowerment",
    nodalAgency: "NSFDC / NBCFDC / State Channelizing Agencies",
    targetBeneficiaries: ["SC", "ST", "OBC"],
    targetGenders: ["All", "Male", "Female"],
    maxLoanAmount: 2000000, // ₹20 Lakhs for India / Abroad
    minLoanAmount: 100000,
    concessionalRate: 4.0, // 4% p.a. for women, 4.5% for others
    commercialMarketRate: 11.5,
    tenureYears: 5,
    subsidyPercentage: 20,
    eligibleSectors: ["Education/Technical", "Services", "Higher Studies"],
    incomeLimitUrban: 300000,
    incomeLimitRural: 300000,
    minAge: 17,
    maxAge: 35,
    description: "Concessional education loan scheme under the Ministry of Social Justice & Empowerment providing up to ₹20 Lakhs for professional, technical, and higher education in India and abroad at subsidized 4%–4.5% interest.",
    keyBenefits: [
      "Subsidized 4% interest rate for female students (4.5% for male)",
      "Covers 100% course tuition fees, books, equipment, and boarding",
      "Moratorium period of Course Duration + 1 full year before repayment begins"
    ],
    requiredDocuments: [
      "Caste Certificate (SC/ST/OBC)",
      "Admission Letter / Offer from recognized University / College",
      "Fee structure signed by institute authorities",
      "10th/12th/Graduation Marksheets",
      "Income Certificate of parents/guardian",
      "Aadhaar Card and Bank Account details"
    ],
    channelPartners: [
      "State Channelizing Agencies (SCAs)",
      "Public Sector Banks",
      "Nationalized Education Loan Cells"
    ],
    tags: ["Education Loan", "MoSJE Scheme", "4% Interest", "Moratorium"]
  }
];

