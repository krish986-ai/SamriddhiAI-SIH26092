import { SCHEMES_DATABASE } from "../data/schemes";
import { GovernmentSchemeSyncEngine } from "./schemeFetcher";

/**
 * AI & Rule-Based Recommendation Engine for Marginalised Entrepreneurs
 * Evaluates demographic, financial, and sector profile against scheme rules.
 */
export function evaluateSchemes(userProfile, customSchemesList = null) {
  const {
    casteCategory = "SC",
    gender = "Male",
    age = 28,
    annualIncome = 240000,
    businessSector = "Manufacturing",
    loanRequired = 1000000,
    hasCasteCertificate = true,
    education = "12th Pass",
    isRural = false
  } = userProfile;

  const schemesToEvaluate = customSchemesList || GovernmentSchemeSyncEngine.getActiveSchemes() || SCHEMES_DATABASE;

  const results = schemesToEvaluate.map((scheme) => {
    let score = 50; // base score
    const qualificationReasons = [];
    const gaps = [];

    // 1. Social Category Verification
    if (scheme.targetBeneficiaries.includes(casteCategory)) {
      score += 25;
      qualificationReasons.push(`Eligible under reserved target group (${casteCategory} category).`);
    } else if (scheme.targetBeneficiaries.includes("All") || scheme.targetBeneficiaries.includes("General")) {
      score += 10;
      qualificationReasons.push(`Open to all categories including ${casteCategory}.`);
    } else {
      score -= 40;
      gaps.push(`Scheme specifically targets ${scheme.targetBeneficiaries.join("/")} beneficiaries.`);
    }

    // 2. Gender specific rules (e.g. Mahila Samriddhi)
    if (scheme.targetGenders.includes("Female") && scheme.targetGenders.length === 1) {
      if (gender === "Female") {
        score += 20;
        qualificationReasons.push("Exclusive women entrepreneur priority quota and subsidized 4% rate.");
      } else {
        score -= 50;
        gaps.push("Scheme is exclusively reserved for women entrepreneurs.");
      }
    } else {
      if (gender === "Female") {
        score += 5; // extra points for women inclusion
        qualificationReasons.push("Women applicants receive priority channel allotment.");
      }
    }

    // 3. Loan Amount Bracket Fit
    if (loanRequired >= scheme.minLoanAmount && loanRequired <= scheme.maxLoanAmount) {
      score += 20;
      qualificationReasons.push(
        `Requested loan ₹${(loanRequired / 100000).toFixed(1)}L perfectly fits scheme limits (₹${(scheme.minLoanAmount / 100000).toFixed(1)}L - ₹${(scheme.maxLoanAmount / 100000).toFixed(1)}L).`
      );
    } else if (loanRequired < scheme.minLoanAmount) {
      score -= 20;
      gaps.push(`Requested loan amount (₹${loanRequired}) is below scheme minimum threshold (₹${scheme.minLoanAmount}).`);
    } else {
      score -= 30;
      gaps.push(
        `Requested loan (₹${(loanRequired / 100000).toFixed(1)}L) exceeds maximum scheme ceiling (₹${(scheme.maxLoanAmount / 100000).toFixed(1)}L).`
      );
    }

    // 4. Sector Suitability
    if (scheme.eligibleSectors.includes(businessSector) || scheme.eligibleSectors.includes("All")) {
      score += 15;
      qualificationReasons.push(`${businessSector} sector is classified as priority enterprise area.`);
    } else {
      score -= 20;
      gaps.push(`Business sector (${businessSector}) is outside primary scheme focus (${scheme.eligibleSectors.join(", ")}).`);
    }

    // 5. Income Threshold Rules
    const incomeLimit = isRural ? scheme.incomeLimitRural : scheme.incomeLimitUrban;
    if (incomeLimit > 0) {
      if (annualIncome <= incomeLimit) {
        score += 15;
        qualificationReasons.push(
          `Annual household income (₹${(annualIncome / 100000).toFixed(1)}L) is within concessional eligibility limit (≤ ₹${(incomeLimit / 100000).toFixed(1)}L).`
        );
      } else {
        score -= 25;
        gaps.push(
          `Household income (₹${(annualIncome / 100000).toFixed(1)}L) exceeds income ceiling (₹${(incomeLimit / 100000).toFixed(1)}L).`
        );
      }
    }

    // 6. Age Rules
    if (age >= scheme.minAge && age <= scheme.maxAge) {
      score += 5;
    } else {
      score -= 15;
      gaps.push(`Applicant age (${age}) is outside valid age bracket (${scheme.minAge}-${scheme.maxAge} years).`);
    }

    // 7. Mandatory Caste Certificate Verification
    if (!hasCasteCertificate && (casteCategory === "SC" || casteCategory === "ST" || casteCategory === "OBC")) {
      score -= 30;
      gaps.push("Valid digital caste certificate required for State Channelizing Agency sanction.");
    }

    // Bound score between 10% and 99%
    const finalScore = Math.max(10, Math.min(99, score));

    return {
      ...scheme,
      matchScore: finalScore,
      qualificationReasons,
      gaps,
      isHighlyRecommended: finalScore >= 80
    };
  });

  // Sort by highest match score first
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
