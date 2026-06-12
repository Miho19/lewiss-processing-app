import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";

export function getKineticsCellularHeadrailCost(
  headrailColour: string,
  pricingSchedule: KineticsCellularPricingSchedule,
): number | undefined {
  if (!isHeadrailValid(headrailColour)) return undefined;

  if (
    headrailColour.localeCompare("custom", undefined, {
      sensitivity: "base",
    }) !== 0
  )
    return 0;

  return pricingSchedule.headRailCustomColourSurcharge;
}

function isHeadrailValid(headrailColour: string) {
  if (!headrailColour) return false;
  if (typeof headrailColour === "undefined") return false;
  if (headrailColour.trim().length === 0) return false;
  return true;
}
