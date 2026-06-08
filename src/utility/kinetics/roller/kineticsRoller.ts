import type { KineticsRollerFabricOpacityType } from "../../../zod/kinetics/sharePointPricingKineticsRoller";
import type {
  BlindType,
  SharePointSpec2Type,
} from "../../../zod/sharePointProjectFile";

function getKineticsRollerControlString(spec: SharePointSpec2Type) {
  const chainColour = spec.chainColour;
  const chainOutputString = `Chain FastRise - ${chainColour}`;

  if (typeof spec.motorisation === "undefined" || spec.motorisation === null)
    return chainOutputString;

  const motorisation = spec.motorisation.trim().toLowerCase();

  if (motorisation.includes("lithium")) return "Lithium-ion";

  return spec.motorisation;
}

function getKineticsRollerFabricOpacity(
  blindType: BlindType,
): KineticsRollerFabricOpacityType | undefined {
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

export { getKineticsRollerControlString, getKineticsRollerFabricOpacity };
