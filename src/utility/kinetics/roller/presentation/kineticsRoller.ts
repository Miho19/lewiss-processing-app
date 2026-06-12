import type { KineticsRollerFabricOpacity } from "../../../../type/pricing/kinetics/kineticsRollerPricingScheduleType";
import type { BlindType } from "../../../../type/process/productType";
import type { KineticsRollerSpec } from "../../../../type/sharePoint/project/spec/kineticsSpec";

export function getKineticsRollerControlString(spec: KineticsRollerSpec) {
  const chainColour = spec.chainColour;
  const chainOutputString = `Chain FastRise - ${chainColour}`;

  if (typeof spec.motorisation === "undefined" || spec.motorisation === null)
    return chainOutputString;

  const motorisation = spec.motorisation.trim().toLowerCase();

  if (motorisation.includes("lithium")) return "Lithium-ion";

  return spec.motorisation;
}

export function getKineticsRollerFabricOpacity(
  blindType: BlindType,
): KineticsRollerFabricOpacity | undefined {
  switch (blindType) {
    case "Kinetics Blockout Roller Blind":
      return "blockout";
    case "Kinetics Light Filtering Roller Blind":
      return "light-filtering";
    case "Kinetics Sunscreen Roller Blind":
      return "sunscreen";
    default:
      return undefined;
  }
}
