import type {
  KineticsRollerPricingSchedule,
  PerMCost,
} from "../../../../type/pricing/kinetics/kineticsRollerPricingScheduleType";
import { roundMeasurementUp } from "../../../process/measurementUtility";

export function getKineticsRollerBottomRailCost(
  width: number,
  bottomRailType: string,
  bottomRailColour: string,
  pricingSchedule: KineticsRollerPricingSchedule,
): number | undefined {
  if (
    width <= 0 ||
    bottomRailColour.trim().length === 0 ||
    bottomRailType.trim().length === 0
  )
    return undefined;

  const customColourCost = getCustomColourCost(
    bottomRailColour,
    pricingSchedule,
  );

  const bottomRailTypeCost = getBottomRailTypeCost(
    width,
    bottomRailType,
    pricingSchedule,
  );

  return customColourCost + bottomRailTypeCost;
}

function getBottomRailTypeCost(
  width: number,
  bottomRailType: string,
  pricingSchedule: KineticsRollerPricingSchedule,
): number {
  const surchargeOptions: PerMCost[] = Object.values(pricingSchedule.bottomRail)
    .map((child) => {
      if (child && typeof child === "object" && "perM" in child)
        return { name: child.name, perM: child.perM };

      return [];
    })
    .flat();

  const bottomRailTypeAdjusted = bottomRailType.trim().toLowerCase();

  const found = surchargeOptions.find(
    (b) =>
      b.name.localeCompare(bottomRailTypeAdjusted, undefined, {
        sensitivity: "base",
      }) === 0,
  );

  if (typeof found === "undefined") {
    return 0;
  }

  const widthAdjusted = roundMeasurementUp(width);

  return found.perM * (widthAdjusted / 1000);
}

function getCustomColourCost(
  bottomRailColour: string,
  pricingSchedule: KineticsRollerPricingSchedule,
): number {
  const bottomRailColourAdjusted = bottomRailColour.trim().toLowerCase();

  if (bottomRailColourAdjusted.includes("custom"))
    return pricingSchedule.bottomRail.customColour;
  return 0;
}
