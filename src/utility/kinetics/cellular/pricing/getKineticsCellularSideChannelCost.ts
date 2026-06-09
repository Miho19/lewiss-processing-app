import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";
import { roundMeasurementUp } from "../../../process/measurementUtility";

export function getKineticsCellularSideChannelCost(
  height: number,
  sideChannelColour: string,
  pricingSchedule: KineticsCellularPricingSchedule,
): number {
  if (!height || height <= 0) return 0;

  if (
    sideChannelColour.localeCompare("none", undefined, {
      sensitivity: "base",
    }) === 0 ||
    !sideChannelColour.trim()
  )
    return 0;

  if (!isSideChannelColourAValidOption(sideChannelColour)) return 0;

  const costPerHeightMetre = getCostPerMetreHeight(height, pricingSchedule);

  const customSurcharge = getCustomColourSurcharge(
    sideChannelColour,
    pricingSchedule,
  );

  return costPerHeightMetre + customSurcharge;
}

function isSideChannelColourAValidOption(sideChannelColour: string) {
  // this is just here until we have a more defined type/zod
  const validColours = ["White", "Black", "Off White", "custom"];
  const adjustedSideChannel = sideChannelColour.trim().toLowerCase();

  const found = validColours.find(
    (c) =>
      c.localeCompare(adjustedSideChannel, undefined, {
        sensitivity: "base",
      }) === 0,
  );

  return typeof found === "undefined";
}

function getCostPerMetreHeight(
  height: number,
  pricingSchedule: KineticsCellularPricingSchedule,
) {
  const heightAdjusted = roundMeasurementUp(height) / 1000;
  const costPerMetreHeight = pricingSchedule.sideChannelCostPerMetreHeight;

  return heightAdjusted * costPerMetreHeight;
}

function getCustomColourSurcharge(
  sideChannelColour: string,
  pricingSchedule: KineticsCellularPricingSchedule,
) {
  if (
    sideChannelColour.localeCompare("custom", undefined, {
      sensitivity: "base",
    }) !== 0
  )
    return 0;

  return pricingSchedule.sideChannelCustomColourSurcharge;
}
