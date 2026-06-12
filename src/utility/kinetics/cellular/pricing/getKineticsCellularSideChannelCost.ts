import type { KineticsCellularPricingSchedule } from "../../../../type/pricing/kinetics/kineticsCellularPricingScheduleType";
import { roundMeasurementUp } from "../../../process/measurementUtility";

export function getKineticsCellularSideChannelCost(
  height: number,
  sideChannelColour: string,
  pricingSchedule: KineticsCellularPricingSchedule,
): number | undefined {
  if (!isHeightValid(height)) return undefined;
  if (!isSideChannelColourValid(sideChannelColour)) return undefined;

  if (isSideChannelNone(sideChannelColour)) return 0;

  if (!isSideChannelColourAValidOption(sideChannelColour)) return undefined;

  const costPerHeightMetre = getCostPerMetreHeight(height, pricingSchedule);

  const customSurcharge = getCustomColourSurcharge(
    sideChannelColour,
    pricingSchedule,
  );

  return costPerHeightMetre + customSurcharge;
}

function isHeightValid(height: number) {
  if (height == null) return false;
  if (typeof height === "undefined") return false;
  if (height <= 0) return false;
  return true;
}

function isSideChannelColourValid(sideChannelColour: string) {
  if (!sideChannelColour) return false;
  if (typeof sideChannelColour === "undefined") return false;
  if (sideChannelColour.trim().length === 0) return false;

  return true;
}

function isSideChannelNone(sideChannelColour: string) {
  return (
    sideChannelColour.localeCompare("none", undefined, {
      sensitivity: "base",
    }) === 0
  );
}

function isSideChannelColourAValidOption(sideChannelColour: string) {
  // this is just here until we have a more defined type/zod
  const validColours = ["White", "Custom", "None"];
  const adjustedSideChannel = sideChannelColour.trim().toLowerCase();

  const found = validColours.find(
    (c) =>
      c.localeCompare(adjustedSideChannel, undefined, {
        sensitivity: "base",
      }) === 0,
  );

  return typeof found !== "undefined";
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
