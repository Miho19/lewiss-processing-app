import type { KineticsMikronwoodPricingSchedule } from "../../../../type/pricing/kinetics/kineticsMikronwoodPricingScheduleType";

export function getKineticsMikronwoodFasciaCost(
  fascia: string,
  pricingSchedule: KineticsMikronwoodPricingSchedule,
): number | undefined {
  if (!isFasciaValid(fascia)) return undefined;
  if (isFasciaEmpty(fascia)) return 0;

  return getFasciaCost(fascia, pricingSchedule);
}

function isFasciaValid(fascia: string): boolean {
  if (fascia == null) return false;
  return true;
}

function isFasciaEmpty(fascia: string) {
  return fascia.trim().length === 0;
}

function getFasciaCost(
  fascia: string,
  pricingSchedule: KineticsMikronwoodPricingSchedule,
): number | undefined {
  const fasciaObject = pricingSchedule.fascia;

  const matchedKey = Object.keys(fasciaObject).find(
    (f) => f.localeCompare(fascia, undefined, { sensitivity: "base" }) === 0,
  );
  if (typeof matchedKey === "undefined") return undefined;

  return fasciaObject[matchedKey as keyof typeof fasciaObject].base;
}
