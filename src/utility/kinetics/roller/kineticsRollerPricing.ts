import type { SharePointKineticsRollerPricingType } from "../../../zod/kinetics/sharePointPricingKineticsRoller";
import { roundMeasurementUp } from "../cellular/kineticsCellularPricing";

function getKineticsRollerFabricPrice(
  width: number,
  height: number,
  opacity: string,
  fabricMultiplier: number,
  pricingSchedule: SharePointKineticsRollerPricingType,
): number {
  if (width <= 0 || height <= 0 || fabricMultiplier <= 0) return 0;

  const opacityOptions = pricingSchedule.fabric.opacity;
  const foundOpacity = opacityOptions.find(
    (o) => o.localeCompare(opacity, undefined, { sensitivity: "base" }) === 0,
  );
  if (typeof foundOpacity === "undefined") return 0;

  const widthAdjusted = roundMeasurementUp(width);
  const widthIndex = pricingSchedule.fabric.widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );

  if (widthIndex === -1) return 0;

  const heightAdjusted = roundMeasurementUp(height);
  const heightIndex = pricingSchedule.fabric.heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );

  if (heightIndex === -1) return 0;

  const fabricCost = pricingSchedule.fabric.data[heightIndex][widthIndex];

  return fabricCost * fabricMultiplier;
}

export { getKineticsRollerFabricPrice };
