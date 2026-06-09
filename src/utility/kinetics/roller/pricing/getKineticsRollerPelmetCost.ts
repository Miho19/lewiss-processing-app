import type { KineticsRollerPricingSchedule } from "../../../../type/pricing/kinetics/kineticsRollerPricingScheduleType";

export function getKineticsRollerPelmetCost(
  width: number,
  pelmet: string,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  if (width <= 0 || width > 5000) return undefined;
  if (pelmet === null || pelmet.trim().length === 0) return 0;

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
  const lookupObject = getPelmetLookupObject(pelmet);
  if (typeof lookupObject === "undefined") return undefined;

  const found = pricingSchedule.pelmet.cost.find(
    (p) => p.name === lookupObject.name,
  );
  if (typeof found === "undefined") return undefined;

  const pelmetCostArray = found[lookupObject.fit as keyof typeof found];

  if (!Array.isArray(pelmetCostArray)) return undefined;

  return pelmetCostArray;
}

function getPelmetLookupObject(
  pelmet: string,
): { name: string; fit: string } | undefined {
  const pelmetSize = getPelmetSize(pelmet);
  const pelmetFit = getPelmetFit(pelmet);

  if (typeof pelmetSize === "undefined" || typeof pelmetFit === "undefined")
    return undefined;

  return { name: `${pelmetSize}mm Pelmet`, fit: pelmetFit };
}

function getPelmetSize(pelmet: string): number | undefined {
  try {
    const pelmetSizeString: string = pelmet.trim().toLowerCase().split(" ")[0];
    const pelmetSize = parseInt(pelmetSizeString);
    return pelmetSize;
  } catch {
    return undefined;
  }
}

function getPelmetFit(pelmet: string): string | undefined {
  const pelmetfit: string = pelmet.trim().toLowerCase().split(" ")[1];

  switch (pelmetfit) {
    case "i/s":
      return "inside";
    case "o/s":
      return "outside";
    default:
      return undefined;
  }
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
