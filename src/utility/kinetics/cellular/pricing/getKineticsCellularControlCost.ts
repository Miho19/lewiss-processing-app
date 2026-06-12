import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";

export function getKineticsCellularControlCost(
  control: string,
  pricingSchedule: KineticsCellularPricingSchedule,
): number | undefined {
  if (!isControlValid(control, pricingSchedule)) return undefined;

  if (!isKineticsCellularBlindMotorised(control)) return 0;
  return pricingSchedule.control.motorisation["Lithium-ion"].base;
}

function isControlValid(
  control: string,
  pricingSchedule: KineticsCellularPricingSchedule,
) {
  if (!control) return false;
  if (typeof control === "undefined") return false;
  if (control.trim().length === 0) return false;

  const controlAdjusted = control.trim().toLowerCase();
  if (controlAdjusted === "cord") return true;

  if (isKineticsCellularBlindMotorised(control)) return true;

  return false;
}

export function isKineticsCellularBlindMotorised(control: string): boolean {
  return (
    control.localeCompare("lithium-ion", undefined, { sensitivity: "base" }) ===
    0
  );
}
