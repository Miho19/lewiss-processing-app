import type { LewissFauxwoodVenetianPricingSchedule } from "../../../../../type/pricing/santaFe/lewissFauxwoodVenetianPricingScheduleType";

export async function getLewissFauxwoodFasciaCostAynsc(
  fascia: string,
  pricingSchedule: LewissFauxwoodVenetianPricingSchedule,
) {
  if (!isFasciaValid(fascia)) return 0;
}

function isFasciaValid(fascia: string): boolean {
  if (!fascia || fascia.trim().length === 0) return false;
  return true;
}
