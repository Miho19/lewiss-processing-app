import type { SantaFeAccessoriesPricingSchedule } from "../../../../../type/pricing/santaFe/santaFeAccessoriesPricingScheduleType";

export function getLewissFauxwoodCutOutCost(
  cutout: boolean,
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
): number | undefined {
  if (!cutout) return 0;

  const cutoutCost = pricingSchedule.cutOut.base;
  return cutoutCost;
}
