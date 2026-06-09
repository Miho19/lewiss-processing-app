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

  const opacityOptions = pricingSchedule.fabric.opacity;
  const foundOpacity = opacityOptions.find(
    (o) => o.localeCompare(opacity, undefined, { sensitivity: "base" }) === 0,
  );
  if (typeof foundOpacity === "undefined") return undefined;

  const widthAdjusted = roundMeasurementUp(width);
  const widthIndex = pricingSchedule.fabric.widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );

  if (widthIndex === -1) return undefined;

  const heightAdjusted = roundMeasurementUp(height);
  const heightIndex = pricingSchedule.fabric.heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );

  if (heightIndex === -1) return undefined;

  const fabricCost = pricingSchedule.fabric.data[heightIndex][widthIndex];

  return fabricCost * fabricMultiplier;
}
