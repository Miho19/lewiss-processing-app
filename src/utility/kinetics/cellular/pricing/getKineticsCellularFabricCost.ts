import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";
import { roundMeasurementUp } from "../../../process/measurementUtility";

export function getKineticsCellularFabricCost(
  width: number,
  height: number,
  opacity: string,
  pricingSchedule: KineticsCellularPricingSchedule,
): number {
  const opacityOptions = pricingSchedule.fabric.opacity;

  const foundOpacity = opacityOptions.find(
    (o) => o.localeCompare(opacity, undefined, { sensitivity: "base" }) === 0,
  );
  if (typeof foundOpacity === "undefined") return 0;

  const multiplier =
    opacity === "Translucent" ? 1 : pricingSchedule.blockoutMultiplier;

  const widthAdjusted = roundMeasurementUp(width);
  const widthIndex = pricingSchedule.fabric.widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );

  if (widthIndex === -1) return 0.0;

  const heightAdjusted = roundMeasurementUp(height);
  const heightIndex = pricingSchedule.fabric.heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );

  if (heightIndex === -1) return 0.0;

  const price = pricingSchedule.fabric.data[heightIndex][widthIndex];

  return price * multiplier;
}
