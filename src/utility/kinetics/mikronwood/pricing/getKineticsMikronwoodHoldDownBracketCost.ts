import type { KineticsMikronwoodPricingSchedule } from "../../../../type/pricing/kinetics/kineticsMikronwoodPricingScheduleType";

export function getKineticsMikronwoodHoldDownBracketCost(
  holdDownBracket: string,
  pricingSchedule: KineticsMikronwoodPricingSchedule,
): number | undefined {
  if (isHoldDownBracketEmpty(holdDownBracket)) return 0;
  if (!isHoldDownBracketValid(holdDownBracket)) return undefined;

  return getHoldDownBracketCost(holdDownBracket, pricingSchedule);
}

function isHoldDownBracketValid(holdDownBracket: string) {
  if (holdDownBracket == null) return false;
  return true;
}

function isHoldDownBracketEmpty(holdDownBracket: string) {
  return holdDownBracket.trim().length === 0;
}

function getHoldDownBracketCost(
  holdDownBracket: string,
  pricingSchedule: KineticsMikronwoodPricingSchedule,
): number | undefined {
  const holdDownBracketObject = pricingSchedule.holdDownBracket;

  if (
    holdDownBracketObject.name.localeCompare(holdDownBracket, undefined, {
      sensitivity: "base",
    }) !== 0
  )
    return undefined;

  return holdDownBracketObject.base;
}
