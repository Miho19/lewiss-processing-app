import type { SharePointKineticsCellularPricingType } from "../../zod/sharePointPricingKineticsCellular";

function roundMeasurement(num: number) {
  return Math.ceil(num / 100) * 100;
}

function getKineticsCellularFabricPrice(
  width: number,
  height: number,
  opacity: "Translucent" | "Blockout",
  pricingSchedule: SharePointKineticsCellularPricingType,
) {
  const multiplier =
    opacity === "Translucent" ? 1 : pricingSchedule.blockoutMultiplier;

  const widthAdjusted = roundMeasurement(width);
  const widthIndex = pricingSchedule.blind.widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );

  if (widthIndex === -1) return 0;

  const heightAdjusted = roundMeasurement(height);
  const heightIndex = pricingSchedule.blind.heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );

  if (heightIndex === -1) return 0;

  const price = pricingSchedule.blind.data[heightIndex][widthIndex];

  return price;
}

export { getKineticsCellularFabricPrice };
