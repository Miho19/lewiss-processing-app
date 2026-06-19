import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";
import { roundMeasurementUp } from "../../../process/measurementUtility";

export function getKineticsCellularFabricCost(
  width: number,
  height: number,
  opacity: string,
  pricingSchedule: KineticsCellularPricingSchedule,
): number | undefined {
  if (width <= 0 || height <= 0) return undefined;
  if (!isOpacityValid(opacity, pricingSchedule)) return undefined;

  const multiplier = getMultiplier(opacity, pricingSchedule);

  const widthIndex = getWidthIndex(width, pricingSchedule);
  if (typeof widthIndex === "undefined") return undefined;

  const heightIndex = getHeightIndex(height, pricingSchedule);
  if (typeof heightIndex === "undefined") return undefined;

  const price = pricingSchedule.fabric.data[heightIndex][widthIndex];

  return price * multiplier;
}

function isOpacityValid(
  opacity: string,
  pricingSchedule: KineticsCellularPricingSchedule,
): boolean {
  if (!opacity || typeof opacity === "undefined") return false;

  const opacityAdjusted = opacity.toLocaleLowerCase().trim();

  const opacityOptions = pricingSchedule.fabric.opacity;

  const foundOpacity = opacityOptions.find(
    (o) =>
      o.localeCompare(opacityAdjusted, undefined, { sensitivity: "base" }) ===
      0,
  );
  if (typeof foundOpacity === "undefined") return false;

  return true;
}

function getMultiplier(
  opacity: string,
  pricingSchedule: KineticsCellularPricingSchedule,
) {
  return opacity.toLocaleLowerCase() === "translucent"
    ? 1
    : pricingSchedule.blockoutMultiplier;
}

function getWidthIndex(
  width: number,
  pricingSchedule: KineticsCellularPricingSchedule,
): number | undefined {
  let widthAdjusted = roundMeasurementUp(width);

  const minimumFabricWidth = pricingSchedule.fabric.widthHeader[0];
  if (widthAdjusted < minimumFabricWidth) widthAdjusted = minimumFabricWidth;

  const widthIndex = pricingSchedule.fabric.widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );

  if (widthIndex === -1) return undefined;

  return widthIndex;
}

function getHeightIndex(
  height: number,
  pricingSchedule: KineticsCellularPricingSchedule,
) {
  let heightAdjusted = roundMeasurementUp(height);
  const minimumFabricHeight = pricingSchedule.fabric.heightHeader[0];
  if (heightAdjusted < minimumFabricHeight)
    heightAdjusted = minimumFabricHeight;

  const heightIndex = pricingSchedule.fabric.heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );

  if (heightIndex === -1) return undefined;

  return heightIndex;
}
