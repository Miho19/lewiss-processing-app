import type { LewissPhoenixwoodVenetianPricingSchedule } from "../../../../../type/pricing/santaFe/lewissPhoenixwoodVenetianPricingScheduleType";
import { roundMeasurementUp } from "../../../../process/measurementUtility";

export function getLewissPhoenixwoodFasciaCost(
  width: number,
  fascia: string,
  pricingSchedule: LewissPhoenixwoodVenetianPricingSchedule,
) {
  if (!isWidthValid(width)) return undefined;
  if (!isFasciaValid(fascia)) return 0;

  const widthAdjusted = getWidth(width, pricingSchedule);
  if (typeof widthAdjusted === "undefined") return undefined;

  const fasciaCostPerMetre = pricingSchedule.fascia.perM;

  return fasciaCostPerMetre * widthAdjusted;
}

function isFasciaValid(fascia: string): boolean {
  if (!fascia || fascia.trim().length === 0) return false;
  return true;
}

function isWidthValid(width: number): boolean {
  if (!width) return false;
  if (width <= 0) return false;
  return true;
}

function getWidth(
  width: number,
  pricingSchedule: LewissPhoenixwoodVenetianPricingSchedule,
): number | undefined {
  let widthAdjusted = roundMeasurementUp(width);

  const widthHeader = pricingSchedule.fabric.widthHeader;

  const miniumWidth = widthHeader[0];
  const maximumWidth = widthHeader.at(-1);

  if (widthAdjusted < miniumWidth) widthAdjusted = miniumWidth;

  if (typeof maximumWidth === "undefined") return undefined;
  if (widthAdjusted > maximumWidth) return undefined;

  const index = widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );
  if (index === -1) return undefined;

  return widthAdjusted / 1000;
}
