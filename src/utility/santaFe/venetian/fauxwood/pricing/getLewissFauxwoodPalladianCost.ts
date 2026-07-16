import type { SantaFeAccessoriesPricingSchedule } from "../../../../../type/pricing/santaFe/santaFeAccessoriesPricingScheduleType";
import { roundMeasurementUp } from "../../../../process/measurementUtility";

export function getLewissFauxwoodPalladianCost(
  width: number,
  palladianShelf: string,
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
): number | undefined {
  if (!isPalladianValid(palladianShelf)) return 0;

  const colourSurcharge = getPalladianColourSurcharge(
    palladianShelf,
    pricingSchedule,
  );

  if (typeof colourSurcharge === "undefined") return undefined;

  const palladianBase = pricingSchedule.palladianShelf.perM;

  const widthAdjusted = getWidth(width);
  if (typeof widthAdjusted === "undefined") return undefined;

  return palladianBase * widthAdjusted + colourSurcharge;
}

function isPalladianValid(palladian: string) {
  if (!palladian) return false;
  if (palladian.trim().length === 0) return false;

  return true;
}

function getPalladianColourSurcharge(
  palladian: string,
  pricingSchedule: SantaFeAccessoriesPricingSchedule,
): number | undefined {
  const palladianAdjusted = palladian.trim();

  const colourObject = pricingSchedule.palladianShelf.colour.find(
    (colour) =>
      colour.name.localeCompare(palladianAdjusted, undefined, {
        sensitivity: "base",
      }) === 0,
  );

  if (typeof colourObject === "undefined") return undefined;

  return colourObject.surcharge;
}

function getWidth(width: number): number | undefined {
  if (!width || width <= 0) return undefined;
  let widthAdjusted = roundMeasurementUp(width);
  return widthAdjusted / 1000;
}
