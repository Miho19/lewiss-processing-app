import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";

export function getKineticsCellularControlCost(
  control: string,
  pricingSchedule: KineticsCellularPricingSchedule,
): number {
  if (
    control.localeCompare("lithium-ion", undefined, { sensitivity: "base" }) !==
    0
  )
    return 0;

  return pricingSchedule.control.motorisation["Lithium-ion"].base;
}
