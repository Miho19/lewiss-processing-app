import type { KineticsRollerPricingSchedule } from "../../../../type/pricing/kinetics/kineticsRollerPricingScheduleType";

export function getKineticsRollerPelmetCost(
  width: number,
  pelmet: string,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  if (width <= 0 || width > 5000) return undefined;
  if (typeof pelmet === "undefined") return 0;
  if (pelmet == null) return 0;
  if (pelmet.trim().length === 0) return 0;

  const pelmetCostArray = getPelmetCostArray(pelmet, pricingSchedule);
  if (typeof pelmetCostArray === "undefined") return undefined;

  const widthIndex = getPelmetWidthArrayIndex(width, pricingSchedule);

  if (typeof widthIndex === "undefined") return undefined;

  return pelmetCostArray[widthIndex];
}

function getPelmetCostArray(
  pelmet: string,
  pricingSchedule: KineticsRollerPricingSchedule,
): number[] | undefined {
  const pelmetLookup = destructurePelmetString(pelmet);
  if (typeof pelmetLookup === "undefined") return undefined;

  const { size, fit } = pelmetLookup;

  const found = pricingSchedule.pelmet.cost.find(
    (p) => p.size === size.toString(),
  );

  if (typeof found === "undefined") return undefined;

  const pelmetCostArray = found[fit as keyof typeof found];

  if (!Array.isArray(pelmetCostArray)) return undefined;

  return pelmetCostArray;
}

function destructurePelmetString(
  pelmet: string,
): { size: number; fit: string } | undefined {
  const pelmetSize = getPelmetSize(pelmet);
  const pelmetFit = getPelmetFit(pelmet);

  if (typeof pelmetSize === "undefined" || typeof pelmetFit === "undefined")
    return undefined;

  return { size: pelmetSize, fit: pelmetFit };
}

function getPelmetSize(pelmet: string): number | undefined {
  try {
    const pelmetSizeString: string = pelmet.toLowerCase().split("-")[0].trim();
    const pelmetSize = parseInt(pelmetSizeString);
    return pelmetSize;
  } catch {
    return undefined;
  }
}

function getPelmetFit(pelmet: string): string | undefined {
  const pelmetfit: string = pelmet.split("-")[1].trim();
  const validFitList = ["Inside", "Outside"];
  if (!validFitList.includes(pelmetfit)) return undefined;
  return pelmetfit.toLowerCase();
}

function getPelmetAdjustedWidth(width: number): number {
  if (width < 1000) return 1000;
  return Math.ceil(width / 250) * 250;
}

function getPelmetWidthArrayIndex(
  width: number,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  const widthAdjusted = getPelmetAdjustedWidth(width);

  const pelmetCostWidthArray = pricingSchedule.pelmet.width;

  const index = pelmetCostWidthArray.findIndex(
    (w) => w === widthAdjusted || w === width,
  );
  if (index === -1) return undefined;
  return index;
}
