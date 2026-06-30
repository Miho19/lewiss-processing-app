import type { KineticsMikronwoodPricingSchedule } from "../../../../type/pricing/kinetics/kineticsMikronwoodPricingScheduleType";

export function getKineticsMikronwoodControlCost(
  control: string,
  pricingSchedule: KineticsMikronwoodPricingSchedule,
): number | undefined {
  if (!isControlValid(control)) return undefined;

  if (!isMotorised(control, pricingSchedule))
    return pricingSchedule.control.cord.base;

  return getMotorisationCost(control, pricingSchedule);
}

function isControlValid(control: string) {
  if (!control) return false;
  if (typeof control === "undefined") return false;
  if (control.trim().length === 0) return false;

  return true;
}

function isMotorised(
  control: string,
  pricingSchedule: KineticsMikronwoodPricingSchedule,
) {
  if (
    control.localeCompare(pricingSchedule.control["cord"].name, undefined, {
      sensitivity: "base",
    }) === 0
  )
    return false;

  return true;
}

function getMotorisationCost(
  control: string,
  pricingSchedule: KineticsMikronwoodPricingSchedule,
): number | undefined {
  const motorisation = pricingSchedule.control.motorisation;

  const controlAdjusted = control.toLowerCase().trim();

  const matchedKey = Object.keys(motorisation).find(
    (m) =>
      m.localeCompare(controlAdjusted, undefined, { sensitivity: "base" }) ===
      0,
  );
  if (typeof matchedKey === "undefined") return undefined;

  const motorisationObject =
    motorisation[matchedKey as keyof typeof motorisation];

  return motorisationObject.base;
}
