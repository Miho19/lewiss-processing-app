import type { SantaFeAccessoriesPricingSchedule } from "../../../../../type/pricing/santaFe/santaFeAccessoriesPricingScheduleType";

export function getLewissFauxwoodSpacerBlockCost(
  spacerBlock: boolean,
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
): number | undefined {
  if (!spacerBlock) return 0;
  const cost = pricingSchedule.spacerBlock.base;

  return cost;
}
