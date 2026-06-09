import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";

export function getKineticsCellularHeadrailCost(
  headrailColour: string,
  pricingSchedule: KineticsCellularPricingSchedule,
): number {
  if (
    headrailColour.localeCompare("custom", undefined, {
      sensitivity: "base",
    }) !== 0
  )
    return 0;

  return pricingSchedule.headRailCustomColourSurcharge;
}
