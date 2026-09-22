/**
 * Concessional Loan & Financial Feasibility Calculator
 */

export function calculateEMI(principal, annualRatePercent, tenureYears) {
  if (!principal || principal <= 0 || !tenureYears || tenureYears <= 0) {
    return {
      monthlyEmi: 0,
      totalPayment: 0,
      totalInterest: 0
    };
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const totalMonths = tenureYears * 12;

  if (monthlyRate === 0) {
    const emi = principal / totalMonths;
    return {
      monthlyEmi: Math.round(emi),
      totalPayment: principal,
      totalInterest: 0
    };
  }

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEmi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    totalMonths
  };
}

export function compareLendingOptions(principal, concessionalRate = 6.0, commercialRate = 12.5, tenureYears = 5, subsidyPercent = 0) {
  // If subsidy applies, effective principal reduced
  const subsidyAmount = Math.round((principal * subsidyPercent) / 100);
  const netConcessionalPrincipal = principal - subsidyAmount;

  const concessionalCalc = calculateEMI(netConcessionalPrincipal, concessionalRate, tenureYears);
  const commercialCalc = calculateEMI(principal, commercialRate, tenureYears);

  const monthlySavings = commercialCalc.monthlyEmi - concessionalCalc.monthlyEmi;
  const totalInterestSavings = commercialCalc.totalInterest - concessionalCalc.totalInterest;
  const totalFinancialBenefit = (commercialCalc.totalPayment - concessionalCalc.totalPayment) + subsidyAmount;

  return {
    principal,
    subsidyPercent,
    subsidyAmount,
    netConcessionalPrincipal,
    concessionalRate,
    commercialRate,
    tenureYears,
    concessional: concessionalCalc,
    commercial: commercialCalc,
    monthlySavings,
    totalInterestSavings,
    totalFinancialBenefit
  };
}
