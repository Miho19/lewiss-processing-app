import type { SharePointKineticsCellularPricingType } from "../../../zod/sharePointPricingKineticsCellular";

function roundMeasurementUp(num: number) {
  return Math.ceil(num / 100) * 100;
}

function getKineticsCellularFabricCost(
  width: number,
  height: number,
  opacity: "Translucent" | "Blockout",
  pricingSchedule: SharePointKineticsCellularPricingType,
): number {
  const multiplier =
    opacity === "Translucent" ? 1 : pricingSchedule.blockoutMultiplier;

  const widthAdjusted = roundMeasurementUp(width);
  const widthIndex = pricingSchedule.blind.widthHeader.findIndex(
    (w) => w === widthAdjusted || w === width,
  );

  if (widthIndex === -1) return 0.0;

  const heightAdjusted = roundMeasurementUp(height);
  const heightIndex = pricingSchedule.blind.heightHeader.findIndex(
    (h) => h === heightAdjusted || h === height,
  );

  if (heightIndex === -1) return 0.0;

  const price = pricingSchedule.blind.data[heightIndex][widthIndex];

  return price * multiplier;
}

function getKineticsCellularControlCost(
  control: string,
  pricingSchedule: SharePointKineticsCellularPricingType,
): number {
  if (
    control.localeCompare("lithium-ion", undefined, { sensitivity: "base" }) !==
    0
  )
    return 0;

  return pricingSchedule.motorisation["Lithium-ion"];
}

// this function is sort of incorrect currently 30/05/2026 due to cellular blinds
// not being correctly populated --> no headrail colour
function getKineticsCellularHeadrailCost(
  headrailColour: string,
  pricingSchedule: SharePointKineticsCellularPricingType,
): number {
  if (
    headrailColour.localeCompare("custom", undefined, {
      sensitivity: "base",
    }) !== 0
  )
    return 0;

  return pricingSchedule.headRailCustomColourSurcharge;
}

function getKineticsCellularSideChannelCost(
  height: number,
  sideChannelColour: string,
  pricingSchedule: SharePointKineticsCellularPricingType,
): number {
  if (!height || height <= 0) return 0;

  if (
    sideChannelColour.localeCompare("none", undefined, {
      sensitivity: "base",
    }) === 0 ||
    !sideChannelColour.trim()
  )
    return 0;

  // this is just here until we have a more defined type/zod
  const validColours = ["White", "Black", "Off White", "custom"];
  const adjustedSideChannel = sideChannelColour.trim().toLowerCase();

  const found = validColours.find(
    (c) =>
      c.localeCompare(adjustedSideChannel, undefined, {
        sensitivity: "base",
      }) === 0,
  );
  if (typeof found === "undefined") return 0;

  const heightAdjusted = roundMeasurementUp(height) / 1000;
  const costPerMetreHeight = pricingSchedule.sideChannelCostPerMetreHeight;

  const customSurcharge =
    sideChannelColour.localeCompare("custom", undefined, {
      sensitivity: "base",
    }) === 0
      ? pricingSchedule.sideChannelCustomColourSurcharge
      : 0;

  return heightAdjusted * costPerMetreHeight + customSurcharge;
}

export {
  getKineticsCellularFabricCost,
  getKineticsCellularControlCost,
  getKineticsCellularHeadrailCost,
  getKineticsCellularSideChannelCost,
};
