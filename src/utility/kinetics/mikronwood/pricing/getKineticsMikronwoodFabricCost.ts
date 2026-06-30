import type { KineticsMikronwoodPricingSchedule } from "../../../../type/pricing/kinetics/kineticsMikronwoodPricingScheduleType";
import { roundMeasurementUp } from "../../../process/measurementUtility";

export function getKineticsMikronwoodFabricCost(
  width: number,
  height: number,
  pricingSchedule: KineticsMikronwoodPricingSchedule,
) {
  if (width <= 0 || height <= 0) return undefined;

  const widthIndex = getWidthIndex(width, pricingSchedule);
  if (typeof widthIndex === "undefined") return undefined;

  const heightIndex = getHeightIndex(height, pricingSchedule);
  if (typeof heightIndex === "undefined") return undefined;

  const price = pricingSchedule.fabric.data[heightIndex][widthIndex];

  return price;
}

// get index is replicated twice in cellular and roller fabric cost...

function getWidthIndex(
  width: number,
  pricingSchedule: KineticsMikronwoodPricingSchedule,
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
  pricingSchedule: KineticsMikronwoodPricingSchedule,
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
