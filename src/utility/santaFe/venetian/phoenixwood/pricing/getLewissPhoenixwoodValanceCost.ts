import type { SantaFeAccessoriesPricingSchedule } from "../../../../../type/pricing/santaFe/santaFeAccessoriesPricingScheduleType";

export function getLewissPhoenixwoodValanceCost(
  valance: string,
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
) {
  if (!isValanceValid(valance)) return 0;
  if (!isValidValanceOption(valance, pricingSchedule)) return undefined;

  const valanceCost = pricingSchedule.valance.base;
  return valanceCost;
}

// for future development, currently the pricing schedule does not include the valid valance options
function isValidValanceOption(
  valance: string,
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
): boolean {
  return true;
}

function isValanceValid(valance: string): boolean {
  if (!valance || valance.trim().length === 0) return false;
  return true;
}
