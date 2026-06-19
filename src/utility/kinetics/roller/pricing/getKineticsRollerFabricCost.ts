import type {
  KineticsRollerFabricOpacity,
  KineticsRollerPricingSchedule,
} from "../../../../type/pricing/kinetics/kineticsRollerPricingScheduleType";
import { roundMeasurementUp } from "../../../process/measurementUtility";

export function getKineticsRollerFabricCost(
  width: number,
  height: number,
  opacity: KineticsRollerFabricOpacity,
  fabricMultiplier: number,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  if (width <= 0 || height <= 0 || fabricMultiplier <= 0) return undefined;

  if (!isOpacityValid(opacity, pricingSchedule)) return undefined;

  const heightIndex = getHeightIndex(height, pricingSchedule);
  if (typeof heightIndex === "undefined") return undefined;

  const widthIndex = getWidthIndex(width, pricingSchedule);
  if (typeof widthIndex === "undefined") return undefined;

  const fabricCost = pricingSchedule.fabric.data[heightIndex][widthIndex];

  return fabricCost * fabricMultiplier;
}

function isOpacityValid(
  opacity: KineticsRollerFabricOpacity,
  pricingSchedule: KineticsRollerPricingSchedule,
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

function getWidthIndex(
  width: number,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  let widthAdjusted = roundMeasurementUp(width);
  const minimumWidth = pricingSchedule.fabric.widthHeader[0];
  if (widthAdjusted < minimumWidth) widthAdjusted = minimumWidth;

  const widthIndex = pricingSchedule.fabric.widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );
  if (widthIndex === -1) return undefined;
  return widthIndex;
}
function getHeightIndex(
  height: number,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  let heightAdjusted = roundMeasurementUp(height);

  const minimumHeight = pricingSchedule.fabric.heightHeader[0];
  if (heightAdjusted < minimumHeight) heightAdjusted = minimumHeight;

  const heightIndex = pricingSchedule.fabric.heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );

  if (heightIndex === -1) return undefined;

  return heightIndex;
}
